# Scrapy settings for article_scraper project

BOT_NAME = 'article_scraper'

SPIDER_MODULES = ['article_scraper.spiders']
NEWSPIDER_MODULE = 'article_scraper.spiders'

# 1. SET YOUR IDENTITY (REQUIRED BY NCBI)
USER_AGENT = 'MyClemsonResearchBot/1.0 (+https://www.clemson.edu/research)'

# 2. OBEY ROBOTS.TXT
ROBOTSTXT_OBEY = True

# 3. CONFIGURE A GENTLE REQUEST RATE (RECOMMENDED FOR NCBI)
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 3
AUTOTHROTTLE_MAX_DELAY = 60
AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
AUTOTHROTTLE_DEBUG = False

# Default request headers (can add api_key here if you have one)
# DEFAULT_REQUEST_HEADERS = {
#    'api_key': 'YOUR_API_KEY_HERE'
# }

# Enable logging to console
LOG_ENABLED = True
LOG_LEVEL = 'INFO'
