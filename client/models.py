from pydantic import BaseModel


class CrearTurnoRequest(BaseModel):
    paciente: str
    fecha: str
    hora: str