from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle


class LoginComponent:

    @staticmethod
    def login(p_user, p_clave):
        result = False
        data = None
        message = None

        try:
            # Verificar credenciales de login
            sql_login = ("SELECT count(*) as valor FROM segu_user "
                         "WHERE user_login_id = %s AND user_password = %s AND user_state = true")
            login_record = (p_user, p_clave)
            resul_login = DataBaseHandle.getRecords(sql_login, 1, login_record)

            if resul_login['result']:
                if resul_login['data']['valor'] > 0:
                    result = True
                    message = 'Login Exitoso'

                    # Obtener datos asociados al rol, módulos y opciones de menú
                    sql_data = """
                    SELECT
                        u.user_id, u.user_login_id, u.user_names, u.user_lastnames, u.user_locked, u.user_last_login,
                        r.rol_id, r.rol_name, r.rol_description,
                        m.mod_id, m.mod_name, m.mod_description, m.mod_order, m.mod_icon_name, m.mod_text_name,
                        me.menu_id, me.menu_module_id, me.menu_name, me.menu_order, me.menu_parent_id, me.menu_icon_name
                        , me.menu_href, me.menu_url, me.menu_key
                    FROM
                        segu_user u
                        JOIN segu_user_rol ur ON u.user_id = ur.id_user
                        JOIN segu_rol r ON ur.id_rol = r.rol_id
                        JOIN segu_menu_rol mr ON r.rol_id = mr.mr_rol_id
                        JOIN segu_menu me ON mr.mr_menu_id = me.menu_id
                        JOIN segu_module m ON me.menu_module_id = m.mod_id
                    WHERE
                        u.user_login_id = %s
                        AND u.user_password = %s
                        AND u.user_state = true
                        AND r.rol_state = true
                        AND m.mod_state = true
                        AND me.menu_state = true
                        AND mr.mr_state = true
                    ORDER BY
                        r.rol_id, m.mod_order, me.menu_order;
                    """
                    data_record = (p_user, p_clave)
                    data_result = DataBaseHandle.getRecords(sql_data, 0, data_record)

                    sql_menu = "select * from segu_menu"
                    data_menu =  DataBaseHandle.getRecords(sql_menu, 0, data_record)

                    if data_result['result']:
                        user_data = {
                            "user_id": data_result['data'][0]['user_id'],
                            "user_login_id": data_result['data'][0]['user_login_id'],
                            "user_names": data_result['data'][0]['user_names'],
                            "user_lastnames": data_result['data'][0]['user_lastnames'],
                            "user_locked": data_result['data'][0]['user_locked'],
                            "user_last_login": data_result['data'][0]['user_last_login'].strftime(
                                "%Y-%m-%d %H:%M:%S") if data_result['data'][0]['user_last_login'] else None
                        }

                        roles = {}
                        modules = {}

                        for row in data_result['data']:
                            # Agrupar roles
                            if row['rol_id'] not in roles:
                                roles[row['rol_id']] = {
                                    "rol_id": row['rol_id'],
                                    "rol_name": row['rol_name'],
                                    "rol_description": row['rol_description'],
                                    "modules": []
                                }

                            # Agrupar módulos dentro de roles
                            if row['mod_id'] not in modules:
                                modules[row['mod_id']] = {
                                    "mod_id": row['mod_id'],
                                    "mod_name": row['mod_name'],
                                    "mod_description": row['mod_description'],
                                    "mod_order": row['mod_order'],
                                    "mod_icon_name": row['mod_icon_name'],
                                    "mod_text_name": row['mod_text_name'],
                                    "menu": []
                                }
                                roles[row['rol_id']]["modules"].append(modules[row['mod_id']])

                            # Agregar menús a los módulos correspondientes
                            for row2 in data_menu['data']:
                                if row['mod_id'] == row2['menu_module_id']:
                                    menu_item = {
                                        "menu_id": row2['menu_id'],
                                        "menu_name": row2['menu_name'],
                                        "menu_order": row2['menu_order'],
                                        "menu_icon_name": row2['menu_icon_name'],
                                        "menu_href": row2['menu_href'],
                                        "menu_url": row2['menu_url'],
                                        "menu_key": row2['menu_key'],
                                        "menu_parent_id": row2['menu_parent_id'],
                                        "menu_module_id": row2["menu_module_id"]
                                    }
                                    modules[row['menu_module_id']]["menu"].append(menu_item)

                        data = {
                            "user": user_data,
                            "roles": list(roles.values())
                        }

                    else:
                        message = data_result['message']
                else:
                    message = 'Login No Válido'
            else:
                message = resul_login['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        finally:
            return internal_response(result, data, message)
