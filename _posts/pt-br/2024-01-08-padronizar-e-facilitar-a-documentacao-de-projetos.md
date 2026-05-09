---
title: "Commit com propósito: como padronizar e facilitar a documentação do seu projeto"
excerpt: "Os commits fazem parte da documentação do software porque permitem acompanhar o histórico de desenvolvimento, identificar os autores das mudanças, justificar as decisões tomadas e facilitar a correção de bugs ou a implementação de novas funcionalidade."
translation_key: standardize-and-facilitate-your-project-documentation
---

{% include figure popup=false image_path="/assets/images/padronizar-e-facilitar-a-documentacao-de-projetos.png" alt="representação da construção de uma documentação" caption="Padronizar a documentação do projeto. (imagem por DALL-E)" %}

Estou fazendo parte de um processo que começou com a [pesquisa](/blog/dominando-a-conversao-de-repositorios-SVN-para-GIT/) e [aplicação](/blog/o-guia-da-conversao-de-GIT-para-SVN/) da conversão de repositórios SVN para GIT. Isso demonstra o nosso profissionalismo e o nosso compromisso com os padrões e boas práticas da nossa área.

Bom, não sei se vocês lembram das aulas de engenharia de software mas em todas as etapas do processo de construção e desenvolvimento de um software é gerado um documento. A etapa de requisitos gera um documento, a especificação gera um documento, o teste, a implementação, as instruções e a manutenção do software também geram documentos.

E dando seguimento em manter nossos esforços em documentação rastreável e auditável, precisamos estabelecer um processo que permita a verificação e validação por outros colegas: a padronização de commits.

## Commits Semânticos

O commit no contexto da ciência da computação: "Refere-se ao processo de tornar permanente um conjunto de alterações, ou seja, de efetivar as alterações". No contexto de controle de versão: "São registros das alterações feitas no código-fonte de um software no sistema de controle de versão". Eles fazem parte da documentação do software porque permitem acompanhar o histórico de desenvolvimento, identificar os autores das mudanças, justificar as decisões tomadas e facilitar a correção de bugs ou a implementação de novas funcionalidades. Um bom commit deve ter uma mensagem clara, concisa e informativa, que descreva o que foi feito e por quê.

Com o objetivo de fornecer um histórico explícito e padronizado o **commit semântico** ou em sua especificação formal: **conventional commit** se utiliza de regras simples e claras reduzindo o tempo gasto em compreender algo que foi feito, mesmo que por outro time de desenvolvedores.

A especificação <a rel="noopener" target="_blank" href="https://www.conventionalcommits.org/en/v1.0.0/">conventional commit</a> é uma convenção leve sobre mensagens de confirmação, fornecendo um conjunto fácil de regras para criar um histórico de confirmação explícito, o que torna mais fácil escrever ferramentas automatizadas em cima, descrevendo os recursos, correções e alterações de quebra feitas nas mensagens de confirmação.

A mensagem deve ser estruturada da seguinte maneira:

```
<tipo>[escopo]: <descrição>

[corpo]

[rodapés(s)]
```

### O Tipo: 

Possui a finalidade de indicar a intenção que o usuário teve ao efetivar as alterações:

- fix: corrige um bug ou erro no código.
- feat: introduz um novo recurso.
- build: a alteração afeta a compilação ou está relacionado a dependências externas (por exemplo: composer, maven, gulp, broccoli, npm).
- chore: a alteração ocorre em código que não vai para produção. (por exemplo: .gitignore).
- ci: descreve alteração nos arquivos e scripts de configuração de CI - Continuous Integration (por exemplo: Travis, Github Actions, Gitlab CI).
- docs: possui alterações na documentação, (por exemplo: README ou docblocks).
- perf: indica alterações no código que melhoram o desempenho da aplicação.
- refactor: para alterações no código que não alteram a funcionalidade da aplicação.
- style: identifica alterações que alteram o estilo do código, como: espaços, identação, formatação etc.
- test: descreve a adição de testes ou correção de testes existentes.

### O escopo

O escopo é uma descrição opcional que pode ser adicionada à mensagem para fornecer mais informações sobre a alteração. A especificação de commits semânticos define o escopo como: "um identificador de nível superior, ou seja, relacionado ao projeto, componente ou módulo".

### A descrição

A descrição é uma mensagem curta e descritiva que resume a alteração feita.

- Comece com um verbo no imperativo no presente simples, como "adiciona", "corrige", "remove", "atualiza" em vez de "adicionou", "corrigiu", etc. Isso ajuda a tornar a mensagem mais clara e concisa.
- Seja específico: Forneça detalhes suficientes na mensagem para que outros desenvolvedores possam entender o que foi alterado. Por exemplo, em vez de "corrige bug", use "corrige bug de renderização inconsistente em dispositivos móveis".
- Separe o assunto do corpo com uma linha em branco, isso ajuda a tornar a mensagem mais fácil de ler.

### O corpo

O corpo da mensagem é opcional, caso seja escrita deve conter informações complementares em relação a tipo, escopo e a descrição resumida já definidas no título.

Use para contextualizar o por quê, em relação à regra de negócio, aquela implementação foi realizada. Seja preciso, descritivo e conciso, evite escrever mensagens longas e detalhadas.

### Rodapé
O rodapé da mensagem de um commit semântico é opcional e pode ser usado para fornecer informações adicionais. O rodapé deve ser separado do corpo da mensagem por uma linha em branco e consistir em um token de palavra, seguido pelo símbolo ":" (dois pontos) um espaço em branco e a descrição.

Alguns exemplos de tokens de palavra que podem ser usados no rodapé da mensagem de um commit semântico:

- Closes: usado para indicar que o commit fecha uma issue.
- Refs: usado para indicar que o commit faz referência a uma issue.
- BREAKING CHANGE: usado para indicar que o commit introduz uma mudança que quebra a compatibilidade com versões anteriores.
- Co-authored-by: usado para indicar que o commit foi escrito por mais de um autor. Cada autor deve ser listado no rodapé com seu nome e endereço de e-mail.

Exemplo de commits semânticos:

```
fix: corrige bug de renderização em dispositivos móveis

Corrige bug que causava renderização inconsistente em dispositivos móveis.

Refs: #456
```

```
feat: adiciona login com o google

Adiciona nova funcionalidade para permitir que os usuários façam login usando suas contas do Google.

Closes: #123
```

## Conclusão

Neste artigo apresentei uma estratégia para criar um histórico de commits mais claro, consistente e informativo, que reflita as mudanças significativas do seu projeto e facilite o seu gerenciamento. "Commitar com propósito" é uma prática que visa facilitar a comunicação entre os desenvolvedores, além de contribuir para a qualidade da documentação. Espero que este artigo tenha sido útil e que você possa aplicar o aprendizado nos seus próximos projetos.