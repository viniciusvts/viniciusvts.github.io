---
title: "Git Fluid Flow: Uma Estratégia de Branching para Entregas Desacopladas"
excerpt: "Frustrado com entregas bloqueadas por causa de ambientes? Conheça o Fluid Flow, uma estratégia de branching focada em entregas desacopladas e tarefas independentes."
translation_key: git-fluid-flow-branching-strategy
---

{% include figure popup=false image_path="/assets/images/git-fluid-flow.png" alt="Git Fluid Flow Represetation" caption="Uma Estratégia de Branching para Entregas Desacopladas" %}

## Introdução

Admitamos o seguite cenário:

- A funcionalidade A está pronta para produção.
- A funcionalidade B ainda possui bugs identificados pelo QA.
- A funcionalidade C aguarda aprovação do cliente em homologação.

Apesar disso, todas fazem parte do mesmo ciclo de promoção entre ambientes. Como consequência, a funcionalidade A já desenvolvida, testada e aprovada acaba aguardando pela evolução das demais para ser entregue.

Se você trabalha em equipes médias ou grandes, provavelmente já vivenciou alguma situação semelhante.

À medida que organizações crescem, o fluxo de entregas tende a se tornar cada vez menos previsível. Diferentes equipes trabalham em funcionalidades distintas, aprovações acontecem em ritmos diferentes e prioridades mudam constantemente. Enquanto algumas entregas precisam chegar rapidamente à produção, outras podem permanecer semanas em validação funcional ou aguardando decisões de negócio.

Nesse contexto, surge uma pergunta simples:

> Por que uma entrega independente deveria depender do ciclo de vida de outras entregas para ser promovida?

Muitas estratégias de branching modernas resolveram diversos problemas importantes ao longo dos anos. Elas ajudaram a organizar equipes, reduzir riscos e estruturar processos de integração e deploy. No entanto, em ambientes com grande volume de mudanças e deploy contínuo, ainda é comum encontrar fluxos onde ambientes representam etapas obrigatórias de promoção, fazendo com que funcionalidades independentes acabem compartilhando a mesma jornada.

O resultado é conhecido: entregas bloqueadas, exceções de processo, hotfixes emergenciais e uma crescente necessidade de mecanismos paralelos para contornar limitações do próprio fluxo adotado.

Foi observando esse cenário que surgiu o Fluid Flow.

Em vez de tratar ambientes como etapas obrigatórias de uma linha de evolução, o Fluid Flow propõe uma abordagem baseada em entregas desacopladas, onde cada tarefa possui seu próprio ciclo de vida e pode ser promovida independentemente para os estados do produto que façam sentido para aquela entrega.

O objetivo desta estratégia não é substituir modelos já consolidados nem servir como solução universal para todos os contextos. Sua proposta é oferecer uma alternativa para equipes que convivem com múltiplas entregas simultâneas, ciclos de aprovação independentes e a necessidade de manter estados reproduzíveis do software sem criar dependências artificiais entre funcionalidades.

## Limitações do Git Flow e GitLab Flow em Ambientes Modernos

Antes de apresentar uma nova estratégia de branching, vale a pena reconhecer um fato importante: Git Flow e GitLab Flow resolveram problemas reais e continuam sendo excelentes opções para muitos contextos.

O Git Flow trouxe organização para equipes que trabalhavam com ciclos de release bem definidos. O modelo estabelece uma separação clara entre desenvolvimento, preparação de versões e correções emergenciais, criando um processo previsível para a evolução do software.

Posteriormente, o GitLab Flow simplificou diversos aspectos dessa abordagem. Em vez de depender de múltiplas branches especializadas para releases e hotfixes, o modelo aproxima o fluxo de trabalho da realidade operacional de muitas equipes modernas, especialmente aquelas que utilizam integração contínua e deploy frequente.

Entretanto, ambos os modelos compartilham uma característica importante: a promoção das alterações continua fortemente associada à evolução dos ambientes.

Considere uma estrutura simplificada:

