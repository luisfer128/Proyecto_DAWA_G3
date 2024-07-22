class RegisterRequest:
    def validate(self, data):
        required_fields = ['usuario', 'password', 'mail', 'nombres', 'Id_carrera']
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return f"Campos faltantes: {', '.join(missing_fields)}"

        # Agrega validaciones adicionales aquí si es necesario
        return None
