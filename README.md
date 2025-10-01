# Brain Agriculture

Este projeto é dedicado ao desafio técnico proposto pela Brain Agriculture.

# Tecnologias

Este projeto faz uso do NestJS + Typescript.

# Inicializando o projeto

Para iniciar e executar este projeto é preciso seguir os seguintes passos:

- Instalar as dependências
- Executar servidor local

## Gerenciador de pacotes

Este projeto faz uso do `pnpm` como seu principal gerenciador de pacotes.

Para seguir com os seguintes passos, tenha certeza de que esta ferramenta está
instalada e pronta para uso no seu ambiente de desenvolvimento.

Para instalar o `pnpm` siga a [documentação](https://pnpm.io/installation).

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
