from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle
from datetime import datetime

class UserComponent:

    @staticmethod
    def getAllUsers():
        try:
            result = False
            data = None
            message = None
            sql = """
                SELECT 
                    u."Id_user",
                    u.usuario,
                    u.nombres,
                    u.mail,
                    u.locked,
                    u.last_login,
                    c.nombre_carrera AS carrera,
                    f.nombre_facultad AS facultad
                FROM 
                    "user" u
                    JOIN "carrera" c ON u."Id_carrera" = c."Id_carrera"
                    JOIN "facultad" f ON c."Id_facultad" = f."Id_facultad"
                WHERE 
                    u.estado = true; 
            """

            result_user = DataBaseHandle.getRecords(sql, 0)
            if result_user['result']:
                result = True
                data = result_user['data']
                # Convertir datetime a string si es necesario
                if isinstance(data, list):
                    for record in data:
                        for key, value in record.items():
                            if isinstance(value, datetime):
                                record[key] = value.isoformat()
            else:
                message = 'Error al Obtener datos de usuarios -> ' + result_user['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)
