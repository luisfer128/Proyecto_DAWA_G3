from ..general.logs import HandleLogs
from ..general.response import internal_response
from datetime import datetime
import psycopg2
import psycopg2.extras
from psycopg2.extras import RealDictCursor
from ..general.config import Parametros

def conn_db():
    return psycopg2.connect(host=Parametros.db_host,
                            port=int(Parametros.db_port),
                            user=Parametros.db_user,
                            password=Parametros.db_pass,
                            database=Parametros.db_name,
                            cursor_factory=RealDictCursor)

class DataBaseHandle:
    # Ejecuta métodos de tipo SELECT
    @staticmethod
    def getRecords(query, tamanio, record=()):
        try:
            result = False
            message = None
            data = None

            conn = conn_db()
            cursor = conn.cursor()
            if len(record) == 0:
                cursor.execute(query)
            else:
                cursor.execute(query, record)

            # Tamaño es 0 todos, 1 solo uno, > 1 n registros
            if tamanio == 0:
                res = cursor.fetchall()
            elif tamanio == 1:
                res = cursor.fetchone()
            else:
                res = cursor.fetchmany(tamanio)

            # Verifica el tipo de `res` antes de procesarlo
            if isinstance(res, list):
                # Convertir fechas a cadenas en formato ISO 8601
                for row in res:
                    if isinstance(row, dict):
                        for key, value in row.items():
                            if isinstance(value, datetime):
                                row[key] = value.isoformat()
            elif isinstance(res, dict):
                # Si `res` es un solo diccionario, también convierte las fechas
                for key, value in res.items():
                    if isinstance(value, datetime):
                        res[key] = value.isoformat()

            data = res
            result = True
        except Exception as ex:
            HandleLogs.write_error(ex)
            message = ex.__str__()
        finally:
            cursor.close()
            conn.close()
            return internal_response(result, data, message)

    # Ejecuta métodos de tipo INSERT, UPDATE, DELETE
    @staticmethod
    def ExecuteNonQuery(query, record=(), fetch_id=False):
        try:
            result = False
            message = None
            data = None

            conn = conn_db()
            cursor = conn.cursor()
            cursor.execute(query, record)
            conn.commit()

            if fetch_id:
                data = cursor.fetchone()
                if data:
                    data = list(data.values())[0]

            # Verifica si se realizó alguna modificación
            if cursor.rowcount > 0:
                result = True
            else:
                message = "No se realizó ninguna modificación."

        except Exception as ex:
            HandleLogs.write_error(ex)
            message = ex.__str__()
        finally:
            cursor.close()
            conn.close()
            return internal_response(result, data, message)
