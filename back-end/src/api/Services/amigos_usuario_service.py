from flask import request
from flask_restful import Resource
from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from ..Components.amigos_usuario_component import FriendsComponent
from ..Components.jwt_component import JwtComponent

class FriendsResource(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de obtener amigos del usuario")
            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("token de autenticacion NO valido")
            rq_json = request.get_json()
            user_id = rq_json.get('user_id')

            if not user_id:
                return response_error("Falta el campo requerido: 'user_id'")

            resultado = FriendsComponent.get_user_friends(user_id)
            if resultado['result']:
                return response_success(resultado['message'], resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
