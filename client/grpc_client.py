import sys

import grpc

sys.path.append('generated')

import turnos_pb2
import turnos_pb2_grpc


channel = grpc.insecure_channel('localhost:5000')
client = turnos_pb2_grpc.TurnoServiceStub(channel)


def listar_turnos():
    return client.ListarTurnos(
        turnos_pb2.ListarTurnosRequest()
    )


def obtener_turno(id: int):
    return client.ObtenerTurno(
        turnos_pb2.ObtenerTurnoRequest(id=id)
    )


def crear_turno(paciente: str, fecha: str, hora: str):
    return client.CrearTurno(
        turnos_pb2.CrearTurnoRequest(
            paciente=paciente,
            fecha=fecha,
            hora=hora,
        )
    )


def reservar_turno(id: int):
    return client.ReservarTurno(
        turnos_pb2.ReservarTurnoRequest(id=id)
    )