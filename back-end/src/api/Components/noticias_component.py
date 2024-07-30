from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class NoticiaComponent:

    # Otros métodos...

    @staticmethod
    def getNewsByFacultyId(faculty_id):
        result = False
        message = None
        data = None

        try:
            sql_query_news = """
                    SELECT 
                        n."Id_noticias",
                        n."fotos",
                        n."texto",
                        f."nombre_facultad"
                    FROM 
                        "noticias" n
                    LEFT JOIN 
                        "facultad" f ON n."Id_facultad" = f."Id_facultad"
                    WHERE 
                        n."Id_facultad" = %s
                    """
            record = (faculty_id,)
            resul_query_news = DataBaseHandle.getRecords(sql_query_news, 0, record)

            if not resul_query_news['result']:
                message = resul_query_news['message'] if resul_query_news['message'] else "Noticias no encontradas"
                return internal_response(result, data, message)

            news_data = resul_query_news['data']
            result = True
            message = "Noticias obtenidas exitosamente"
            data = news_data

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, data, message)