{% include figure popup="true" image_path="/assets/images/postContent/simplified-git-structure-screenshot.png" alt="Estrutura simplificada do git" caption="Estrutura simplificada do git (screenshot by autor)" %}

Nesse cenário, os ambientes representam uma linha de progressão natural do software. O que está em homologação normalmente já passou por teste. O que está em produção normalmente já passou por homologação.

Essa abordagem funciona muito bem quando as entregas avançam juntas.

Mas o que acontece quando elas não avançam?

Imagine três funcionalidades independentes: Login Social, Exportação para PDF e Integração com ERP.

- O Login Social está pronto para produção.
- A Exportação para PDF ainda apresenta falhas identificadas pelo QA.
- A Integração com ERP aguarda aprovação de uma área externa.

Embora possuam ciclos de vida completamente diferentes, muitas vezes essas funcionalidades acabam compartilhando o mesmo fluxo de promoção. Como consequência, uma entrega pronta pode ficar aguardando a evolução das demais para seguir adiante.

Em equipes pequenas esse impacto costuma ser reduzido. Porém, à medida que o número de desenvolvedores, stakeholders e entregas simultâneas aumenta, essa dependência tende a se tornar cada vez mais perceptível.

Tanto Git Flow quanto GitLab Flow foram concebidos partindo da ideia de que existe uma evolução relativamente linear entre os estados do software. Em muitos cenários essa premissa continua válida e desejável.

Mas existem organizações onde diferentes funcionalidades precisam avançar em ritmos distintos, atingir ambientes diferentes e ser promovidas em momentos completamente independentes.

Quando isso acontece, surge uma necessidade diferente: desacoplar a promoção das entregas sem perder rastreabilidade, reprodutibilidade e controle sobre os estados do produto.

É exatamente nesse ponto que nasce a proposta do Fluid Flow.

## O que é o Fluid Flow?

**O Fluid Flow é uma estratégia de branching para entregas desacopladas.**

A proposta parte de uma premissa simples:

> Entregas independentes devem poder evoluir de forma independente.

Embora pareça uma afirmação óbvia, muitas estratégias de branching acabam associando a promoção de funcionalidades à promoção dos ambientes pelos quais elas transitam. Como consequência, funcionalidades distintas passam a compartilhar o mesmo ciclo de vida, mesmo quando possuem níveis de maturidade, prioridades e processos de aprovação completamente diferentes.

O Fluid Flow inverte essa lógica.

Em vez de utilizar ambientes como principal mecanismo de evolução do software, a estratégia coloca a tarefa no centro do processo de promoção.

Isso significa que cada entrega possui seu próprio ciclo de vida e pode avançar de forma independente das demais, desde que esteja pronta para atingir o estado desejado do produto.

Em outras palavras:

> A unidade de promoção deixa de ser o ambiente e passa a ser a tarefa.

Essa mudança de perspectiva produz uma consequência importante.

Em modelos tradicionais, os ambientes normalmente representam etapas de uma evolução temporal:

```text
test
 ↓
hml
 ↓
main (produção)
```

No Fluid Flow, os estados do produto deixam de representar uma sequência obrigatória de promoção e passam a representar estados reproduzíveis e independentes.

Isso permite cenários onde diferentes funcionalidades coexistem em diferentes estados sem que uma bloqueie a evolução da outra.

Por exemplo, uma funcionalidade pode estar disponível apenas em teste enquanto outra já se encontra em produção. Da mesma forma, uma correção crítica pode ser promovida imediatamente para produção sem depender de funcionalidades ainda em validação.

O resultado é um fluxo mais flexível para equipes que trabalham com múltiplas entregas simultâneas e cujos ciclos de aprovação não seguem necessariamente uma ordem cronológica única.

O nome Fluid Flow surge justamente dessa característica.

Em vez de impor uma trajetória rígida para todas as entregas, a estratégia permite que cada tarefa percorra seu próprio caminho até os estados do produto para os quais foi planejada, respeitando as necessidades operacionais da equipe e do negócio.

