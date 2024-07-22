from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from src.api.Components.publicacion_component import PublicationsComponent
from flask import request
from flask_restful import Resource

class GetFriendPublicationsService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio para obtener publicaciones de amigos")
            rq_json = request.get_json()
            user_id = rq_json.get('user_id')

            if not user_id:
                HandleLogs.write_error("Falta el user_id en el request")
                return response_error("Falta el user_id en el request")

            resultado = PublicationsComponent.get_friend_publications(user_id)
            if resultado['result']:
                return response_success("Publicaciones obtenidas exitosamente", resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
