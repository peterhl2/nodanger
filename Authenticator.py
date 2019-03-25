import jwt
from datetime import datetime, timedelta

class Authenticator:

    def __init__(self):
        self.algorithm='HS256'
        self.secret = 'mysupersecretkeyplsdontsteal'

    def _validate_token(self, token):
        pass

    def _issue_token(self, username, password):
        # do something to validate the username and password

        # issue a token valid for one week
        token = jwt.encode({
            'valid_until': datetime.now() + timedelta(days=7)
        }, self.secret, self.algorithm)
        return token
