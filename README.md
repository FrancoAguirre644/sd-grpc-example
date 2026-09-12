# Sistema de Turnos Médicos — gRPC

Proyecto de ejemplo para demostrar la comunicación entre diferentes tecnologías mediante **gRPC**, utilizando una arquitectura distribuida simple.

El sistema permite gestionar turnos médicos a través de una interfaz web desarrollada con Vue. Las solicitudes HTTP del frontend son recibidas por una API desarrollada con FastAPI, que se comunica mediante gRPC con un servidor NestJS encargado de gestionar la persistencia de los datos en MySQL.

---

## Arquitectura

```text
┌──────────────────────┐
│      Frontend        │
│    Vue + Vite        │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│    Cliente Python    │
│   FastAPI + gRPC     │
└──────────┬───────────┘
           │
           │ gRPC
           ▼
┌──────────────────────┐
│    Servidor NestJS   │
│      + TypeORM       │
└──────────┬───────────┘
           │
           │ SQL
           ▼
┌──────────────────────┐
│        MySQL         │
└──────────────────────┘
```

El recorrido de una solicitud es:

```text
Vue
 ↓
HTTP/JSON
 ↓
FastAPI
 ↓
Cliente gRPC Python
 ↓
gRPC
 ↓
NestJS
 ↓
TypeORM
 ↓
MySQL
```

---

## Tecnologías

### Frontend

* Vue
* Vite
* TypeScript
* Tailwind CSS

### Cliente HTTP / gRPC

* Python
* FastAPI
* Uvicorn
* gRPC Python
* Protocol Buffers

### Servidor gRPC

* NestJS
* TypeScript
* `@nestjs/microservices`
* `@grpc/grpc-js`
* `@grpc/proto-loader`
* TypeORM

### Base de datos

* MySQL

---

## Estructura del proyecto

```text
sd-grpc-example/
├── proto/
│   └── turnos.proto
│
├── server/
│   ├── src/
│   │   ├── turno/
│   │   │   ├── dto/
│   │   │   │   └── crear-turno.dto.ts
│   │   │   ├── turno.controller.ts
│   │   │   ├── turno.entity.ts
│   │   │   ├── turno.module.ts
│   │   │   └── turno.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   ├── package.json
│   └── ...
│
├── client/
│   ├── generated/
│   │   ├── turnos_pb2.py
│   │   └── turnos_pb2_grpc.py
│   ├── api.py
│   ├── grpc_client.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── .gitignore
│   └── venv/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── turnos.ts
│   │   ├── components/
│   │   │   ├── TurnoDetail.vue
│   │   │   ├── TurnoForm.vue
│   │   │   └── TurnoTable.vue
│   │   ├── App.vue
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# Dominio

El sistema gestiona una única entidad: `Turno`.

Cada turno contiene:

| Campo      | Descripción             |
| ---------- | ----------------------- |
| `id`       | Identificador del turno |
| `paciente` | Nombre del paciente     |
| `fecha`    | Fecha del turno         |
| `hora`     | Hora del turno          |
| `estado`   | Estado actual del turno |

Los estados disponibles son:

```text
DISPONIBLE
RESERVADO
```

---

# Operaciones gRPC

El contrato gRPC se encuentra en:

```text
proto/turnos.proto
```

El servicio define las siguientes operaciones:

```protobuf
service TurnoService {
    rpc CrearTurno (CrearTurnoRequest) returns (Turno);
    rpc ObtenerTurno (ObtenerTurnoRequest) returns (Turno);
    rpc ListarTurnos (ListarTurnosRequest) returns (ListaTurnos);
    rpc ReservarTurno (ReservarTurnoRequest) returns (Turno);
}
```

## Operaciones disponibles

### Crear turno

```text
CrearTurno()
```

Crea un nuevo turno con estado inicial:

```text
DISPONIBLE
```

### Obtener turno

```text
ObtenerTurno()
```

Obtiene un turno a partir de su identificador.

### Listar turnos

```text
ListarTurnos()
```

Obtiene todos los turnos registrados.

### Reservar turno

```text
ReservarTurno()
```

Cambia el estado de un turno de:

```text
DISPONIBLE
```

a:

```text
RESERVADO
```

---

# Contrato Protocol Buffers

El archivo `proto/turnos.proto` define el contrato compartido entre el cliente Python y el servidor NestJS.

```protobuf
syntax = "proto3";

