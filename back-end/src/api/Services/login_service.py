from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from src.api.Components.login_component import LoginComponent
from src.api.Model.Request.login_request import LoginRequest
from flask import request
from flask_restful import Resource

class LoginService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Login")
            rq_json = request.get_json()
            new_request = LoginRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = LoginComponent.login(rq_json['login_user'], rq_json['login_password'])
            if resultado['result']:
                # Aquí se incluye la data en la respuesta
                return response_success("Login Exitoso", resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))

