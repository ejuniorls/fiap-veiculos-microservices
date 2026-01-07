# Sistema de Cadastro e Listagem de Veículos com Microsserviços

Este projeto foi desenvolvido como trabalho substitutivo com o objetivo
de consolidar os conhecimentos em microsserviços com Node.js,
arquitetura orientada a eventos e escalabilidade.

A solução é composta por dois microsserviços independentes que se
comunicam por meio de eventos, garantindo desacoplamento, flexibilidade
e possibilidade de evolução independente.

------------------------------------------------------------------------

## Arquitetura da Solução

A aplicação é dividida em dois microsserviços:

### 1. Microsserviço de Cadastro de Veículos

Responsável por:
- Receber requisições para cadastro de veículos
- Validar os dados recebidos; - Persistir os dados no banco de dados
- Publicar um evento informando que um novo veículo foi cadastrado

### 2. Microsserviço de Listagem de Veículos

Responsável por: 
- Consumir eventos de novos veículos cadastrados
- Armazenar os dados recebidos via evento
- Disponibilizar endpoints para listagem e consulta de veículos
- Permitir filtros por atributos como marca e ano.

A comunicação entre os microsserviços é realizada por meio de um message broker, seguindo o padrão de arquitetura orientada a eventos.

------------------------------------------------------------------------

## Tecnologias Utilizadas
 - Node.js
 - Express
 - MongoDB ou PostgreSQL
 - Message Broker (RabbitMQ, Kafka ou Redis Pub/Sub)
 - Docker e Docker Compose
 - Swagger (OpenAPI) ou Postman para documentação da API

------------------------------------------------------------------------

## Estrutura do Projeto

    /cadastro-veiculos
        ├── controllers
        ├── services
        ├── routes
        ├── events
        ├── app.js
        ├── Dockerfile
        └── README.md

    /listagem-veiculos
        ├── controllers
        ├── services
        ├── routes
        ├── events
        ├── app.js
        ├── Dockerfile
        └── README.md

    docker-compose.yml
    Veiculos-Microservices.postman_collection.json

------------------------------------------------------------------------

## Fluxo de Funcionamento
 1. O cliente realiza uma requisição HTTP para o microsserviço de cadastro.
 2. Os dados do veículo são validados.
 3. O veículo é salvo no banco de dados.
 4. Um evento `vehicle.created` é publicado no message broker.
 5. O microsserviço de listagem consome o evento.
 6. Os dados do veículo são armazenados localmente.
 7. O cliente pode consultar os veículos por meio dos endpoints de listagem.
 
------------------------------------------------------------------------

## Endpoints

### Microsserviço de Cadastro

-   `POST /vehicles`
    -   Cadastra um novo veículo.

    -   Exemplo de payload:

        ``` json
        {
          "marca": "Toyota",
          "modelo": "Corolla",
          "ano": 2022,
          "placa": "ABC1D23"
        }
        ```

### Microsserviço de Listagem

-   `GET /vehicles`
    -   Lista todos os veículos cadastrados.
    -   Permite filtros por query params:
        -   `marca`
        -   `ano`
-   `GET /vehicles/:id`
    -   Retorna os dados de um veículo específico.

------------------------------------------------------------------------

## Validações

O microsserviço de cadastro realiza validações como:
- Campos obrigatórios
- Ano do veículo válido
- Formato da placa
- Tipos de dados corretos.

Somente veículos válidos são persistidos e publicados como eventos.

------------------------------------------------------------------------

## Documentação da API

A documentação dos endpoints pode ser acessada por meio de:
 - Collection do Postman, incluída no repositório.

------------------------------------------------------------------------

## Execução com Docker

### Pré-requisitos

-   Docker
-   Docker Compose

### Subindo os serviços

``` bash
docker-compose up --build
```

Após a inicialização:
 - O microsserviço de cadastro estará disponível em sua respectiva porta
 - O microsserviço de listagem estará disponível em sua respectiva porta
 - O message broker e o banco de dados serão inicializados automaticamente.

------------------------------------------------------------------------

## Entregáveis
 - Repositório público contendo:
   - Código-fonte dos dois microsserviços;
   - Arquivos de configuração Docker;
   - Documentação da API.
 - Vídeo demonstrativo apresentando:
   - Cadastro de veículos;
   - Consumo de eventos;
     - Listagem e consulta de veículos.

------------------------------------------------------------------------

## Considerações Finais

Este projeto demonstra a aplicação prática de microsserviços, comunicação assíncrona por eventos e boas práticas de organização e escalabilidade no desenvolvimento de APIs com Node.js.
