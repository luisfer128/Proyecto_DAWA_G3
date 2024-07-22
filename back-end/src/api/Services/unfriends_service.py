from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from ..Components.unfriends_component import UnfriendComponent
from ..Model.Request.unfriends_request import UnfriendRequest
from flask import request
from flask_restful import Resource

class UnfriendService(Resource):
    @staticmethod
    def delete():
        try:
            HandleLogs.write_log("Ejecutando servicio de eliminar amigo")
            rq_json = request.get_json()
            unfriend_request = UnfriendRequest()
            error_en_validacion = unfriend_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = UnfriendComponent.remove_friend(rq_json['Id_user'], rq_json['Id_amigo'])
            if resultado['result']:
                return response_success("Amigo eliminado exitosamente", None)
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
