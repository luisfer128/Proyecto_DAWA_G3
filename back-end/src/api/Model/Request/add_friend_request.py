class AddFriendRequest:
    def __init__(self):
        self.Id_user = None
        self.Id_amigo = None

    def validate(self, data):
        if 'Id_user' not in data:
            return "Id_user es requerido"
        if 'Id_amigo' not in data:
            return "Id_amigo es requerido"

        self.Id_user = data['Id_user']
        self.Id_amigo = data['Id_amigo']
        return None
