class Token:
    def __init__(self , payload = None , is_expired  = False , is_invalid = False):
        self.payload = payload
        self.is_expired = is_expired
        self.is_invalid = is_invalid