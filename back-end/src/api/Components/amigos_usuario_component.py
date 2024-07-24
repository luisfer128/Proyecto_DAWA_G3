from src.utils.database.connection_db import DataBaseHandle
from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response

class FriendsComponent:

    @staticmethod
    def get_user_friends(user_id):
        result = False
        data = None
        message = None

        try:
            # Obtener todos los amigos del usuario
            sql_get_friends = (
                "SELECT u.\"Id_user\", u.\"nombres\" FROM \"amigos\" a "
                "JOIN \"user\" u ON a.\"Id_amigo\" = u.\"Id_user\" "
                "WHERE a.\"Id_user\" = %s"
            )
            friends_record = (user_id,)
            result_friends = DataBaseHandle.getRecords(sql_get_friends, 0, friends_record)

            if not result_friends['result']:
                message = "Error al obtener los amigos"
                return internal_response(result, data, message)

            result = True
            data = result_friends['data']
            message = "Amigos obtenidos exitosamente"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, data, message)
