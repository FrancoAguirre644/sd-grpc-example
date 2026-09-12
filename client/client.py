import grpc

from grpc import turnos_pb2
from grpc import turnos_pb2_grpc


def main():
    channel = grpc.insecure_channel('localhost:5000')

    client = turnos_pb2_grpc.TurnoServiceStub(channel)

    response = client.ListarTurnos(
        turnos_pb2.ListarTurnosRequest()
    )

    for turno in response.turnos:
        print(
            f'{turno.id} - '
            f'{turno.paciente} - '
            f'{turno.fecha} - '
            f'{turno.hora} - '
            f'{turno.estado}'
        )


if __name__ == '__main__':
    main()