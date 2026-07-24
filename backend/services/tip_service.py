from models.tip import Tip


def get_all_tips():
    return Tip.query.all()
def get_tip_by_id(id):
    return Tip.query.get(id)
