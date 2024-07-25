from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response
from src.utils.database.connection_db import DataBaseHandle

class LikeComponent:

    @staticmethod
    def add_like(publication_id, user_id):
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

            # Verificar si el usuario ya ha dado like a la publicación
            sql_check_like = ("SELECT count(*) as count FROM \"likes\" WHERE \"Id_publicacion\" = %s AND \"Id_user\" = %s")
            check_like_record = (publication_id, user_id)
            resul_check_like = DataBaseHandle.getRecords(sql_check_like, 1, check_like_record)

            if resul_check_like['result'] and resul_check_like['data']['count'] > 0:
                message = "El usuario ya ha dado like a esta publicación"
                return internal_response(result, None, message)

            # Insertar el like en la tabla de likes
            sql_insert_like = ("INSERT INTO \"likes\" (\"Id_publicacion\", \"Id_user\") VALUES (%s, %s) RETURNING \"Id_likes\"")
            insert_like_record = (publication_id, user_id)
            resul_insert_like = DataBaseHandle.ExecuteNonQuery(sql_insert_like, insert_like_record, fetch_id=True)

            if not resul_insert_like['result']:
                message = resul_insert_like['message']
                return internal_response(result, None, message)

            # Obtener el total de likes después de insertar
            sql_get_total_likes = ("SELECT count(*) as total_likes FROM \"likes\" WHERE \"Id_publicacion\" = %s")
            get_total_likes_record = (publication_id,)
            resul_total_likes = DataBaseHandle.getRecords(sql_get_total_likes, 1, get_total_likes_record)

            if not resul_total_likes['result']:
                message = resul_total_likes['message']
                return internal_response(result, None, message)

            total_likes = resul_total_likes['data']['total_likes']

            result = True
            message = f"Like añadido. Total de likes: {total_likes}"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, None, message)
