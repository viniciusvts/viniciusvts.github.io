---
title: "Escolhendo a estratégia de branching git ideal para seu projeto"
excerpt: "As estratégias de branching são roteiros que as equipes utilizam para organizar seu trabalho, manter o controle de diferentes versões do código e colaborar de maneira fluida."
translation_key: git-branching-strategy-for-your-project
---

{% include figure popup=false image_path="/assets/images/tree-branchs.png" alt="ramos de uma árvore" caption="Ramificação (imagem por Talashuk na Unsplash)" %}

O <a target="_blank" rel="noopener" href="https://git-scm.com/">Git</a> é o sistema de controle de versão padrão no desenvolvimento de software moderno. Com a capacidade de rastreio de mudanças e de facilitar a colaboração entre equipes o Git permite que versões do código-fonte coexistam, possibilitando o trabalho em paralelo e a manutenção do código.

As estratégias de branching são roteiros que as equipes utilizam para organizar seu trabalho, manter o controle de diferentes versões do código e colaborar de maneira fluida. Elas definem como os desenvolvedores devem criar, utilizar e integrar branchs ao longo do ciclo de vida do desenvolvimento. Sem uma estratégia clara, as equipes podem enfrentar desafios como conflitos de merge frequentes, dificuldade em rastrear o progresso e instabilidade no código base principal. O Git é uma ferramenta flexível e permite diversas formas de colaboração, não existe uma solução única para todos os cenários e as equipes precisam escolher a estratégia de branching que melhor se adapta às suas necessidades.

## Explorando as Principais Estratégias de Branching Git

Estratégias de branching evoluíram para atender a diferentes cenários de desenvolvimento. Compreender as nuances entre elas é o primeiro passo para fazer uma escolha informada.

### Trunk-Based Development (TBD)

No <a target="_blank" rel="noopener" href="https://trunkbaseddevelopment.com/">Trunk-Based Development</a> os desenvolvedores integram pequenas atualizações em uma branch principal, conhecida como **trunk** ou **main**. Essa estratégia enfatiza a rápida integração com um número mínimo de branchs, promovendo velocidade na iteração.

{% include figure popup="true" image_path="/assets/images/postContent/trunk-base-development-commiter-stright-into-the-trunk.png" alt="Trunk-Based Development For Smaller Teams" caption="Trunk-Based Development For Smaller Teams (trunkbaseddevelopment.com)" %}

No TBD, os desenvolvedores trabalham diretamente no branch principal ou utilizam branchs de curta duração, com um ciclo de vida de horas ou, no máximo, um dia, resistindo a qualquer pressão para criar outros branchs de desenvolvimento de longa duração. A integração e o teste do código ocorrem continuamente e Pull requests são utilizados para a revisão do código antes que seja realizado o **merge** das feature branchs ao trunk. Uma técnica comum no TBD é o uso de "feature flags" para isolar funcionalidades que ainda não estão completas, permitindo que o código seja integrado sem afetar a experiência do usuário final.

{% include figure popup="true" image_path="/assets/images/postContent/trunk-base-development-scale-feature-branchs.png" alt="Scaled Trunk-Based Development" caption="Scaled Trunk-Based Development (trunkbaseddevelopment.com)" %}

O TBD promove uma integração rápida e feedback contínuo, minimiza conflitos de merge e incentiva a comunicação frequente entre os membros da equipe. Facilita a implementação de Continuous Integration e Continuous Delivery (CI/CD) e reduz a complexidade ao evitar a proliferação de branchs de longa duração.

O TBD também apresenta desafios. Ele requer testes automatizados para garantir a estabilidade da branch principal. A observação ao processo são essenciais para evitar problemas. Se não for gerenciado corretamente, o TBD ainda pode levar a conflitos. Além disso, a estratégia exige que os desenvolvedores dividam seu trabalho em pequenos batches, o que pode ser uma mudança significativa para algumas equipes. A implementação do TBD pode ser desafiadora em cenários onde a manutenção de múltiplas versões do software é necessária.

Grandes empresas de tecnologia como o <a target="_blank" rel="noopener" href="https://trunkbaseddevelopment.com/game-changers/#google-revealing-their-monorepo-trunk-2016">Google</a>, e o <a target="_blank" rel="noopener" href="https://trunkbaseddevelopment.com/">Facebook</a> adotaram o TBD. A adoção por essas organizações demonstra sua escalabilidade e eficácia para projetos complexos, desde que haja investimento em automação e uma cultura de colaboração bem estabelecida. A capacidade de integração contínua e a redução de conflitos, mesmo em projetos de grande escala, superam os desafios quando suportados por automação e práticas rigorosas de revisão de código.

