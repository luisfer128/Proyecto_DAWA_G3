from flask_restful import Resource
from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from ..Components.carreras_get_component import CareersComponent


class CareersResource(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Ejecutando servicio para obtener todas las carreras")

            resultado = CareersComponent.get_all_careers()
            if resultado['result']:
                return response_success(resultado['message'], resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
