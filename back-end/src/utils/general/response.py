
def response_inserted(datos):
    return {
        'result': True,
        'message': "Registro Insertado con éxito",
        'data': datos,
        'status_code': 201,
    }, 201

def response_not_found():
    return {
        'result': False,
        'message': "No hay datos para la consulta",
        'data': {},
        'status_code': 404,
    }, 404

def response_success(message, data=None):
    response = {
        'result': True,
        'message': message
    }
    if data is not None:
        response['data'] = data
    return response, 200


def response_error(message, data=None):
    response = {
        'result': False,
        'message': message
    }
    if data is not None:
        response['data'] = data
    return response, 400


def response_unauthorize():
    return {
        'result': False,
        'message': "Acceso No autorizado",
        'data': {},
        'status_code': 401,
    }, 401


def internal_response(result, datos, mensaje):
    return {
        'result': result,
        'data': datos,
        'message': mensaje
    }
