import sys

import grpc
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

sys.path.append('generated')

import turnos_pb2
import turnos_pb2_grpc


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


channel = grpc.insecure_channel('localhost:5000')
grpc_client = turnos_pb2_grpc.TurnoServiceStub(channel)


class CrearTurnoRequest(BaseModel):
    paciente: str
    fecha: str
    hora: str


def handle_grpc_error(error: grpc.RpcError):
    if error.code() == grpc.StatusCode.NOT_FOUND:
        raise HTTPException(
            status_code=404,
            detail=error.details(),
        )

    raise HTTPException(
        status_code=500,
        detail='Error interno del servicio gRPC',
    )


@app.get('/turnos')
def listar_turnos():
    try:
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

    except grpc.RpcError as error:
        handle_grpc_error(error)


@app.get('/turnos/{id}')
def obtener_turno(id: int):
    try:
        response = grpc_client.ObtenerTurno(
            turnos_pb2.ObtenerTurnoRequest(id=id)
        )

        return {
            'id': response.id,
            'paciente': response.paciente,
            'fecha': response.fecha,
            'hora': response.hora,
            'estado': response.estado,
        }

    except grpc.RpcError as error:
        handle_grpc_error(error)


@app.post('/turnos')
def crear_turno(data: CrearTurnoRequest):
    try:
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

    except grpc.RpcError as error:
        handle_grpc_error(error)


@app.post('/turnos/{id}/reservar')
def reservar_turno(id: int):
    try:
        response = grpc_client.ReservarTurno(
            turnos_pb2.ReservarTurnoRequest(id=id)
        )

        return {
            'id': response.id,
            'paciente': response.paciente,
            'fecha': response.fecha,
            'hora': response.hora,
            'estado': response.estado,
        }

    except grpc.RpcError as error:
        handle_grpc_error(error)