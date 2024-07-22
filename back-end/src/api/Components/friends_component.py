from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle

class FriendsComponent:

    @staticmethod
    def add_friend(Id_user, Id_amigo):
        result = False
        message = None

        try:
            # Verificar si ya son amigos
            sql_check_friendship = ("SELECT count(*) as count FROM amigos "
                                    "WHERE \"Id_user\" = %s AND \"Id_amigo\" = %s")
            check_record = (Id_user, Id_amigo)
            resul_check = DataBaseHandle.getRecords(sql_check_friendship, 1, check_record)

            if resul_check['result']:
                if resul_check['data']['count'] == 0:
                    # Agregar amigos
                    sql_add_friend = ("INSERT INTO amigos (\"Id_user\", \"Id_amigo\") "
                                      "VALUES (%s, %s)")
                    add_record = (Id_user, Id_amigo)
                    resul_add = DataBaseHandle.ExecuteNonQuery(sql_add_friend, add_record)

                    if resul_add['result']:
                        result = True
                        message = "Amigo agregado exitosamente"
                    else:
                        message = resul_add['message']
                else:
                    message = "Ya son amigos"
            else:
                message = resul_check['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        finally:
            return internal_response(result, None, message)
