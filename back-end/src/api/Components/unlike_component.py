from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response
from src.utils.database.connection_db import DataBaseHandle

class UnlikeComponent:

    @staticmethod
    def remove_like(publication_id, user_id):
        result = False
        message = None

        try:
            # Verificar si la publicación existe
            sql_check_publication = ("SELECT count(*) as count FROM \"publicacion\" WHERE \"Id_publicacion\" = %s")
            check_record = (publication_id,)
            resul_check = DataBaseHandle.getRecords(sql_check_publication, 1, check_record)

            if not resul_check['result'] or resul_check['data']['count'] == 0:
                message = "Publicación no encontrada"
                return internal_response(result, None, message)

            # Decrementar el contador de likes
            sql_update_likes = (
                "UPDATE \"publicacion\" SET \"likes\" = \"likes\" - 1 WHERE \"Id_publicacion\" = %s RETURNING \"likes\"")
            update_record = (publication_id,)
            resul_update = DataBaseHandle.ExecuteNonQuery(sql_update_likes, update_record, fetch_id=True)

            if not resul_update['result']:
                message = resul_update['message']
                return internal_response(result, None, message)

            result = True
            message = f"Like removido. Total de likes: {resul_update['data']}"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, None, message)