Essa flexibilidade, entretanto, não significa ausência de estrutura, para que entregas desacopladas continuem rastreáveis, reproduzíveis e compreensíveis ao longo do tempo, o Fluid Flow estabelece um conjunto conceitos que servirão de base para toda a estratégia.

## Conceitos Fundamentais

O Fluid Flow foi projetado para ser uma estratégia simples de compreender e flexível o suficiente para se adaptar a diferentes contextos organizacionais.

Por esse motivo, a estratégia se apoia em poucos conceitos fundamentais.

### Branch de Estado

**Uma Branch de Estado representa um estado duradouro e reproduzível do produto.**

O significado desse estado depende das necessidades da organização.

Em algumas equipes, uma Branch de Estado pode representar um ambiente:

```text
env/test
env/hml
main
```

Em outras, pode representar uma versão do software:

```text
v1
v2
v3
```

Também pode representar releases específicas:

```text
release/2026.1
release/2026.2
```

O Fluid Flow não impõe uma estrutura organizacional específica. Seu único requisito é que essas branches representem estados estáveis do produto capazes de servir como ponto de partida para novas entregas.

Por esse motivo, toda tarefa deve nascer a partir de uma Branch de Estado.

### Branch de Tarefa

**Uma Branch de Tarefa representa uma unidade de entrega independente.**

Ela deve possuir escopo claro, valor identificável e capacidade de ser promovida sem depender da entrega simultânea de outras funcionalidades não relacionadas.

Na prática, uma Branch de Tarefa se aproxima bastante do conceito de História de Usuário utilizado por muitas equipes ágeis:

> Uma tarefa deve ser independente, valiosa, pequena, testável e capaz de ser entregue isoladamente.

Exemplos:

```text
task/login-social
task/exportacao-pdf
task/integracao-erp
```

ou

```text
feat/login-social
fix/correcao-token
patch/erro-relatorio
```

A estratégia não impõe uma convenção de nomenclatura específica. O importante é que a branch represente uma única entrega com ciclo de vida próprio.

Enquanto uma Branch de Estado representa um estado do produto, uma Branch de Tarefa representa uma mudança nesse estado.
{: .notice--warning}

### Promoção Independente

A Promoção Independente é o conceito central do Fluid Flow.

Em modelos tradicionais, a promoção costuma ocorrer através da evolução dos ambientes. Uma alteração avança porque o ambiente avança.

No Fluid Flow acontece o contrário: A alteração avança porque a tarefa avança.

Isso significa que uma mesma tarefa pode ser promovida para diferentes Branches de Estado conforme sua maturidade e necessidade operacional.

Como exemplo considere que a partir de um nó da `main` é criada a tarefa `task/login-social`. Então:

{% include figure popup="true" image_path="/assets/images/postContent/task-branch-has-independent-promotion.png" alt="Task branch tem promoção independente" caption="Task branch tem promoção independente (screenshot by autor)" %}

Da mesma forma, diferentes tarefas podem coexistir em diferentes estados do produto:

{% include figure popup="true" image_path="/assets/images/postContent/different-tasks-can-coexist-in-different-product-states.png" alt="Task branch pode coexistir em diferentes estados do produto" caption="Task branch pode coexistir em diferentes estados do produto (screenshot by autor)" %}

Sem que exista dependência obrigatória entre elas.

Essa característica permite que funcionalidades independentes sigam ciclos de validação e aprovação distintos, reduzindo bloqueios artificiais entre entregas.

Em resumo:

> No Fluid Flow, a unidade de promoção é a tarefa, não o ambiente.

## Os Axiomas do Fluid Flow

Os conceitos apresentados até aqui definem os elementos da estratégia. Os axiomas definem o comportamento esperado desses elementos.

Diferentemente de regras operacionais ou convenções específicas de uma equipe, os axiomas representam os princípios fundamentais que caracterizam o Fluid Flow. São eles que preservam a identidade da estratégia independentemente da ferramenta, da estrutura organizacional ou do processo adotado.

### Axioma 1: A tarefa é a unidade fundamental de promoção

