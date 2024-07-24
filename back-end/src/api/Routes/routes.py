from ..Services.login_service import LoginService
from ..Services.user_service import UserService
from ..Services.add_friend_service import AddFriendService
from ..Services.publicacion_service import GetFriendPublicationsService
from ..Services.unfriends_service import UnfriendService
from ..Services.register_service import RegisterService
from ..Services.post_publi_service import PublicacionService
from ..Services.like_service import LikeResource
from ..Services.unlike_service import UnlikeResource
from ..Services.comment_service import CommentResource
from ..Services.amigo_sugerido_service import SuggestedFriendsResource
from ..Services.amigos_usuario_service import FriendsResource


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
    # Método para crear publicación
    api.add_resource(PublicacionService, '/user/create_publication')
    # Método para agregar un like
    api.add_resource(LikeResource, '/user/add_like')
    # Método para remover un like
    api.add_resource(UnlikeResource, '/user/remove_like')
    # Método para agregar un comentario
    api.add_resource(CommentResource, '/user/add_comment')
    # Método para obtener amigos sugeridos
    api.add_resource(SuggestedFriendsResource, '/user/suggested_friends')
    # Método para obtener todos los amigos del usuario
    api.add_resource(FriendsResource, '/user/get_friends')
