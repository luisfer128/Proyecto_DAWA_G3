from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success, response_not_found
from src.api.Components.user_component import UserComponent
from flask import request
from flask_restful import Resource
from ..Components.jwt_component import JwtComponent

class UserService(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Ejecutando servicio de Listar Usuario")

            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("token de autenticacion NO valido")

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

class UserByIdService(Resource):
    @staticmethod
    def post():
        try:
            data = request.get_json()
            user_id = data.get('user_id')
            HandleLogs.write_log(f"Ejecutando servicio de Obtener Usuario por ID: {user_id}")

            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("token de autenticacion NO valido")

            resultado = UserComponent.getUserById(user_id)
            if resultado['result']:
                if resultado['data']:
                    return response_success(resultado['data'])
                else:
                    return response_not_found()
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())
