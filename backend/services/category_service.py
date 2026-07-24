from models.category import Category


def get_all_categories():
    return Category.query.all()