### Feature Branching

No fluxo de trabalho do <a target="_blank" rel="noopener" href="https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow">Feature Branching</a>, uma nova branch é criada para cada feature a partir do branch principal. Os desenvolvedores trabalham nessa branch, fazendo commits conforme necessário para registrar o progresso. Uma vez que a feature está completa, um pull request é criado para solicitar a integração das mudanças de volta ao branch principal. Outros desenvolvedores revisam o código no pull request, fornecendo feedback e garantindo a qualidade. Após a revisão e aprovação, é realizado o merge da feature branch de volta ao branch principal. Finalmente, a feature branch é geralmente deletada, pois não é mais necessária.

{% include figure popup="true" image_path="/assets/images/postContent/feature-branch-workflow.png" alt="How to publish your feature using feature branch" caption="How to publish your feature using feature branch workflow (atlassian.com)" %}

O Feature Branching oferece várias vantagens. Ele proporciona um isolamento claro das mudanças para cada feature , facilitando a colaboração, pois múltiplos desenvolvedores podem trabalhar em features diferentes simultaneamente. Se uma feature introduzir problemas, sua branch pode ser descartada sem afetar o restante do projeto. A estratégia também facilita a revisão de código e os processos de teste, resultando em um fluxo de desenvolvimento previsível.

No entanto, o Feature Branching também apresenta algumas desvantagens. Existe a possibilidade de conflitos de merge, especialmente se as branchs de features viverem por um longo período. Gerenciar e manter atualizadas inúmeras branchs pode se tornar complexo. Pode haver atrasos no merge das mudanças para o branch principal devido a revisões extensas. Além disso, se não foi realizado merge das branchs regularmente, elas podem se tornar estagnadas, dificultando a integração futura.

O Feature Branching é uma estratégia que serve como base para modelos mais complexos como o Gitflow e sendo adaptada em fluxos mais simples como o GitHub Flow e o GitLab Flow. Sua flexibilidade permite que seja utilizada em diversos tamanhos de equipe e complexidades de projeto.

### Gitflow

O <a target="_blank" rel="noopener" href="https://nvie.com/posts/a-successful-git-branching-model/">Gitflow</a> é uma estratégia de branching estruturada que utiliza múltiplas branchs com propósitos específicos, incluindo **main**, **develop**, **feature**, **release** e **hotfix**. Essa estratégia é adequada para projetos com ciclos de release bem definidos.

{% include figure popup="true" image_path="/assets/images/postContent/git-flow-workflow-atlassian.png" alt="Gitflow workflow" caption="Gitflow workflow (atlassian.com)" %}

No fluxo de trabalho do Gitflow, o branch main armazena o histórico oficial de releases, refletindo um estado de produção pronto. O branch develop serve como o branch de integração para as features em desenvolvimento. Para cada nova funcionalidade, uma branch feature é criada a partir de develop, e após a conclusão, é feito o merge de volta para develop. Quando um conjunto de features está pronto para ser lançado, uma branch release é criada a partir de develop para preparar a release, realizando os últimos ajustes e correções de bugs. Após os testes finais, a branch release é realizado o merge para main e para develop, e a versão em main é taggeada com o número da release. Para correções urgentes em produção, uma branch hotfix é criada diretamente a partir de main. Após a correção, ela é gerado o merge de volta para main (com uma nova tag de versão) e para develop (para garantir que a correção seja incluída em releases futuras). As convenções de nomenclatura de branchs desempenham um papel crucial nesse modelo.

O Gitflow oferece várias vantagens. Ele é bem organizado e fornece um fluxo de trabalho claro para desenvolvimento, teste e deploy. É eficaz para projetos com muitos colaboradores e suporta grandes equipes e projetos complexos. O isolamento de releases garante a estabilidade durante a preparação, e a estratégia facilita o desenvolvimento paralelo.

No entanto, o Gitflow também apresenta desvantagens. Ele pode ser complexo e lento para projetos menores ou para equipes que buscam entrega contínua. Historicamente, não suporta totalmente CI/CD devido ao seu ciclo de desenvolvimento mais longo. O Gitflow requer uma estrita aderência aos processos definidos e pode ser considerado excessivamente prescritivo ou inflexível por algumas equipes. Embora tenha sido popular no passado, o Gitflow tem perdido espaço para estratégias mais leves como o GitHub Flow e o Trunk-Based Development, especialmente para equipes que buscam agilidade e CI/CD.

