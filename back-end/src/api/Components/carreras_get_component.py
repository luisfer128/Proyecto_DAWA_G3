from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response

class CareersComponent:

    @staticmethod
    def get_all_careers():
        result = False
        data = None
        message = None

        try:
            sql_query = """
            SELECT 
                c."Id_carrera",
                c."nombre_carrera",
                f."nombre_facultad"
            FROM 
                carrera c
            JOIN 
                facultad f ON c."Id_facultad" = f."Id_facultad"
            WHERE 
                c."estado" = TRUE AND f."estado" = TRUE
            ORDER BY 
                c."nombre_carrera";
            """
            resul_query = DataBaseHandle.getRecords(sql_query, 0)

            if resul_query['result']:
                data = resul_query['data']
                result = True
                message = "Carreras obtenidas exitosamente"
            else:
                message = resul_query['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, data, message)
