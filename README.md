# Brain Agriculture

Este projeto é dedicado ao desafio técnico proposto pela Brain Agriculture.

# Tecnologias

Este projeto faz uso do NestJS + Typescript.

# Inicializando o ambiente de desenvolvimento

Para iniciar e executar este projeto é preciso seguir os seguintes passos:

- Instalar as dependências
- Executar servidor local

## Gerenciador de pacotes

Este projeto faz uso do `pnpm` como seu principal gerenciador de pacotes.

Para seguir com os seguintes passos, tenha certeza de que esta ferramenta está
instalada e pronta para uso no seu ambiente de desenvolvimento.

Para instalar o `pnpm` siga a [documentação](https://pnpm.io/installation).

# Variáveis de Ambiente

Abaixo está uma breve explicação das variáveis de ambiente deste projeto.

Essas variáveis precisam ser definidas antes de prosseguir qualquer passo
descrito nesse documento.

Defina as variáveis abaixo em um arquivo `.env` na raiz do projeto. Um exemplo
para este arquivo está disponível em `.env.example`.

| Nome               | Descrição                                     | Obrigatório |
|-------------------|-----------------------------------------------|------------|
| `DATABASE_HOST`    | Host do banco de dados (ex: `db`)           | ✅         |
| `DATABASE_PORT`    | Porta do banco de dados (ex: `5432`)        | ✅         |
| `POSTGRES_USER`    | Usuário do PostgreSQL (ex: `postgres`)      | ✅         |
| `POSTGRES_PASSWORD`| Senha do usuário do PostgreSQL (ex: `postgres`) | ✅     |
| `POSTGRES_DB`      | Nome do banco de dados utilizado pelo projeto (ex: `myapp`) | ✅ |

## Instalando as dependencias

Para instalar as dependencias execute o seguinte comando na raiz do projeto:

```bash
pnpm i
```

Ao ser executado, este comando vai instalar todos as dependências do projeto.
Aguarde o tempo de instalação antes de prosseguir.

## Executando o projeto

Para executar, rode o seguinte comando na raiz do projeto:

```bash
pnpm start:dev
```

Este comando vai executar o servidor local na porta `3000` ou o que for definido
pela variável de ambiente `PORT`. Verifique o endereço http://localhost:<PORT> e
veja a execução do projeto.

# Testes

Este projeto faz uso do Jest para automatizar o ciclo de testes durante o
desenvolvimento.

Para executar os testes, rode o seguinte comando na raiz do projeto:

```bash
pnpm test
```

Este comando vai rodar os testes e mostrará o feedback no final da execução.

# Distribuição

Este projeto foi containerizado com Docker para que a sua distribuição seja mais
simples e eficaz.

Para executar este projeto com o objetivo de distribuição é preciso fazer o uso
do Docker, que foi a ferramenta utilizada para criar e gerenciar os containers
deste projeto.

Caso não tenha o Docker instalado você pode seguir os passos de instalação na 
[documentação oficial](https://docs.docker.com/desktop).

## Dependências

Este projeto possui uma depedência que é o seu banco de dados. Atualmente é o
PostgreSQL, e para configurar de maneira apropriada é preciso definir o arquivo
de variáveis de ambiente `.env` bem descrito nesta [seção](#variáveis-de-ambiente).

## Container

Para criar e executar o container é preciso apenas rodar o seguinte comando na
raiz do projeto:

```bash
docker compose up -d
```

Este comando vai criar o container e executar ele em modo daemon (segundo
plano).

Após isso o projeto será exposto em um servidor local na porta padrão 3000.
