import scrapy


class ArticleItem(scrapy.Item):
    url = scrapy.Field()
    title = scrapy.Field()
    authors = scrapy.Field()
    publication_date = scrapy.Field()
    content = scrapy.Field()
