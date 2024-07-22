from datetime import datetime
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle


class PublicationsComponent:

    @staticmethod
    def get_friend_publications(user_id):
        result = False
        message = None
        data = None

        try:
            sql_query = """
            SELECT 
                p."Id_publicacion",
                p."Id_user" AS "publicacion_user_id",
                u1."nombres" AS "publicacion_user_name",
                p."likes",
                p."fotos",
                p."texto",  
                p."fecha_publicacion",
                c."Id_comentario",
                c."comentario",
                c."fecha_comentario",
                c."Id_user" AS "comentario_user_id",
                u2."nombres" AS "comentario_user_name"
            FROM 
                publicacion p
            JOIN 
                amigos a ON p."Id_user" = a."Id_amigo"
            JOIN 
                "user" u1 ON p."Id_user" = u1."Id_user"
            LEFT JOIN 
                comentario c ON p."Id_publicacion" = c."Id_publicacion"
            LEFT JOIN 
                "user" u2 ON c."Id_user" = u2."Id_user"
            WHERE 
                a."Id_user" = %s
            ORDER BY 
                p."fecha_publicacion" DESC, 
                c."fecha_comentario" ASC;
            """
            records = (user_id,)
            resul_query = DataBaseHandle.getRecords(sql_query, 0, records)

            if resul_query['result']:
                # Procesar los resultados
                publications = {}
                for record in resul_query['data']:
                    # Formatear las fechas
                    if 'fecha_publicacion' in record and record['fecha_publicacion']:
                        if isinstance(record['fecha_publicacion'], str):
                            try:
                                record['fecha_publicacion'] = datetime.fromisoformat(record['fecha_publicacion'])
                            except ValueError:
                                record['fecha_publicacion'] = None
                        if isinstance(record['fecha_publicacion'], datetime):
                            record['fecha_publicacion'] = record['fecha_publicacion'].strftime("%Y-%m-%d %H:%M:%S")

                    if 'fecha_comentario' in record and record['fecha_comentario']:
                        if isinstance(record['fecha_comentario'], str):
                            try:
                                record['fecha_comentario'] = datetime.fromisoformat(record['fecha_comentario'])
                            except ValueError:
                                record['fecha_comentario'] = None
                        if isinstance(record['fecha_comentario'], datetime):
                            record['fecha_comentario'] = record['fecha_comentario'].strftime("%Y-%m-%d %H:%M:%S")

                    # Agrupar comentarios por publicación
                    pub_id = record['Id_publicacion']
                    if pub_id not in publications:
                        publications[pub_id] = {
                            "Id_publicacion": pub_id,
                            "publicacion_user_id": record["publicacion_user_id"],
                            "publicacion_user_name": record["publicacion_user_name"],
                            "likes": record["likes"],
                            "fotos": record["fotos"],
                            "texto": record["texto"],  # Añadido texto
                            "fecha_publicacion": record["fecha_publicacion"],
                            "comentarios": []
                        }

                    if record['Id_comentario']:
                        publications[pub_id]['comentarios'].append({
                            "Id_comentario": record["Id_comentario"],
                            "comentario": record["comentario"],
                            "fecha_comentario": record["fecha_comentario"],
                            "comentario_user_id": record["comentario_user_id"],
                            "comentario_user_name": record["comentario_user_name"]
                        })

                # Convertir el diccionario de publicaciones a una lista
                data = list(publications.values())
                result = True
                message = "Publicaciones obtenidas exitosamente"
            else:
                message = resul_query['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)

        finally:
            return internal_response(result, data, message)
