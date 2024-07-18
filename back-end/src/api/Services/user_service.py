from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success, response_not_found
from src.api.Components.user_component import UserComponent
from flask import request
from flask_restful import Resource


class UserService(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Ejecutando servicio de Listar Usuario")
            resultado = UserComponent.getAllUsers()
            if resultado['result']:
                if resultado['data'].__len__() > 0:
                    return response_success(resultado['data'])
                else:
                    return response_not_found()
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())