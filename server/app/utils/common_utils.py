from bson import ObjectId


def convert_object_id(data: dict) -> dict:
    if "_id" in data and isinstance(data["_id"], ObjectId):
        data["_id"] = str(data["_id"])
    return data