> "O git-flow se tornou extremamente popular em muitas equipes de software, a ponto de as pessoas começarem a tratá-lo como uma espécie de padrão — mas, infelizmente, também como um dogma ou panaceia. [...] Para concluir, lembre-se sempre de que panaceias não existem. Considere seu próprio contexto. [...] Decida por si mesmo."(Vincent Driessen, idealizador do GitFlow)

### GitHub Flow

O <a target="_blank" rel="noopener" href="https://docs.github.com/en/get-started/using-github/github-flow">GitHub Flow</a> é uma estratégia de branching mais leve, focada em entrega contínua, com apenas um branch principal (main ou master) e feature branchs de curta duração. Essa abordagem é adequada para pequenas equipes e aplicações web que não exigem suporte para múltiplas versões de produção.

{% include figure popup="true" image_path="/assets/images/postContent/github-flow-workflow.png" alt="GitHub Flow Workflow" caption="GitHub Flow Workflow (nhonvo.github.io)" %}

No GitHub Flow, qualquer código no branch principal deve estar pronto para ser deployado. Para trabalhar em algo novo, os desenvolvedores criam branchs descritivas a partir do branch principal. Os commits são feitos nessas branchs locais e o trabalho é regularmente enviado para o branch remoto com o mesmo nome. Quando feedback ou ajuda são necessários, ou quando o trabalho é considerado pronto para merge, um pull request é aberto. Após a revisão e aprovação por outro membro da equipe, a é efetivado o merge da branch de volta ao branch principal. Uma vez feito merge e enviado para o main, deve ser feito o deploy imediatamente.

O GitHub Flow oferece facilidade de entendimento. Sua simplicidade permite a implementação de CI/CD. É ideal para pequenas equipes e aplicações web e promove rapidez em releases e feedbacks.

No entanto, o GitHub Flow tem menos estrutura para releases complexos ou para suportar múltiplas versões de produção.

A popularidade do GitHub Flow reside em sua simplicidade e alinhamento com os princípios ágeis e de entrega contínua, tornando-o uma escolha preferida para equipes modernas. Sua adoção por uma plataforma líder como o GitHub reforça sua praticidade e eficácia.

### GitLab Flow

O <a target="_blank" rel="noopener" href="https://about.gitlab.com/topics/version-control/what-is-gitlab-flow/">GitLab Flow</a> é apresentado como uma alternativa mais simples ao Gitflow, combinando o desenvolvimento orientado a features e branchs de ambientes busca um equilíbrio entre a simplicidade do GitHub Flow e a estrutura do Gitflow, oferecendo mais opções para gerenciar diferentes ambientes e releases.

{% include figure popup="true" image_path="/assets/images/postContent/git-lab-workflow.png" alt="GitLab Flow" caption="GitLab Flow" %}

No GitLab Flow, o desenvolvimento geralmente começa no branch principal (main). A estratégia incorpora um branch de pré-produção para a realização de correções de bugs antes que as mudanças sejam efetivadas de volta ao main para irem para produção. As equipes podem adicionar quantos branchs de pré-produção forem necessários para seus fluxos de trabalho, como **test**, **acceptance** e **production**. Os commits fluem do main para os branchs de pré-produção e, finalmente, para o branch de produção, garantindo que cada linha de código seja testada em todos os ambientes relevantes. Uma das características distintivas do GitLab Flow é sua integração com um sistema de rastreamento de issues, onde cada mudança significativa no código deve estar associada a uma issue que descreve o objetivo da alteração.

O GitLab Flow oferece várias vantagens. Proporciona flexibilidade para colaborar e manter diversas versões de software em diferentes ambientes. A estratégia diminui o overhead associado a releases, tagging e merges, que podem ser desafios em outros fluxos de trabalho. É particularmente útil para equipes que desejam manter um ambiente de staging separado do ambiente de produção. O GitLab Flow é construído com as práticas de DevOps em mente, facilitando a integração com pipelines de CI/CD.

Embora ofereça mais flexibilidade que o GitHub Flow, o GitLab Flow pode se tornar complexo com um grande número de branchs de ambiente. Além disso, requer disciplina para garantir que os commits sigam o fluxo correto.

O GitLab Flow busca um equilíbrio entre a simplicidade do GitHub Flow e a estrutura do Gitflow, oferecendo mais opções para gerenciar diferentes ambientes e releases. Como uma alternativa ao Gitflow e a ênfase no alinhamento com ambientes específicos sugere que o GitLab Flow foi projetado para abordar algumas das limitações do GitHub Flow em cenários mais complexos de deploy.

