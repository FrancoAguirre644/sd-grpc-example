from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from grpc_client import (
    listar_turnos,
    obtener_turno,
    crear_turno,
    reservar_turno,
)
from models import CrearTurnoRequest


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/turnos')
def listar_turnos_endpoint():
    response = listar_turnos()

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
def obtener_turno_endpoint(id: int):
    response = obtener_turno(id)

    return {
        'id': response.id,
        'paciente': response.paciente,
        'fecha': response.fecha,
        'hora': response.hora,
        'estado': response.estado,
    }


@app.post('/turnos')
def crear_turno_endpoint(data: CrearTurnoRequest):
    response = crear_turno(
        data.paciente,
        data.fecha,
        data.hora,
    )

    return {
        'id': response.id,
        'paciente': response.paciente,
        'fecha': response.fecha,
        'hora': response.hora,
        'estado': response.estado,
    }


@app.post('/turnos/{id}/reservar')
def reservar_turno_endpoint(id: int):
    response = reservar_turno(id)

    return {
        'id': response.id,
        'paciente': response.paciente,
        'fecha': response.fecha,
        'hora': response.hora,
        'estado': response.estado,
    }