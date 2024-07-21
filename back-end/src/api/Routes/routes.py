from ..Services.login_service import LoginService
from ..Services.user_service import UserService
from ..Services.add_friend_service import AddFriendService

def load_routes(api):
    #metodo para el login
    api.add_resource(LoginService, '/segu/login')
    #metodo para listar los usuarios
    api.add_resource(UserService, '/user/list')
    # metodo para agregar amigo
    api.add_resource(AddFriendService, '/user/add_friend')

