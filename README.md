# Teste técnico DiHub

## Perguntas Teóricas

### Arquitetura e Design de Software

- Descreva como você organizaria um projeto usando NestJS em uma arquitetura de microserviços. Quais seriam os principais componentes e como eles interagiriam?
- Como você abordaria o gerenciamento de estado e a comunicação entre serviços em uma aplicação distribuída?

### TypeScript

- Qual a diferença entre tipos e interfaces em TypeScript? Quando você usaria um ou outro?
  
  Em linguagens mais tradicionais orientadas a objetos a diferenciação entre essas "entidades" e suas aplicações é bem clara:
  - Tipo: formato do dado que está armazenado em uma variável (`number`, `char`, `array`, etc.)
  - Interface: definição abstrata que uma classe pode implementar para indicar que é capaz de realizar de forma concreta tal definição (`Executable`, `Logger`)
  
  Em TS esses conceitos se misturam pois todo tipo de estrutura (função, classe, objeto, etc.) é, em essência, um `Objeto JavaScript`, dando a possibilidade de definir o tipo de uma variável por meio de uma interface com praticamente a mesma sintaxe. Nesse contexto, A única "exclusividade" que a interface tem em relação ao tipo é a de poder ser implementada por classes da mesma forma que em linguagens tradicionais.
  
  Sendo assim, na prática, os dois tipos poderiam ser utilizados na maioria dos casos, mas, por motivos de facilitar entendimento e padronização com a comunidade de programação eu utilizaria da forma como linguagens tradicionais implementam. Ou seja, com o tipo sendo exclusivamente para a definição de tipos de variáveis e a interface para a definição de contratos entre entidades via polimorfismo de variáveis.

- Explique o conceito de *generics* em TypeScript e forneça um exemplo prático.
  
  Os *generics* são um recurso para ajudar na tipagem de estruturas que tenham uma tipagem dinâmica sem perder os recursos do TS colocando o tipo como `any`.
  
  Exemplo: Quero uma função que me retorne todos os valores de um certo objeto.

  ```typescript
  // Example without generics
  type FunctionType = (obj: object) => any[];

  // Return here is ever any[]
  const returnValuesOfObject: FunctionType = (obj: object) => {
    return Object.values(obj);
  };
  ```

  ```typescript
  // Example with generics
  type FunctionType = <T>(obj: Record<string, T>) => T[];

  // Return here is array of type of value of object passed
  const returnValuesOfObject: FunctionType = (obj: object) => {
    return Object.values(obj);
  };
  ```

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
