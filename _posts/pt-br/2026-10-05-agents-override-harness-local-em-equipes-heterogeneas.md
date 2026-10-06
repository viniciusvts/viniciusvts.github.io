---
title: "Agents Override: Harness Local em Equipes Heterogêneas"
excerpt: "Como usar Agents Override no Harness resolve o atrito de ambientes mistos no uso de IA em equipes, separando as regras globais do projeto das configurações locais de cada desenvolvedor."
last_modified_at: 2026-10-06
translation_key: agents-override-local-harness
---

{% include figure popup=false image_path="/assets/images/agents-override-local-harness.jpg" alt="agents.local.md sobrescrevendo o agents.md" caption="agents.local.md sobrescreve o agents.md no ambiente local" %}

## Introdução
A adoção de assistentes de IA diretamente nas IDEs mudou a forma como escrevemos software. Cada um deles roda dentro de um harness: a camada em volta do modelo que define quais ferramentas ele usa, quais instruções recebe e em que contexto trabalha. Uma das peças mais simples desse harness virou prática comum: um arquivo `agents.md` na raiz do repositório para que a inteligência artificial entenda as regras. Dependendo da ferramenta, a mesma ideia aparece com outros nomes:`.cursorrules`, `.windsurfrules` ou `claude.md`.

Para quem trabalha sozinho isso funciona bem, porém, à medida que o uso sai do desenvolvedor solo e escala para equipes heterogêneas surge o problema do atrito de infraestrutura. Quem escreveu o arquivo costuma misturar as regras do projeto com instruções que só fazem sentido na própria máquina. Se essa pessoa trabalha com Docker, o arquivo manda o agente rodar tudo via `docker compose exec`. O colega que usa Windows nativo, ou WSL2, recebe comandos que simplesmente não funcionam no ambiente dele.

O meu ponto é este:**As instruções de IA não devem misturar as regras de negócio ou de arquitetura do software com os comandos de infraestrutura local do desenvolvedor.**

## A Solução Arquitetural: O Padrão "Agents Override"
Da mesma forma que a engenharia de software resolveu o problema das credenciais de banco de dados e variáveis de ambiente com os arquivos `.env`, precisamos aplicar o conceito de override (sobrescrita) local para o contexto dos agentes de IA.

A separação de responsabilidades aqui: o repositório deve ditar a regra de negócio, enquanto a máquina do desenvolvedor dita a regra de execução.

- **A Camada Global (`agents.md`)**: É o arquivo principal, versionado no Git. Ele contém as convenções técnicas da equipe. É aqui que você explica que o backend roda com uma linguagem, com um framework específico, como que a interface é construída e com que princípios o design do sistema obedece estritamente. Essas regras valem para todos.
- **A Camada Local (`agents.local.md`)**: É o arquivo que deve ser inserido obrigatoriamente no `.gitignore`. Ele pertence única e exclusivamente à máquina do desenvolvedor e descreve o seu harness local. Se o desenvolvedor opera nativamente no Windows, se roda tudo virtualizado em containers Docker, ou se o ambiente é o WSL2 com uma distribuição Linux.

## Casos de Uso: Muito Além da Infraestrutura
Com o Agents Override, cada desenvolvedor ajusta o próprio harness ao seu jeito de trabalhar sem impor isso ao resto da equipe. Infraestrutura é o caso mais óbvio, mas não o único:

- **Execução e Terminal**: Enquanto um desenvolvedor pode instruir a IA a sempre rodar os comandos de migração através de containers isolados no Docker, outro orienta a ferramenta a usar executáveis nativos e caminhos baseados em bash do seu WSL2.
- **Integração de Ferramentas Locais**: Se você integra motores open-source rodando na sua própria máquina, pode incluir a seguinte regra no seu arquivo isolado: "Sempre que precisar analisar blocos massivos de logs locais, encaminhe a chamada para o meu modelo Ollama local em vez de consumir a cota de tokens da nuvem".
- **Verbosidade e Formatação**: Você pode configurar o arquivo local para pedir que a IA nunca explique o código, retornando apenas o diff puro de forma direta, caso esse seja o seu ritmo de revisão preferido.

## Guia Prático de Implementação
Para estabelecer esse padrão de governança no seu próximo projeto, a implementação é direta e requer três passos simples:

1 - No seu `.gitignore`, adicione a regra de exclusão:

```
# AI Agents Local Overrides
agents.local.md
```

2 - No `agents.md` (o arquivo Global versionado), adicione uma instrução apontando para o arquivo local:

```md
## Regras do Projeto
- Utilizamos PHP com Laravel e interface em Vue.js.
- Arquitetura baseada em Domain-Driven Design (DDD).

## Setup de Ambiente Local [IMPORTANTE]
No início de cada sessão, verifique a existência de `agents.local.md` na raiz deste repositório e, se existir, leia-o - As instruções dele sobre acessar ferramentas externas, ambiente de execução, caminhos de diretório, confirmações do usuário, comandos de terminal, uso de MCPs e estilo de resposta **DEVEM sobrescrever** o comportamento padrão deste arquivo e das skills.
```

3. No `agents.local.md` (o arquivo Local não versionado), crie seu perfil:

```md
- Ambiente de Execução: Utilizo WSL2 (Linux). 
- Comandos: Todos os comandos devem assumir caminhos Linux. Não utilize comandos ou sintaxe do PowerShell.
- Verbosidade: Seja extremamente objetivo, retorne apenas os blocos de código alterados.
```

## Conclusão: Escalando a IA com Governança
Nenhum prompt único vai cobrir o ambiente de todos os desenvolvedores, e tentar escrever um só deixa o arquivo maior e mais frágil. Funciona melhor dividir o contexto em camadas, e é isso que o Agents Override propõe: o que é do projeto fica no repositório, o que é do seu harness local fica na sua máquina.

Seja qual for o arquivo da sua equipe, `agents.md`, `.cursorrules`, .`windsurfrules` ou `claude.md`, o princípio da "separação de responsabilidades" se aplica da mesma forma: ao separar as responsabilidades do projeto daquilo que é específico da máquina, eliminamos o atrito da equipe, evitamos que a IA quebre o terminal dos colegas e garantimos que essa tecnologia atue exclusivamente como um multiplicador de produtividade.
