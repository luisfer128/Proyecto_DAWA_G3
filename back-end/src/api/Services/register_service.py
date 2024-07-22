from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from ..Components.register_component import RegisterComponent
from ..Model.Request.register_request import RegisterRequest
from flask import request
from flask_restful import Resource

class RegisterService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de registro de usuario")
            rq_json = request.get_json()
            register_request = RegisterRequest()
            error_en_validacion = register_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = RegisterComponent.register_user(
                rq_json['usuario'],
                rq_json['password'],
                rq_json['mail'],
                rq_json['nombres'],
                rq_json['Id_carrera']
            )
            if resultado['result']:
                return response_success("Usuario registrado exitosamente", None)
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