package turnos;

service TurnoService {
    rpc CrearTurno (CrearTurnoRequest) returns (Turno);
    rpc ObtenerTurno (ObtenerTurnoRequest) returns (Turno);
    rpc ListarTurnos (ListarTurnosRequest) returns (ListaTurnos);
    rpc ReservarTurno (ReservarTurnoRequest) returns (Turno);
}

message Turno {
    int32 id = 1;
    string paciente = 2;
    string fecha = 3;
    string hora = 4;
    string estado = 5;
}

message CrearTurnoRequest {
    string paciente = 1;
    string fecha = 2;
    string hora = 3;
}

message ObtenerTurnoRequest {
    int32 id = 1;
}

message ListarTurnosRequest {
}

message ListaTurnos {
    repeated Turno turnos = 1;
}

message ReservarTurnoRequest {
    int32 id = 1;
}
```

---

# Configuración de la base de datos

El servidor utiliza MySQL.

Crear una base de datos:

```sql
CREATE DATABASE sd_grpc_example;
```

La configuración se encuentra en:

```text
server/.env
```

Ejemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=sd_grpc_example
```

El proyecto utiliza:

```typescript
synchronize: true
```

por lo que TypeORM se encarga de sincronizar las entidades con la estructura de la base de datos durante el desarrollo.