### Outras Estratégias

Além das estratégias principais, existem outras abordagens que podem ser adequadas para cenários específicos:

- Main-Only Strategy: Nesta estratégia, o branch principal é utilizado tanto para o desenvolvimento quanto para deploy. É uma abordagem simples e adequada para pequenas equipes ou projetos muito simples, não é escalável para projetos maiores ou equipes com muitos colaboradores.
- Release Branching: Nesta estratégia, branchs separadas são mantidas para cada versão de release do software. Essa abordagem é útil para manter um histórico claro de todas as releases e para garantir que o branch principal permaneça estável e pronto para novas funcionalidades. Também facilita a aplicação de patches e correções de bugs em versões específicas sem afetar outras. 

## Comparando as Estratégias

Para ajudar a visualizar as diferenças entre as principais estratégias de branching Git, a seguinte tabela resume suas características, vantagens e desvantagens principais:

{% include figure popup="true" image_path="/assets/images/postContent/diferenca-entre-as-principais-estrategias-branch.png" alt="tabela mostrando a diferença entre as principais estratégias de branching" caption="Diferenças entre as principais estratégias de branching Git (autor)" %}

## Como Escolher a Estratégia Certa para Seu Projeto

A seleção da estratégia de branching ideal não é uma decisão trivial e depende de uma variedade de fatores interconectados.

O tamanho e a estrutura da equipe de desenvolvimento desempenham um papel crucial. Equipes menores podem achar estratégias mais simples, como o GitHub Flow ou o Main-Only, mais adequadas, enquanto equipes maiores podem se beneficiar da organização e da estrutura do GitLab Flow.

A complexidade e o escopo do projeto também são considerações importantes. Projetos mais complexos geralmente exigem mais organização.

A frequência e o tipo de releases (contínuas versus versionadas) influenciam significativamente a escolha. Equipes que praticam Integração e Entrega Contínuas (CI/CD) geralmente se inclinam para o GitHub Flow ou o Trunk-Based Development.

A maturidade e a disciplina da equipe também devem ser consideradas. O Trunk-Based Development, por exemplo, requer um alto nível de disciplina e testes automatizados robustos para evitar instabilidade no branch principal.

A necessidade de suportar múltiplas versões simultaneamente é outro fator importante. Se o projeto requer a manutenção de várias versões de produção, o Gitflow ou o Release Branching podem ser mais apropriados.

Os requisitos de conformidade e os processos de release específicos da organização também podem influenciar a escolha. Algumas indústrias podem ter processos de release mais rigorosos que se alinham melhor com estratégias estruturadas como o Gitflow.

O tipo de produto e seu método de release também são relevantes. Por exemplo, aplicativos móveis com janelas de release definidas podem se beneficiar de estratégias como o Gitflow ou o GitLab Flow com branchs de release.

Finalmente, a tolerância a riscos da equipe pode desempenhar um papel na decisão. Estratégias com integração mais frequente, como o TBD, podem exigir uma maior confiança na automação e nos testes.

A escolha da estratégia de branching não é uma decisão isolada, mas sim uma que deve ser alinhada com a cultura da equipe, os objetivos do projeto e os processos de entrega de software.

## Conclusão

A escolha da estratégia de branching Git ideal é uma decisão crucial que impacta diretamente a forma como uma equipe de desenvolvimento colabora e entrega software. As principais estratégias discutidas – Trunk-Based Development, Feature Branching, Gitflow, GitHub Flow e GitLab Flow – oferecem diferentes abordagens com suas próprias vantagens e desvantagens. A estratégia Main-Only e o Release Branching atendem a necessidades mais específicas.

A seleção da estratégia mais adequada deve ser cuidadosamente considerada, levando em conta o tamanho da equipe, a complexidade do projeto, a frequência de releases, as necessidades de CI/CD e a maturidade da equipe. Não existe uma solução única para todos os cenários, e a estratégia escolhida deve se alinhar com os objetivos específicos do projeto e a cultura da equipe.

Adotar uma estratégia de branching é apenas o primeiro passo. Escrever [mensagens de commit com propósito](/blog/padronizar-e-facilitar-a-documentacao-de-projetos/) ajuda a manter um histórico claro e útil do projeto. A aplicação consistente de melhores práticas, como convenções de nomenclatura, merges frequentes, revisões de código e testes automatizados, é essencial para garantir um fluxo de trabalho eficaz e a entrega de software de alta qualidade.
