from src.utils.general.logs import HandleLogs
from src.utils.general.response import internal_response
from src.utils.database.connection_db import DataBaseHandle


class RegisterComponent:

    @staticmethod
    def register_user(usuario, password, mail, nombres, Id_carrera):
        result = False
        message = None

        try:
            # Verificar si el usuario o el correo ya existen
            sql_check_user = ("SELECT count(*) as count FROM \"user\" "
                              "WHERE \"usuario\" = %s OR \"mail\" = %s")
            check_record = (usuario, mail)
            resul_check = DataBaseHandle.getRecords(sql_check_user, 1, check_record)

            if not resul_check['result'] or resul_check['data']['count'] > 0:
                message = "Usuario o correo ya registrados" if resul_check['data']['count'] > 0 else resul_check['message']
                return internal_response(result, None, message)

            # Registrar nuevo usuario sin hashear la contraseña
            sql_register_user = (
                "INSERT INTO \"user\" (\"usuario\", \"password\", \"mail\", \"estado\", \"locked\", \"nombres\", \"Id_carrera\") "
                "VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING \"Id_user\"")
            register_record = (usuario, password, mail, True, False, nombres, Id_carrera)
            resul_register = DataBaseHandle.ExecuteNonQuery(sql_register_user, register_record, fetch_id=True)

            if not resul_register['result']:
                message = resul_register['message']
                return internal_response(result, None, message)

            user_id = resul_register['data']

            # Asignar rol "usuario"
            sql_assign_role = ("INSERT INTO \"user_rol\" (\"Id_rol\", \"Id_user\") VALUES (%s, %s)")
            assign_record = (2, user_id)
            resul_assign = DataBaseHandle.ExecuteNonQuery(sql_assign_role, assign_record)

            if not resul_assign['result']:
                message = resul_assign['message']
                return internal_response(result, None, message)

            result = True
            message = "Usuario registrado exitosamente"

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, None, message)
