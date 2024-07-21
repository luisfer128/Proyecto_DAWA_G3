from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from src.api.Components.friends_component import FriendsComponent
from src.api.Model.Request.add_friend_request import AddFriendRequest
from flask import request
from flask_restful import Resource

class AddFriendService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de agregar amigo")
            rq_json = request.get_json()
            new_request = AddFriendRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = FriendsComponent.add_friend(rq_json['Id_user'], rq_json['Id_amigo'])
            if resultado['result']:
                return response_success("Amigo agregado exitosamente", None)
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