No Fluid Flow, a promoção não acontece porque um ambiente evolui.

A promoção acontece porque uma tarefa evolui.

Cada tarefa possui seu próprio ciclo de vida e sua própria trajetória dentro do processo de entrega.

Essa é a principal mudança de perspectiva proposta pela estratégia.

> A unidade de promoção é a tarefa, não o ambiente.

### Axioma 2: Tarefas independentes devem poder evoluir de forma independente

Uma tarefa não deve depender da promoção de outras tarefas para avançar em seu próprio ciclo de vida.

Se uma funcionalidade está pronta para atingir determinado estado do produto, sua promoção não deve ser bloqueada artificialmente por entregas não relacionadas.

Por exemplo:

```text
task/login-social
```

pode ser promovida para produção.

Enquanto:

```text
task/exportacao-pdf
```

permanece em homologação.

E:

```text
task/integracao-erp
```

continua em testes.

Cada entrega evolui conforme seu próprio nível de maturidade e necessidade de negócio.

### Axioma 3: Branchs de Estado representam estados reproduzíveis do produto

As Branches de Estado representam estados conhecidos e reproduzíveis do software.

Esses estados podem assumir diferentes significados dependendo do contexto da organização:

* Ambientes.
* Versões.
* Releases.
* Customizações específicas.
* Linhas evolutivas distintas do produto.

O importante não é a nomenclatura utilizada, mas a capacidade de representar um estado consistente e compreensível do sistema.

### Axioma 4: O fluxo deve permanecer desacoplado da estrutura organizacional

O Fluid Flow não exige ambientes específicos, convenções de nomenclatura, estratégias de merge ou políticas de versionamento.

A estratégia foi concebida para adaptar-se às necessidades da organização, e não para impor uma estrutura operacional única.

Por esse motivo, equipes diferentes podem utilizar o mesmo modelo mesmo possuindo ambientes, processos de validação e ciclos de entrega completamente distintos.

### Flexibilidade sem perda de controle

Os axiomas não determinam:

* Como merges devem ser realizados.
* Quando utilizar rebase.
* Como resolver conflitos.
* Como nomear branches.
* Como construir pipelines.
* Como organizar ambientes.

Essas decisões permanecem sob responsabilidade da equipe.

O papel dos axiomas é estabelecer um conjunto mínimo de regras capazes de preservar a principal característica da estratégia:

> Entregas independentes devem poder evoluir de forma independente.

## Exemplo prático

Até este ponto discutimos os conceitos e axiomas que fundamentam o Fluid Flow. Agora vamos observar a estratégia em funcionamento através de um cenário comum em equipes que realizam deploy contínuo.

Considere uma aplicação que possui três estados de produto representados pelas seguintes referências:

```text
env/test
env/hml
main
```

Onde:

* `env/test` representa o ambiente de testes.
* `env/hml` representa o ambiente de homologação.
* `main` representa o ambiente de produção.

Em determinado momento, três novas demandas chegam à equipe:

```text
task/login-social
task/exportacao-pdf
task/integracao-erp
```

Cada uma delas representa uma entrega independente, com escopo próprio, critérios de aceitação específicos e ciclos de validação distintos.

As tarefas são criadas e desenvolvidas normalmente.

```text
main
 ├─ task/login-social
 ├─ task/exportacao-pdf
 └─ task/integracao-erp
```

Após a conclusão do desenvolvimento, todas são promovidas para o ambiente de testes.

```text
task/login-social   -> env/test
task/exportacao-pdf -> env/test
task/integracao-erp -> env/test
```

Durante a validação, o time de QA identifica problemas na funcionalidade de exportação para PDF.

Ao mesmo tempo:

* O Login Social é aprovado.
* A Integração com ERP segue em testes.
* A Exportação PDF retorna para ajustes.

Nesse momento, o Login Social é promovido para homologação.

```text
task/login-social -> env/hml
```

Enquanto isso:

* `task/exportacao-pdf` continua recebendo correções.
* `task/integracao-erp` permanece em validação.

