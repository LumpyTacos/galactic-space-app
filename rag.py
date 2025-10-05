import json
from pathlib import Path
from typing import List, Dict, Any
from sentence_transformers import SentenceTransformer
import chromadb

def prepare_text_from_article(article: Dict[str, Any]) -> str:
    """Extract relevant text from an article by combining title, abstract, and content."""
    parts = []
    
    if "title" in article:
        parts.append(str(article["title"]))
    
    if "abstract" in article:
        parts.append(str(article["abstract"]))
    
    if "content" in article:
        content = article["content"]
        if isinstance(content, str):
            parts.append(content)
        elif isinstance(content, dict):
            # If content is a dict of sections, join their values
            parts.extend(str(v) for v in content.values())
    
    return "\n\n".join(filter(None, parts))

def load_articles(json_path: str) -> List[Dict[str, Any]]:
    """Load articles from the JSON file."""
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def main():
    # Load articles
    json_path = Path(__file__).parent / "scraped_articles_api.json"
    articles = load_articles(str(json_path))
    print(f"Loaded {len(articles)} articles")
    
    # Prepare text documents and metadata
    documents = []
    metadatas = []
    for article in articles:
        # Extract text combining title, abstract, and content
        doc_text = prepare_text_from_article(article)
        if not doc_text.strip():
            continue
            
        documents.append(doc_text)
        metadatas.append({
            "pmcid": article.get("pmcid", ""),
            "title": str(article.get("title", "")),
            "publication_date": str(article.get("publication_date", ""))
        })
    
    print(f"Prepared {len(documents)} documents for embedding")
    
    # Initialize the embedding model
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    
    # Create embeddings in batches to handle memory
    batch_size = 32
    client = chromadb.PersistentClient(path="./db")
    collection = client.get_or_create_collection(name="articles")
    
    for i in range(0, len(documents), batch_size):
        batch_docs = documents[i:i + batch_size]
        batch_meta = metadatas[i:i + batch_size]
        batch_ids = [f"doc_{j}" for j in range(i, i + len(batch_docs))]
        
        # Create embeddings for this batch
        batch_embeddings = model.encode(batch_docs)
        
        # Add to ChromaDB
        collection.add(
            embeddings=batch_embeddings.tolist(),
            documents=batch_docs,
            ids=batch_ids,
            metadatas=batch_meta
        )
        print(f"Added batch {i//batch_size + 1} ({len(batch_docs)} documents)")

if __name__ == "__main__":
    main()