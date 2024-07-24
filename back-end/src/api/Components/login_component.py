from datetime import datetime
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle
from ..Components.jwt_component import JwtComponent
from ..Segu.segu_hash import HashPassword


class LoginComponent:

    @staticmethod
    def login(p_user, p_clave):
        result = False
        data = None
        message = None

        try:
            # Verificar credenciales de login
            sql_login = """
            SELECT "password" FROM "user"
            WHERE usuario = %s AND estado = true
            """
            login_record = (p_user,)
            resul_login = DataBaseHandle.getRecords(sql_login, 1, login_record)

            if resul_login['result']:
                hashed_password = resul_login['data']['password']
                if HashPassword.verify(p_clave, hashed_password):
                    result = True
                    message = 'Login Exitoso'
                    # Token
                    token = JwtComponent.TokenGenerate(p_user)
                    # Obtener datos asociados al rol, módulos y opciones de menú
                    sql_data = """
                    SELECT
                        u."Id_user", u.usuario, u.nombres, u.mail, u.locked, u.last_login,
                        c.nombre_carrera, f.nombre_facultad,
                        r."Id_rol", r.nombre_rol, r.descripcion,
                        m."Id_modulo", m.nombre AS mod_nombre, m.descripcion AS mod_descripcion, m.icon_name AS mod_icon_name,
                        me."Id_menu", me.nombre AS menu_nombre, me.icon_name AS menu_icon_name, me.descripcion AS menu_descripcion
                    FROM
                        "user" u
                        JOIN "carrera" c ON u."Id_carrera" = c."Id_carrera"
                        JOIN "facultad" f ON c."Id_facultad" = f."Id_facultad"
                        JOIN "user_rol" ur ON u."Id_user" = ur."Id_user"
                        JOIN "rol" r ON ur."Id_rol" = r."Id_rol"
                        JOIN "menu_rol" mr ON r."Id_rol" = mr."Id_rol"
                        JOIN "menu" me ON mr."Id_menu" = me."Id_menu"
                        JOIN "modulo" m ON me."Id_modulo" = m."Id_modulo"
                    WHERE
                        u.usuario = %s
                        AND u.estado = true
                        AND r.estado = true
                        AND m.estado = true
                        AND me.estado = true
                        AND mr.estado = true
                    ORDER BY
                        r."Id_rol", m."Id_modulo", me."Id_menu";
                    """
                    data_record = (p_user,)
                    data_result = DataBaseHandle.getRecords(sql_data, 0, data_record)

                    if data_result['result']:
                        user_data = {
                            "user_id": data_result['data'][0]['Id_user'],
                            "usuario": data_result['data'][0]['usuario'],
                            "nombres": data_result['data'][0]['nombres'],
                            "mail": data_result['data'][0]['mail'],
                            "carrera": data_result['data'][0]['nombre_carrera'],
                            "facultad": data_result['data'][0]['nombre_facultad'],
                            "locked": data_result['data'][0]['locked'],
                            "last_login": None
                        }

                        # Verificar si last_login es un datetime antes de formatear
                        if data_result['data'][0]['last_login']:
                            last_login = data_result['data'][0]['last_login']
                            if isinstance(last_login, str):
                                try:
                                    last_login = datetime.fromisoformat(last_login)
                                except ValueError:
                                    last_login = None
                            if isinstance(last_login, datetime):
                                user_data["last_login"] = last_login.strftime("%Y-%m-%d %H:%M:%S")

                        user_data["roles"] = []

                        roles = {}
                        modules = {}

                        for row in data_result['data']:
                            # Agrupar roles
                            if row['Id_rol'] not in roles:
                                roles[row['Id_rol']] = {
                                    "rol_id": row['Id_rol'],
                                    "nombre_rol": row['nombre_rol'],
                                    "descripcion": row['descripcion'],
                                    "modules": []
                                }
                                user_data['roles'].append(roles[row['Id_rol']])

                            # Agrupar módulos dentro de roles
                            if row['Id_modulo'] not in modules:
                                modules[row['Id_modulo']] = {
                                    "mod_id": row['Id_modulo'],
                                    "nombre": row['mod_nombre'],
                                    "descripcion": row['mod_descripcion'],
                                    "icon_name": row['mod_icon_name'],
                                    "menu": []
                                }
                                roles[row['Id_rol']]["modules"].append(modules[row['Id_modulo']])

                            # Agregar menús a los módulos correspondientes
                            menu_item = {
                                "menu_id": row['Id_menu'],
                                "nombre": row['menu_nombre'],
                                "descripcion": row['menu_descripcion'],
                                "icon_name": row['menu_icon_name']
                            }
                            modules[row['Id_modulo']]["menu"].append(menu_item)

                        data = {
                            'user_data': user_data,
                            'token': token
                        }
                else:
                    message = 'Contraseña incorrecta'
            else:
                message = 'Usuario no encontrado o inactivo'

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        return internal_response(result, data, message)
