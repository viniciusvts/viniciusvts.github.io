---
title: "Agents Override: Harness Local em Equipes Heterogêneas"
excerpt: "Como usar Agents Override no Harness resolve o atrito de ambientes mistos no uso de IA em equipes, separando as regras globais do projeto das configurações locais de cada desenvolvedor."
translation_key: agents-override-local-harness
---

{% include figure popup=false image_path="/assets/images/agents-override-local-harness.jpg" alt="agents.md file overrides local harness" caption="agents.md file overrides local harness" %}

## Introdução
A adoção de assistentes de IA diretamente nas IDEs mudou a forma como escrevemos software. Hoje, é padrão estabelecer um arquivo `agents.md` na raiz do repositório para que a inteligência artificial entenda as regras. Esse conceito tem se espalhado sob diversos nomes: `.cursorrules`, `.windsurfrules` ou `claude.md`. Porém, à medida que o uso sai do desenvolvedor solo e escala para equipes heterogêneas surge um problema: o atrito de infraestrutura.

Motivo: Misturar instruções de regras de negócio ou arquitetura com comandos restritos à infraestrutura local de quem escreveu o prompt original.

A tese central é simples: **As instruções de IA não devem misturar as regras de negócio ou de arquitetura do software com os comandos de infraestrutura local do desenvolvedor.**

## A Solução Arquitetural: O Padrão "Local Override"
Da mesma forma que a engenharia de software resolveu o problema das credenciais de banco de dados e variáveis de ambiente com os famosos arquivos .env, precisamos aplicar o conceito de override (sobrescrita) local para o contexto dos agentes de IA.

A separação de responsabilidades aqui é clara: o repositório deve ditar a regra de negócio, enquanto a máquina do desenvolvedor dita a regra de execução.

- **A Camada Global (`agents.md`)**: É o arquivo principal, versionado no Git. Ele contém as convenções técnicas da equipe. É aqui que você explica que o backend roda com uma linguagem, com um framework específico, como que a interface é construída e com que princípios o design do sistema obedece estritamente. São as "leis" imutáveis do projeto, válidas para todos.
- **A Camada Local (`agents.local.md`)**: É o arquivo que deve ser inserido obrigatoriamente no .gitignore. Ele pertence única e exclusivamente à máquina do desenvolvedor. Aqui ficam as idiossincrasias e preferências pessoais: se o desenvolvedor opera nativamente no Windows, se roda tudo virtualizado em containers Docker, ou se o ambiente de eleição é o WSL2 com uma distribuição Linux.

## Casos de Uso: Muito Além da Infraestrutura
Adotar esse padrão de camadas permite que a equipe consiga dar o verdadeiro harness em todas as capacidades das ferramentas de IA, extraindo o máximo de produtividade sem engessar ou quebrar o fluxo de trabalho dos colegas. O `agents.local.md` serve para moldar toda a experiência individual:

- **Execução e Terminal**: Enquanto um desenvolvedor pode instruir a IA a sempre rodar os comandos de migração através de containers isolados no Docker, outro orienta a ferramenta a usar executáveis nativos e caminhos baseados em bash do seu WSL2.
- **Integração de Ferramentas Locais**: Se você integra motores open-source rodando na sua própria máquina, pode incluir a seguinte regra no seu arquivo isolado: "Sempre que precisar analisar blocos massivos de logs locais, encaminhe a chamada para o meu modelo Ollama local em vez de consumir a cota de tokens da nuvem".
- **Verbosidade e Formatação**: Você pode configurar o arquivo local para pedir que a IA nunca explique o código, retornando apenas o diff puro de forma direta, caso esse seja o seu ritmo de revisão preferido.

## Guia Prático de Implementação
Para estabelecer esse padrão de governança no seu próximo projeto, a implementação é direta e requer três passos simples:

1. No seu .gitignore, adicione a regra de exclusão:

```
# AI Agents Local Overrides
agents.local.md
```

2. No `agents.md` (o arquivo Global versionado), adicione a âncora de leitura:

```md
## Regras do Projeto
- Utilizamos PHP com Laravel e interface em Vue.js.
- Arquitetura baseada em Domain-Driven Design (DDD).

## Setup de Ambiente Local [IMPORTANTE]
Sempre verifique silenciosamente a existência de um arquivo chamado `agents.local.md` na raiz deste repositório antes de sugerir ou executar qualquer comando de terminal. Se o arquivo existir, suas instruções de execução, caminhos de diretório e preferências DEVEM sobrescrever o comportamento padrão.
```

3. No `agents.local.md` (o arquivo Local não versionado), crie seu perfil:

```md
- Ambiente de Execução: Utilizo WSL2 (Linux). 
- Comandos: Todos os comandos devem assumir caminhos Linux. Não utilize comandos ou sintaxe do PowerShell.
- Verbosidade: Seja extremamente objetivo, retorne apenas os blocos de código alterados.
```

## Conclusão: Escalando a IA com Governança
A verdadeira maturidade na adoção de inteligência artificial por times de desenvolvimento não está em tentar criar um "super-prompt" único e imaculado que preveja todos os cenários. A resposta está em criar uma arquitetura de contexto que seja nativamente flexível.

Seja a sua equipe usuária de `agents.md`, `.cursorrules`, .`windsurfrules` ou `claude.md`, o princípio fundamental da "separação de responsabilidades" deve prevalecer. Ao isolar o que é universal ao projeto daquilo que é específico da máquina, eliminamos o atrito da equipe, evitamos que a IA quebre o terminal dos colegas e garantimos que essa tecnologia atue exclusivamente como um multiplicador de produtividade.