Após a aprovação funcional em homologação, o Login Social é promovido para produção.

```text
task/login-social -> main
```

Observe que nenhuma outra tarefa precisou atingir o mesmo estágio para que isso acontecesse.

* `task/exportacao-pdf` continua em testes.
* `task/integracao-erp` continua seu processo normal de validação.

A Integração com ERP é promovido para homologação.

```text
task/integracao-erp -> env/hml
```

Ao final desse cenário, temos algo semelhante a:

```text
login-social
 └─ main

integracao-erp
 └─ env/hml

exportacao-pdf
 └─ env/test
```

Cada tarefa encontra-se em um estado diferente do produto.

Cada tarefa possui um nível diferente de maturidade.

Cada tarefa segue um ritmo diferente de evolução.

Ainda assim, nenhuma delas bloqueia a promoção das demais.

Esse é o principal objetivo do Fluid Flow.

Em modelos tradicionais, a promoção normalmente acompanha a evolução dos ambientes. Quando um conjunto de alterações avança, todas as alterações presentes naquele estado avançam junto.

No Fluid Flow acontece o contrário.

As tarefas avançam individualmente conforme atingem os critérios necessários para cada estado do produto.

O resultado é um fluxo onde entregas independentes permanecem independentes durante todo o seu ciclo de vida.

> Uma tarefa deve ser promovida quando estiver pronta sem precisar esperar que outras tarefas estejam prontas.

## Benefícios

Toda estratégia de branching envolve trade-offs.

O objetivo do Fluid Flow não é eliminar a complexidade inerente ao desenvolvimento de software, mas reduzir alguns dos principais atritos encontrados por equipes que trabalham com múltiplas entregas simultâneas e ciclos de aprovação independentes.

Quando aplicado em cenários adequados, o modelo oferece benefícios importantes.

### Entregas desacopladas

O principal benefício do Fluid Flow é permitir que entregas independentes permaneçam independentes durante todo o seu ciclo de vida.

Em muitos modelos tradicionais, diferentes funcionalidades acabam compartilhando a mesma trajetória de promoção entre ambientes. Como consequência, uma entrega pronta pode ficar aguardando a evolução de outras entregas que ainda não atingiram o mesmo nível de maturidade.

No Fluid Flow, cada tarefa possui sua própria trajetória.

Isso permite que funcionalidades avancem conforme seus próprios critérios de validação, aprovação e prioridade de negócio.

> Uma tarefa deve ser promovida quando estiver pronta sem precisar esperar que outras tarefas estejam prontas.

### Redução de bloqueios entre equipes

Em organizações maiores, diferentes equipes frequentemente trabalham sobre o mesmo produto.

Nem todas as entregas possuem a mesma prioridade.

Nem todas as entregas possuem os mesmos riscos.

Nem todas as entregas possuem o mesmo processo de aprovação.

Ao transformar a tarefa na unidade fundamental de promoção, o Fluid Flow reduz a necessidade de coordenação artificial entre entregas não relacionadas.

O resultado é uma menor quantidade de bloqueios causados exclusivamente pela estrutura do fluxo de branching.

### Estados reproduzíveis do produto

No Fluid Flow, as Branches de Estado representam estados conhecidos do software.

Esses estados podem representar ambientes, versões, releases ou qualquer outra linha evolutiva adotada pela organização.

Essa abordagem facilita a compreensão do que compõe cada estado do produto em determinado momento e simplifica a criação de novas entregas a partir de referências conhecidas.

Além disso, torna mais simples reproduzir cenários específicos para testes, manutenção e correções.

### Flexibilidade para diferentes modelos de entrega

Nem toda organização trabalha da mesma forma.

Algumas operam com deploy contínuo.

Outras trabalham com múltiplas versões simultâneas.

Algumas mantêm customizações específicas para determinados clientes.

Outras utilizam ciclos formais de release.

O Fluid Flow não exige uma estrutura organizacional específica para funcionar.

A mesma estratégia pode ser aplicada utilizando ambientes, versões, releases ou outras formas de representar estados do produto.

