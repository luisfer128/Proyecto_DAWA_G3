class UnfriendRequest:
    def validate(self, data):
        required_fields = ['Id_user', 'Id_amigo']
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return f"Campos faltantes: {', '.join(missing_fields)}"

        # Agrega validaciones adicionales aquí si es necesario
        return None
