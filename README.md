# Teste técnico DiHub

## Perguntas Teóricas

### Arquitetura e Design de Software

- Descreva como você organizaria um projeto usando NestJS em uma arquitetura de microserviços. Quais seriam os principais componentes e como eles interagiriam?
- Como você abordaria o gerenciamento de estado e a comunicação entre serviços em uma aplicação distribuída?

### TypeScript

- Qual a diferença entre tipos e interfaces em TypeScript? Quando você usaria um ou outro?
- Explique o conceito de generics em TypeScript e forneça um exemplo prático.

### Puppeteer

- Quais são as principais aplicações do Puppeteer e como ele pode ser utilizado para realizar web scraping?

---

## Desafio Prático

### Implementação com NestJS

- **Objetivo:** Criar uma API simples com NestJS.
- **Descrição:** Desenvolva uma API que permita a criação, leitura, atualização e exclusão (CRUD) de recursos de `usuarios`. Utilize conceitos arquiteturais.
- **Requisitos:**
  - Rotas CRUD completas.
  - Validação de dados de entrada.
  - Documentação básica usando Swagger.
  - Testes unitários. (Bônus)

### Web Scraping com Puppeteer

- **Objetivo:** Criar um crawler com Puppeteer.
- **Descrição:** Desenvolva um script que utilize Puppeteer para acessar [saucedemo](https://www.saucedemo.com/), na página você deve fazer o login e retornar em json via api o produto mais caro.
- **Requisitos:**
  - O script deve navegar por várias páginas, se necessário.
  - O usuário e login do site deve ser identificado de forma automática.
  - Deve lidar com o carregamento dinâmico de conteúdo.
  - Incluir tratamento de erros e logs.
