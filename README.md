# UrbanImóveis

Este é um serviço de back-end responsável por gerenciar uma imobiliária. Ele utiliza o TypeORM e relacionamentos com base no diagrama fornecido.

## Endpoints do serviço

A seguir estão os endpoints disponíveis neste serviço:

POST /users: Criação de usuário.\
GET /users: Lista todos os usuários.\
PATCH /users/:id: Atualiza um usuário.\
DELETE /users/:id: Realiza um soft delete no usuário.\
POST /login: Gera o token de autenticação.\
POST /categories: Criação de categoria.\
GET /categories: Lista todas as categorias.\
GET /categories/:id/realEstate: Lista todos os imóveis que pertencem a uma categoria.\
POST /realEstate: Criação de um imóvel.\
GET /realEstate: Lista todos os imóveis.\
POST /schedules: Agenda uma visita a um imóvel.\
GET /schedules/realEstate/:id: Lista todos os agendamentos de um imóvel.

## Requisitos do Serviço

### POST /users

Rota para criação de usuário com os seguintes dados:

id: Valor SERIAL. Não deve ser passado no body da request, e sim gerado de forma automática pelo TypeORM.\
name: string e obrigatório.\
email: string, obrigatório e único.\
password: Deverá receber uma string mas armazenar uma hash gerada com o bcryptjs.\
admin: boolean e false por padrão.\
createdAt: Não deve ser passado mas gerado pelo TypeORM.\
updatedAt: Não deve ser passado mas gerado pelo TypeORM.\
deletedAt: Não deve ser passado mas gerado pelo TypeORM.\
A rota de criação deve retornar todos os dados, com exceção da hash de senha.\
Não podem ser cadastrados dois usuários com o mesmo e-mail.

### GET /users

A rota deve retornar todos os dados dos usuários, com exceção da hash de senha.\
A rota pode ser acessada apenas por usuários administradores (admin = true).

### PATCH /users/:id

A rota deve atualizar os dados do usuário.\
Não deve ser possível atualizar os campos id e admin.\
Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

### DELETE /users/:id

A rota deve realizar um soft delete do usuário.\
A rota pode ser acessada apenas por administradores.\
Não deve ser possível realizar um soft delete em um usuário já deletado.

### POST /login

Rota de login recebendo email e password.\
O login deve validar se o usuário existe e se a senha está correta.\
Não deve ser possível realizar o login de um usuário deletado.

### POST /categories

Rota para criação de categorias com os seguintes dados:

id: Valor SERIAL. Não deve ser passado no body da request, e sim gerado de forma automática pelo TypeORM.\
name: string e obrigatório.\
Não podem ser cadastradas duas categorias com o mesmo nome.\
A rota pode ser acessada apenas por usuários administradores (admin = true).

### GET /categories

Rota deve listar todas as categorias.\
A rota não precisa de autenticação para ser acessada.

### GET /categories/:id/realEstate

Rota deve listar todos os imóveis que pertencem a uma categoria.\
A rota não precisa de autenticação para ser acessada.

### POST /realEstate
Rota para criação de um imóvel com os seguintes dados:

id: Valor SERIAL. Não deve ser passado no body da request, e sim gerado de forma automática pelo TypeORM.\
value: decimal e obrigatório.\
size: inteiro e obrigatório.\
address: um objeto com os seguintes dados:
- street: string e obrigatório.
- zipCode: string e obrigatório.
- number: string e opcional.
- city: string e obrigatório.
- state: string e obrigatório.

categoryId: number.\
sold: Não deve ser passado mas gerado no momento da validação dos dados no formato boolean com default = false.\
createdAt: Não deve ser passado mas gerado pelo TypeORM.\
updatedAt: Não deve ser passado mas gerado pelo TypeORM.\
Não podem ser cadastrados dois imóveis com o mesmo endereço.\
A rota pode ser acessada apenas por administradores.\
Não podem ser cadastrados imóveis com o campo state maior que 2 dígitos.\
Não podem ser cadastrados imóveis com o campo zipCode maior que 8 dígitos.

### GET /realEstate

Rota deve listar todos os imóveis.\
A rota não precisa de autenticação para ser acessada.

### POST /schedules

Rota responsável pelo agendamento de uma visita a um imóvel com os seguintes dados:\

id: Valor SERIAL. Não deve ser passado no body da request, e sim gerado de forma automática pelo TypeORM.\
date: string da data de agendamento da visita ao imóvel, no formato AAAA-DD-MM.\
hour: string do horário de agendamento da visita ao imóvel, no formato HH:MM.\
realEstateId: inteiro.\
userId: Não deve ser passado no body da requisição e sim pego através do token do usuário.\
Não pode ser possível agendar uma visita a um imóvel com a mesma data e hora, essa verificação deve ser implementada com query builder.\
Não pode ser possível um usuário agendar uma visita a 2 imóveis diferentes com a mesma data e hora, essa verificação deve ser implementada com query builder.\
Só deve ser possível agendar uma visita durante horário comercial (08:00 às 18:00).\
Só deve ser possível agendar uma visita durante dias úteis (segunda a sexta-feira).

### GET /schedules/realEstate/:id

Rota deve listar todos os agendamentos de um imóvel.\
A rota pode ser acessada apenas por administradores.

## Como executar o Projeto

1. Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas. Portanto utilize o comando abaixo para instalar tais dependências:

```bash
# caso use npm
npm install

# caso use yarn
yarn
```

2. Configure as variáveis de ambiente:

- Renomeie o arquivo .env.example para .env.
- Preencha as variáveis de ambiente no arquivo .env com as informações corretas.

3. Execute as migrações do banco de dados:

```bash
# caso use npm
npm run migrate

# caso use yarn
yarn run migrate
```

4. Inicie o servidor:

```bash
# caso use npm
npm start

# caso use yarn
yarn start
```

5. O serviço estará disponível em http://localhost:3000.

## Sobre os testes

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.ts` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

## Rodando os testes

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes

```bash
# caso use npm
npm run test

# caso use yarn
yarn test
```

### Rodar todos os testes e ter um log ainda mais completo

```bash
# caso use npm
npm run test --all

# caso use yarn
yarn test --all
```

### Rodar os testes de uma pasta específica

> detalhe: repare que tests está envolvido por 2 underlines. Isso se chama ***dunder***.

```bash
# caso use npm
npm run test <subpasta>

# caso use yarn
yarn test <subpasta>
```

### Rodar os testes de um arquivo específico

```bash
# caso use npm
npm run test <subpasta>/<arquivo>

# caso use yarn
yarn test <subpasta>/<arquivo>
```

**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.
