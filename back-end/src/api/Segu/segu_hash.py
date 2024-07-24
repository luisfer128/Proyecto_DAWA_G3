from bcrypt import hashpw, gensalt, checkpw
from ...utils.general.logs import HandleLogs

class HashPassword:

    @staticmethod
    def encoder(password):
        try:
            # Genera una sal y hashea la contraseña
            salt = gensalt()
            hashed_password = hashpw(password.encode('utf-8'), salt)
            return hashed_password  # No es necesario decodificar ya que bcrypt devuelve bytes
        except Exception as err:
            HandleLogs.write_log("Error al encriptar la contraseña")
            HandleLogs.write_error(err.__str__())
            return None

    @staticmethod
    def verify(password, hashed_password):
        try:
            # Verifica la contraseña comparándola con la hash almacenada
            return checkpw(password.encode('utf-8'), hashed_password)
        except Exception as err:
            HandleLogs.write_log("Error al verificar la contraseña")
            HandleLogs.write_error(err.__str__())
            return False
