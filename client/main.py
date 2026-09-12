import grpc

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

import turnos_pb2
import turnos_pb2_grpc


app = FastAPI(
    title='Turnos API',
    description='HTTP API that communicates with the Turnos gRPC service',
    version='1.0.0',
)


channel = grpc.insecure_channel('localhost:5000')
grpc_client = turnos_pb2_grpc.TurnoServiceStub(channel)


class CrearTurnoRequest(BaseModel):
    paciente: str
    fecha: str
    hora: str


@app.get('/turnos')
def listar_turnos():
    response = grpc_client.ListarTurnos(
        turnos_pb2.ListarTurnosRequest()
    )

    return {
        'turnos': [
            {
                'id': turno.id,
                'paciente': turno.paciente,
                'fecha': turno.fecha,
                'hora': turno.hora,
                'estado': turno.estado,
            }
            for turno in response.turnos
        ]
    }


@app.get('/turnos/{id}')
def obtener_turno(id: int):
    response = grpc_client.ObtenerTurno(
        turnos_pb2.ObtenerTurnoRequest(id=id)
    )

    if response.id == 0:
        raise HTTPException(
            status_code=404,
            detail='Turno no encontrado',
        )

    return {
        'id': response.id,
        'paciente': response.paciente,
        'fecha': response.fecha,
        'hora': response.hora,
        'estado': response.estado,
    }


@app.post('/turnos')
def crear_turno(data: CrearTurnoRequest):
    response = grpc_client.CrearTurno(
        turnos_pb2.CrearTurnoRequest(
            paciente=data.paciente,
            fecha=data.fecha,
            hora=data.hora,
        )
    )

    return {
        'id': response.id,
        'paciente': response.paciente,
        'fecha': response.fecha,
        'hora': response.hora,
        'estado': response.estado,
    }


@app.post('/turnos/{id}/reservar')
def reservar_turno(id: int):
    response = grpc_client.ReservarTurno(
        turnos_pb2.ReservarTurnoRequest(id=id)
    )

    if response.id == 0:
        raise HTTPException(
            status_code=404,
            detail='Turno no encontrado',
        )

    return {
        'id': response.id,
        'paciente': response.paciente,
        'fecha': response.fecha,
        'hora': response.hora,
        'estado': response.estado,
    }