Essa flexibilidade permite adaptar o modelo a diferentes contextos sem alterar seus princípios fundamentais.

### Simplificação de automações e pipelines

Quando a promoção deixa de depender da evolução coletiva dos ambientes, os pipelines tendem a se tornar mais previsíveis.

Em vez de interpretar estágios complexos de release, a automação passa a lidar com eventos mais simples e objetivos:

* Uma tarefa foi promovida para determinada Branch de Estado.
* Uma Branch de Estado recebeu novas alterações.
* Um estado específico do produto precisa ser implantado.

Essa abordagem facilita a construção de pipelines de integração contínua e entrega contínua mais claros, reduzindo regras especiais e exceções operacionais.

### Menor necessidade de processos paralelos

Uma situação comum em equipes que realizam deploy frequente é a criação de mecanismos paralelos para contornar limitações do fluxo principal.

Hotfixes emergenciais.

Branches temporárias.

Promoções manuais.

Processos excepcionais para liberar funcionalidades específicas.

Embora esses mecanismos continuem existindo quando necessários, o desacoplamento das entregas reduz a frequência com que exceções precisam ser criadas apenas para evitar que uma funcionalidade fique bloqueada por outra.

### Alinhamento com a realidade operacional

Talvez o maior benefício do Fluid Flow seja sua proximidade com a forma como muitas organizações já operam na prática.

Em equipes com múltiplas entregas simultâneas, diferentes áreas de negócio, diversos stakeholders e prioridades em constante mudança, raramente todas as funcionalidades evoluem no mesmo ritmo.

O Fluid Flow reconhece essa realidade e transforma essa característica em parte natural da estratégia.

Em vez de tentar sincronizar artificialmente todas as entregas, o modelo permite que cada uma siga seu próprio ciclo de vida, preservando rastreabilidade, controle e previsibilidade ao longo do processo.

## Recomendações Operacionais

As recomendações apresentadas nesta seção não são obrigatórias para a utilização do Fluid Flow. Elas representam práticas que tendem a maximizar os benefícios da estratégia e minimizar problemas operacionais observados durante sua adoção.

### Prefira criar tarefas a partir da referência de destino

Sempre que possível, crie a tarefa a partir da Branch de Estado que representa seu destino final.

Por exemplo:

```text
main
 └─ task/login-social
```

em vez de:

```text
env/test
 └─ task/login-social
```

Ao criar uma tarefa a partir de um estado intermediário, ela pode herdar alterações que ainda não atingiram seu estado final de entrega.

Isso aumenta o risco de dependências involuntárias entre funcionalidades que deveriam permanecer independentes.

Criar tarefas a partir de sua referência de destino tende a preservar o desacoplamento entre entregas e simplificar futuras promoções.

### Mantenha tarefas pequenas e independentes

O Fluid Flow produz melhores resultados quando cada tarefa representa uma entrega clara e autocontida.

Na prática, isso significa que uma tarefa deve possuir:

* Objetivo específico.
* Escopo reduzido.
* Critérios de aceitação definidos.
* Capacidade de ser entregue isoladamente.

Quanto maior a tarefa, maior a probabilidade de dependências, conflitos e bloqueios durante sua evolução.

### Cuidado com dependências entre tarefas

A promoção independente é mais eficaz quando as tarefas também são independentes do ponto de vista funcional e técnico.

Por exemplo:

```text
task/login
task/permissoes
```

Se a implementação de permissões depende diretamente da existência prévia do login, talvez ambas façam parte da mesma linha evolutiva e devam ser planejadas em etapas.

Quanto menor o acoplamento entre tarefas, maior a flexibilidade de promoção.

### Utilize referências com propósito bem definido

Branches de Estado devem possuir significado claro para toda a equipe.

Por exemplo:

```text
env/test
env/hml
main
```

ou:

```text
v1
v2
```

ou:

```text
release/2026.1
release/2026.2
```

O importante é que qualquer integrante da equipe consiga compreender rapidamente o papel daquela referência dentro do fluxo.

