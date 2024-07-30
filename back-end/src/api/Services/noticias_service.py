from flask import request
from flask_restful import Resource
from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success, response_not_found
from ..Components.noticias_component import NoticiaComponent
from ..Components.jwt_component import JwtComponent

class NoticiaService(Resource):
    @staticmethod
    def post():
        try:
            data = request.get_json()
            faculty_id = data.get('Id_facultad')
            HandleLogs.write_log(f"Ejecutando servicio de Obtener Noticias por Id Facultad: {faculty_id}")

            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("token de autenticacion NO valido")

            resultado = NoticiaComponent.getNewsByFacultyId(faculty_id)
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