# Medical Appointments API with Docker

Uma API serverless para gerenciamento de consultas médicas construída com Node.js, TypeScript, AWS Lambda, e rodando em containers Docker.

## Pré-requisitos

- Docker
- Docker Compose
- Node.js v14 ou superior (para desenvolvimento local)
- npm ou yarn (para desenvolvimento local)

## Estrutura do Projeto

```
/
├── src/                    # Código fonte
├── tests/                  # Testes
├── .dockerignore          # Arquivos ignorados pelo Docker
├── .gitignore
├── Dockerfile             # Configuração do container
├── docker-compose.yml     # Configuração do ambiente Docker
├── package.json           # Dependências e scripts
├── serverless.yml         # Configuração do Serverless
├── tsconfig.json          # Configuração do TypeScript
└── README.md
```

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone <repository-url>
cd medical-appointments-api
```

2. Construa e inicie os containers:
```bash
npm run docker:build
npm run docker:up
```

## Desenvolvimento Local

O ambiente de desenvolvimento inclui:
- API rodando em container Docker
- LocalStack simulando serviços AWS
- Hot-reload para desenvolvimento

### Comandos Docker

```bash
# Construir containers
npm run docker:build

# Iniciar ambiente
npm run docker:up

# Parar ambiente
npm run docker:down

# Ver logs
npm run docker:logs
```

### Acessando a API

A API estará disponível em:
- http://localhost:3000

### LocalStack

O LocalStack simula serviços AWS localmente:
- Lambda: http://localhost:4566
- API Gateway: http://localhost:4566
- DynamoDB: http://localhost:4566

## Endpoints da API

### Buscar Agendas dos Médicos
- **GET** `/agendas`
- Retorna lista de médicos com horários disponíveis
```json
{
  "doctors": [
    {
      "id": "27516bc7-5c94-47b4-bcc9-219c415592e0",
      "name": "Dr. João Silva",
      "expertise": "Cardiologista",
      "available_hours": [
        "2024-10-05T09:00:00.000Z",
        "2024-10-05T10:00:00.000Z"
      ]
    }
  ]
}
```

### Criar Agendamento
- **POST** `/agendamento`
- Cria novo agendamento
```json
{
  "doctor_id": "27516bc7-5c94-47b4-bcc9-219c415592e0",
  "patient_name": "Carlos Almeida",
  "appointment_datetime": "2024-10-05T09:00:00.000Z"
}
```

## Testes

Para rodar os testes dentro do container:

```bash
docker-compose exec api npm test
```

## Desenvolvimento

### Acessando o Container

```bash
docker-compose exec api sh
```

### Logs da Aplicação

```bash
npm run docker:logs
```

### Hot Reload

O código fonte está montado como volume, permitindo hot reload durante o desenvolvimento.