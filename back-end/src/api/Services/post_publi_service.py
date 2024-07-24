from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from ..Components.post_publi_component import CrearPublicacion
from ..Model.Request.publicacion_request import PublicacionRequest
from flask import request
from flask_restful import Resource
from ..Components.jwt_component import  JwtComponent


class PublicacionService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de creación de publicación")
            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("token de autenticacion NO valido")
            rq_json = request.get_json()
            publicacion_request = PublicacionRequest()
            error_en_validacion = publicacion_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = CrearPublicacion.crear_publicacion(
                rq_json['user_id'],
                rq_json['text'],
                rq_json['photo'],
            )
            if resultado['result']:
                return response_success("Publicación creada exitosamente", None)
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
