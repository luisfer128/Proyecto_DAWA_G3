from ..Services.login_service import LoginService
from ..Services.user_service import UserService
from ..Services.add_friend_service import AddFriendService
from ..Services.publicacion_service import GetFriendPublicationsService
from ..Services.unfriends_service import UnfriendService
from ..Services.register_service import RegisterService

def load_routes(api):
    # Metodo para el login
    api.add_resource(LoginService, '/segu/login')
    # Metodo para listar los usuarios
    api.add_resource(UserService, '/user/list')
    # Metodo para agregar amigo
    api.add_resource(AddFriendService, '/user/add_friend')
    # Metodo para obtener publicaciones de amigos
    api.add_resource(GetFriendPublicationsService, '/api/publications')
    # Metodo para eliminar amigo
    api.add_resource(UnfriendService, '/user/unfriend')
    # Metodo Registro
    api.add_resource(RegisterService, '/user/register')

