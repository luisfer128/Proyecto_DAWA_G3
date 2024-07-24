from src.utils.database.connection_db import DataBaseHandle
from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response

class SuggestedFriendsComponent:

    @staticmethod
    def get_suggested_friends(user_id):
        result = False
        data = None
        message = None

        try:
            # Obtener la carrera del usuario
            sql_get_career = ("SELECT \"Id_carrera\" FROM \"user\" WHERE \"Id_user\" = %s")
            career_record = (user_id,)
            result_career = DataBaseHandle.getRecords(sql_get_career, 1, career_record)

            if not result_career['result'] or not result_career['data']:
                message = "Usuario no encontrado o no tiene carrera registrada"
                return internal_response(result, data, message)

            user_career = result_career['data']['Id_carrera']

            # Obtener amigos sugeridos basados en la carrera
            sql_get_suggested_friends = (
                "SELECT \"Id_user\", \"nombres\" FROM \"user\" "
                "WHERE \"Id_carrera\" = %s AND \"Id_user\" != %s"
            )
            suggested_friends_records = (user_career, user_id)
            result_suggested_friends = DataBaseHandle.getRecords(sql_get_suggested_friends, 0, suggested_friends_records)

            if not result_suggested_friends['result']:
                message = "Error al obtener amigos sugeridos"
                return internal_response(result, data, message)

            result = True
            data = result_suggested_friends['data']
            message = "Amigos sugeridos obtenidos exitosamente"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, data, message)
