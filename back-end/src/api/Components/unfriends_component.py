from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class UnfriendComponent:

    @staticmethod
    def remove_friend(Id_user, Id_amigo):
        result = False
        message = None

        try:
            # Verificar si son amigos
            sql_check_friendship = ("SELECT count(*) as count FROM amigos "
                                    "WHERE \"Id_user\" = %s AND \"Id_amigo\" = %s")
            check_record = (Id_user, Id_amigo)
            resul_check = DataBaseHandle.getRecords(sql_check_friendship, 1, check_record)

            if resul_check['result']:
                if resul_check['data']['count'] > 0:
                    # Eliminar la amistad
                    sql_remove_friend = ("DELETE FROM amigos WHERE \"Id_user\" = %s AND \"Id_amigo\" = %s")
                    remove_record = (Id_user, Id_amigo)
                    resul_remove = DataBaseHandle.ExecuteNonQuery(sql_remove_friend, remove_record)

                    if resul_remove['result']:
                        result = True
                        message = "Amigo eliminado exitosamente"
                    else:
                        message = resul_remove['message']
                else:
                    message = "No son amigos"
            else:
                message = resul_check['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        finally:
            return internal_response(result, None, message)
