from src.utils.database.connection_db import DataBaseHandle
from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response


class CommentComponent:

    @staticmethod
    def add_comment(publication_id, user_id, comment_text):
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


            # Insertar comentario en la base de datos
            sql_insert_comment = ("INSERT INTO \"comentario\" (\"Id_publicacion\", \"Id_user\", \"comentario\") "
                                  "VALUES (%s, %s, %s) RETURNING \"Id_comentario\"")
            insert_record = (publication_id, user_id, comment_text)
            resul_insert = DataBaseHandle.ExecuteNonQuery(sql_insert_comment, insert_record, fetch_id=True)

            if not resul_insert['result']:
                message = resul_insert['message']
                return internal_response(result, None, message)

            result = True
            message = f"Comentario añadido. ID de comentario: {resul_insert['data']}"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, None, message)