> Este proyecto no utiliza migraciones.

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd sd-grpc-example
```

---

# 2. Configurar el servidor NestJS

Ingresar al directorio:

```bash
cd server
```

Instalar las dependencias:

```bash
npm install
```

Configurar el archivo:

```text
server/.env
```

con los datos de conexión a MySQL.

---

# 3. Configurar el cliente Python

Ingresar al directorio:

```bash
cd client
```

Crear el entorno virtual:

### Windows

```powershell
python -m venv venv
```

Activarlo:

```powershell
.\venv\Scripts\Activate.ps1
```

Instalar las dependencias:

```powershell
pip install -r requirements.txt
```

---

# 4. Generar el código gRPC de Python

Los archivos Python utilizados para trabajar con Protocol Buffers se generan a partir de:

```text
proto/turnos.proto
```

Desde el directorio `client/` ejecutar:

```powershell
python -m grpc_tools.protoc -I../proto --python_out=generated --grpc_python_out=generated ../proto/turnos.proto
```

Esto genera:

```text
client/generated/
├── turnos_pb2.py
└── turnos_pb2_grpc.py
```

Estos archivos son generados automáticamente y no deben modificarse manualmente.

---

# 5. Configurar el frontend

Ingresar al directorio:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

---

# Ejecución

El sistema requiere ejecutar tres aplicaciones:

1. Servidor gRPC NestJS
2. API FastAPI
3. Frontend Vue

Además, MySQL debe estar disponible.

---

## 1. Ejecutar NestJS

Desde:

```text
server/
```

ejecutar:

```bash
npm run start:dev
```

El servidor gRPC quedará disponible en:

```text
localhost:5000
```

---

## 2. Ejecutar FastAPI

Desde:

```text
client/
```

con el entorno virtual activado:

```powershell
python -m uvicorn main:app --reload --port 8000
```

La API HTTP quedará disponible en:

```text
http://localhost:8000
```

La documentación automática de FastAPI estará disponible en:

```text
http://localhost:8000/docs
```

---

## 3. Ejecutar Vue

Desde:

```text
frontend/
```

ejecutar:

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

---

# API HTTP

Aunque la comunicación entre Python y NestJS se realiza mediante gRPC, el frontend se comunica con FastAPI mediante HTTP/JSON.

## Listar turnos

```http
GET /turnos
```

## Obtener un turno

```http
GET /turnos/{id}
```

## Crear un turno

```http
POST /turnos
```

Ejemplo:

```json
{
    "paciente": "Juan Pérez",
    "fecha": "2026-09-15",
    "hora": "10:30"
}
```

## Reservar un turno

```http
POST /turnos/{id}/reservar
```

---

# Organización del cliente Python

El cliente Python se encuentra separado en diferentes responsabilidades:

```text
client/
├── main.py
├── api.py
├── models.py
├── grpc_client.py
└── generated/
```

### `main.py`

Es el punto de entrada de FastAPI.

Se encarga de:

* crear la aplicación;
* configurar CORS;
* registrar las rutas.

### `api.py`

Contiene los endpoints HTTP.

Se encarga de:

* recibir las solicitudes HTTP;
* utilizar los modelos;
* invocar al cliente gRPC;
* transformar las respuestas para devolver JSON.

### `models.py`

Contiene los modelos utilizados por la API HTTP.

Actualmente incluye:

```python
CrearTurnoRequest
```

### `grpc_client.py`

Contiene la comunicación con el servidor gRPC.

Se encarga de utilizar:

```text
turnos_pb2.py
turnos_pb2_grpc.py
```

para realizar las llamadas al servicio NestJS.

### `generated/`

Contiene código generado automáticamente mediante `grpc_tools.protoc`.

No debe modificarse manualmente.

---

# Organización del servidor NestJS

El servidor gRPC se encuentra dentro de:

```text
server/src/turno/
```

La responsabilidad de cada componente es:

### `turno.controller.ts`

Expone los métodos gRPC:

```text
CrearTurno
ObtenerTurno
ListarTurnos
ReservarTurno
```

### `turno.service.ts`

Contiene la lógica relacionada con los turnos y utiliza el repositorio de TypeORM.

### `turno.entity.ts`

Representa la entidad `Turno` en la base de datos.

### `turno.module.ts`

Agrupa los componentes relacionados con los turnos.

---

# Flujo de una operación

Por ejemplo, cuando el usuario crea un turno:

```text
Usuario
  │
  │ completa formulario
  ▼
Vue
  │
  │ POST /turnos
  ▼
FastAPI
  │
  │ api.py
  ▼
grpc_client.py
  │
  │ CrearTurno()
  │
  │ gRPC
  ▼
NestJS
  │
  │ TurnoController
  ▼
TurnoService
  │
  │ TypeORM
  ▼
MySQL
```

La respuesta realiza el camino inverso:

```text
MySQL
  │
  ▼
NestJS
  │
  │ gRPC
  ▼
Python
  │
  │ HTTP/JSON
  ▼
Vue
  │
  ▼
Usuario
```

---

# Objetivo del proyecto

El objetivo principal del proyecto es mostrar de manera práctica cómo diferentes tecnologías pueden comunicarse dentro de un sistema distribuido.

En particular, permite observar la diferencia entre:

```text
HTTP / JSON
```

utilizado entre:

```text
Vue → FastAPI
```

y:

```text
gRPC / Protocol Buffers
```

utilizado entre:

```text
FastAPI → NestJS
```

De esta manera, el proyecto permite estudiar conceptos como:

* comunicación entre procesos;
* RPC;
* gRPC;
* Protocol Buffers;
* contratos de servicios;
* cliente y servidor gRPC;
* APIs HTTP;
* separación de responsabilidades;
* comunicación entre diferentes lenguajes;
* persistencia en bases de datos.

---

# Puertos utilizados

| Componente   | Puerto |
| ------------ | -----: |
| Frontend Vue | `5173` |
| FastAPI      | `8000` |
| NestJS gRPC  | `5000` |
| MySQL        | `3306` |

---
