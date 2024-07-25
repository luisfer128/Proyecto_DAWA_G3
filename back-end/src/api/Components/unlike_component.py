from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response
from src.utils.database.connection_db import DataBaseHandle

class UnlikeComponent:

    @staticmethod
    def remove_like(publication_id, user_id):
        result = False
        message = None

        try:
            # Verificar si el like existe
            sql_check_like = ("SELECT count(*) as count FROM \"likes\" WHERE \"Id_publicacion\" = %s AND \"Id_user\" = %s")
            check_like_record = (publication_id, user_id)
            resul_check_like = DataBaseHandle.getRecords(sql_check_like, 1, check_like_record)

            if not resul_check_like['result'] or resul_check_like['data']['count'] == 0:
                message = "Like no encontrado para esta publicación y usuario"
                return internal_response(result, None, message)

            # Eliminar el like de la tabla de likes
            sql_delete_like = ("DELETE FROM \"likes\" WHERE \"Id_publicacion\" = %s AND \"Id_user\" = %s RETURNING \"Id_likes\"")
            delete_like_record = (publication_id, user_id)
            resul_delete_like = DataBaseHandle.ExecuteNonQuery(sql_delete_like, delete_like_record, fetch_id=True)

            if not resul_delete_like['result']:
                message = resul_delete_like['message']
                return internal_response(result, None, message)

            # Obtener el total de likes después de eliminar
            sql_get_total_likes = ("SELECT count(*) as total_likes FROM \"likes\" WHERE \"Id_publicacion\" = %s")
            get_total_likes_record = (publication_id,)
            resul_total_likes = DataBaseHandle.getRecords(sql_get_total_likes, 1, get_total_likes_record)

            if not resul_total_likes['result']:
                message = resul_total_likes['message']
                return internal_response(result, None, message)

            total_likes = resul_total_likes['data']['total_likes']

            result = True
            message = f"Like removido. Total de likes: {total_likes}"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, None, message)
