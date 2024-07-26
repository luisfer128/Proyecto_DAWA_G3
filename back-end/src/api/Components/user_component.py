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

    def getUserById(user_id):
        result = False
        message = None
        data = None

        try:
            # Obtener datos del usuario
            sql_query_user = """
                    SELECT 
                        u."Id_user",
                        u."usuario",
                        u."mail",
                        u."estado",
                        u."locked",
                        u."nombres",
                        u."last_login",
                        c."Id_carrera",
                        c."nombre_carrera",
                        f."nombre_facultad"
                    FROM 
                        "user" u
                    LEFT JOIN 
                        "carrera" c ON u."Id_carrera" = c."Id_carrera"
                    LEFT JOIN 
                        "facultad" f ON c."Id_facultad" = f."Id_facultad"
                    WHERE 
                        u."Id_user" = %s
                    """
            record = (user_id,)
            resul_query_user = DataBaseHandle.getRecords(sql_query_user, 1, record)

            if not resul_query_user['result'] or not resul_query_user['data']:
                message = resul_query_user['message'] if resul_query_user['message'] else "Usuario no encontrado"
                return internal_response(result, data, message)

            user_data = resul_query_user['data']

            # Obtener lista de amigos del usuario
            sql_query_friends = """
                    SELECT 
                        u."Id_user",
                        u."usuario",
                        u."nombres"
                    FROM 
                        "amigos" a
                    JOIN 
                        "user" u ON a."Id_amigo" = u."Id_user"
                    WHERE 
                        a."Id_user" = %s
                    """
            resul_query_friends = DataBaseHandle.getRecords(sql_query_friends, 0, record)

            if not resul_query_friends['result']:
                message = resul_query_friends['message'] if resul_query_friends[
                    'message'] else "Error al obtener amigos"
                return internal_response(result, data, message)

            friends_data = resul_query_friends['data']

            # Combinar datos del usuario con la lista de amigos
            data = {
                "user": user_data,
                "friends": friends_data
            }
            result = True
            message = "Usuario y amigos obtenidos exitosamente"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, data, message)