from flask import request
from flask_restful import Resource
from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from ..Components.like_component import LikeComponent
from ..Components.jwt_component import  JwtComponent


class LikeResource(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de agregar like")
            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("token de autenticacion NO valido")
            rq_json = request.get_json()
            publication_id = rq_json.get('publication_id')
            user_id = rq_json.get('user_id')

            if not publication_id or not user_id:
                return response_error("Faltan campos requeridos: 'publication_id' y 'user_id'")

            resultado = LikeComponent.add_like(publication_id, user_id)
            if resultado['result']:
                return response_success(resultado['message'], None)
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
