from sentence_transformers import SentenceTransformer
import chromadb

def query_articles(query_text: str, n_results: int = 5):
    # Initialize the same model used for embedding
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    
    # Connect to the existing ChromaDB
    client = chromadb.PersistentClient(path="/db")
    collection = client.get_collection(name="articles")
    
    # Create embedding for the query
    query_embedding = model.encode([query_text])
    
    # Query the collection
    results = collection.query(
        query_embeddings=query_embedding.tolist(),
        n_results=n_results,
        include=["documents", "metadatas", "distances"]
    )
    
    # Print results in a readable format
    print(f"\nResults for query: '{query_text}'\n")
    
    for i in range(len(results["ids"][0])):
        distance = results["distances"][0][i]
        metadata = results["metadatas"][0][i]
        doc = results["documents"][0][i]

        print(f"Result {i + 1} (distance: {distance:.4f}):")
        print(f"Title: {metadata['title']}")
        print(f"PMCID: {metadata['pmcid']}")
        print(f"Date: {metadata['publication_date']}")
        print("-" * 80 + "\n")

if __name__ == "__main__":
    # Example queries
    queries = [
        "how about cancer",
        "space radiation effects",
        "DNA damage in space"
    ]
    
    for query in queries:
        query_articles(query)
