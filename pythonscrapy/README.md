# article_scraper

Minimal Scrapy project scaffold created to help you get started scraping NCBI articles.

Quick start (Windows PowerShell):

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
# Run from the project root (where scrapy.cfg is located)
scrapy crawl publication -o scraped_articles.json
```

Edit `article_scraper/spiders/publication.py` and replace the placeholder CSS selectors with ones matching your target pages (paste outerHTML into the chat if you want me to help).
