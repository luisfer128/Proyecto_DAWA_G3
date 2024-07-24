class PublicacionRequest:
    def validate(self, data):
        required_fields = ['user_id', 'text', 'photo']
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return f"Campos faltantes: {', '.join(missing_fields)}"

        # Agrega validaciones adicionales si es necesario
        return None