Referências ambíguas reduzem a rastreabilidade e dificultam a compreensão do estado real do produto.

### Remova tarefas concluídas

Após atingir seu objetivo, uma Branch de Tarefa normalmente deixa de possuir utilidade operacional.

Manter branches antigas indefinidamente tende a aumentar a complexidade do repositório e dificultar a navegação ao longo do tempo.

Sempre que possível, remova branches que já concluíram seu ciclo de vida.

Caso novas alterações sejam necessárias no futuro, uma nova tarefa poderá ser criada a partir da referência apropriada.

### Automatize a promoção sempre que possível

O Fluid Flow não exige uma implementação específica de CI/CD.

Entretanto, a estratégia tende a produzir melhores resultados quando os processos de validação, build e deploy são automatizados.

Como as promoções acontecem de forma independente, pipelines automatizados ajudam a garantir previsibilidade e reduzem o custo operacional associado ao gerenciamento simultâneo de múltiplas entregas.

Além disso, a automação facilita a rastreabilidade das promoções realizadas ao longo do ciclo de vida de cada tarefa.

### Adapte a estratégia à sua realidade

O Fluid Flow não foi concebido para impor uma estrutura única de trabalho.

Equipes diferentes possuem necessidades diferentes.

Algumas organizações trabalham com ambientes de validação.

Outras trabalham com múltiplas versões do produto.

Algumas realizam deploy contínuo.

Outras operam através de ciclos de release planejados.

O objetivo da estratégia não é substituir essas particularidades, mas fornecer um modelo que permita promover entregas independentes sem criar dependências artificiais entre elas.

Por esse motivo, adapte as recomendações sempre que necessário, preservando os axiomas fundamentais que caracterizam o Fluid Flow.

## Conclusão

Estratégias de branching existem para ajudar equipes a entregar software com segurança, previsibilidade e rastreabilidade. Entretanto, à medida que produtos e organizações crescem, os desafios enfrentados pelas equipes também evoluem.

Em muitos contextos modernos, o problema já não está apenas em organizar código-fonte ou controlar versões. O desafio passa a ser permitir que múltiplas entregas coexistam, sejam validadas em ritmos diferentes e cheguem aos estados desejados do produto sem criar dependências artificiais entre si.

Foi a partir dessa necessidade que surgiu o Fluid Flow.

Ao longo deste artigo exploramos uma proposta baseada em uma ideia simples: a tarefa ser a unidade fundamental de promoção.

Essa mudança de perspectiva desloca o foco dos ambientes para as entregas. Em vez de depender da evolução coletiva dos estados do produto, cada tarefa passa a possuir seu próprio ciclo de vida e sua própria trajetória de promoção.

Essa abordagem permite que funcionalidades independentes avancem de forma independente, reduzindo bloqueios operacionais e oferecendo maior flexibilidade para equipes que trabalham com múltiplas entregas simultâneas.

Naturalmente, essa flexibilidade possui custos. O Fluid Flow não elimina a necessidade de boas práticas de engenharia, não resolve dependências técnicas existentes e não substitui processos adequados de qualidade, automação ou governança. Como qualquer estratégia de branching, ele representa um conjunto de escolhas e trade-offs.

Por esse motivo, o objetivo deste artigo não foi apresentar uma solução universal nem sugerir que modelos consolidados devam ser substituídos. Git Flow, GitLab Flow, Trunk-Based Development e outras estratégias continuam sendo excelentes opções quando aplicadas aos contextos para os quais foram concebidas.

O Fluid Flow é apenas uma alternativa para um problema específico: ambientes onde entregas independentes precisam evoluir de forma independente.

Em vez de tratar ambientes como etapas obrigatórias de uma linha de evolução, o Fluid Flow os trata como estados reproduzíveis do produto.

E, quando essa mudança de perspectiva faz sentido para a organização, uma consequência natural emerge:

**Uma tarefa deve ser promovida quando estiver pronta sem precisar esperar que outras tarefas estejam prontas.**
