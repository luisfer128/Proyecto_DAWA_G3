from datetime import datetime
from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response
from src.utils.database.connection_db import DataBaseHandle

class CrearPublicacion:

    @staticmethod
    def crear_publicacion(user_id, text, photo):
        result = False
        message = None

        try:
            # Inserta la nueva publicación en la base de datos
            sql_insert_publicacion = (
                "INSERT INTO \"publicacion\" (\"Id_user\", \"texto\", \"fotos\") "
                "VALUES (%s, %s, %s) RETURNING \"Id_publicacion\""
            )
            insert_record = (user_id, text, photo)
            resul_insert = DataBaseHandle.ExecuteNonQuery(sql_insert_publicacion, insert_record, fetch_id=True)

            if not resul_insert['result']:
                message = resul_insert['message']
                return internal_response(result, None, message)

            # Obtener el ID de la nueva publicación
            publicacion_id = resul_insert['data']
            result = True
            message = f"Publicación creada exitosamente  ID = {publicacion_id}"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, None, message)
