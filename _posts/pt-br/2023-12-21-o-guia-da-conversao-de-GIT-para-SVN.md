---
title: "Conversão de repositório SVN para GIT: um guia prático"
excerpt: "O guia prático para converter um repositório SVN para GIT."
translation_key: the-guide-from-GIT-to-SVN-conversion
redirect_from:
    - /blog/o-guia-da-conversao-de-git-para-svn/
    - /pt-br/blog/o-guia-da-conversao-de-git-para-svn/
    - /pt-br/blog/the-guide-from-GIT-to-SVN-conversion/
---

{% include figure popup=false image_path="/assets/images/conversion-of-source-code-managers.png" alt="representação da conversão de gerenciadores de código" caption="Conversão de gerenciadores de código. (imagem por DALL-E)" %}

A conversão de um repositório SVN para um repositório GIT é um processo que envolve a migração dos dados, da estrutura e do histórico de um sistema de controle de versão para outro. No [artigo anterior](/blog/dominando-a-conversao-de-repositorios-SVN-para-GIT/) abordei a minha pesquisa e aprofundamento no tema de conversão de repositório SVN para GIT. A seguir, apresentarei os passos realizados para a conversão dos repositórios no ambiente em que estou inserido.

## Requisitos iniciais

O computador precisa possuir os utilitários de linha de comando do GIT e do SVN. Para verificar se o GIT está instalado em seu computador execute o seguinte comando no terminal:

```bash
git help
```
A saída desse comando será semelhante a:

{% include figure popup="true" image_path="/assets/images/postContent/the-result-of-git-help-command.png" alt="print do comando git help" caption="Resultado do comando 'git help' (by author)" %}

Caso não possua o GIT instalado a saída será semelhante a:

```bash
git: command not found
```

Caso não tenha o GIT instalado, instale seguindo instruções disponíveis em: <a target="_blank" rel="noopener" href="https://git-scm.com/downloads">https://git-scm.com/downloads</a>

Para verificar se o SVN está instalado em seu computador execute o seguinte comando no terminal:

```bash
svn help
```

A saída desse comando será semelhante a:

{% include figure popup="true" image_path="/assets/images/postContent/the-result-of-svn-help-command.png" alt="captura de tela do comando svn help" caption="Saída do comando 'svn help' (by author)" %}

Caso não possua o SVN instalado a saída será semelhante a:

```bash
svn: command not found
```

Caso não possua o SVN instalado, instale seguindo instruções disponíveis em: <a target="_blank" rel="noopener" href="https://subversion.apache.org/quick-start">https://subversion.apache.org/quick-start</a>

## Criar o arquivo de autores

No SVN, os usuários são identificados apenas pelo nome de usuário. Já no GIT, os usuários são identificados pelo nome de usuário e endereço de e-mail. A criação do arquivo de autores é uma etapa importante no processo de migração de repositórios SVN para GIT. Esse arquivo é utilizado para mapear os autores dos commits do SVN para os usuários do GIT. Isso é necessário porque o SVN e o GIT usam diferentes sistemas de autenticação e identificação de usuários. O arquivo de autores é criado para garantir que os autores dos commits sejam corretamente identificados no GIT.

Dentro do diretório onde se encontra o repositório SVN em seu computador execute o comando para criação do arquivos de autores:

```bash
svn log -q | awk -F '|' '/^r/ {gsub(/ /, "", $2); sub("$", "",$2); print $2" = "$2" <"$2">"}' | sort -u > authors.txt
```

O resultado será um arquivo com a lista dos nomes de usuário encontrados no repositório SVN. Para que sejam corretamente identificados você deverá editar esse arquivo para que cada linha tenha o seguinte formato:

```
svn_username = Full Name <email@example.com>
```

Onde `svn_username` é o nome de usuário do SVN, `Full Name` é o nome completo do autor e `email@exemplo.com` é o endereço de e-mail do autor. Desta forma cada nome de usuário do SVN será corretamente identificado pelo nome e email correspondente no GIT.

## Iniciar o repositório GIT

Dentro do diretório onde deseja criar o repositório GIT digite o comando:

```bash
git svn init <repo_url> --no-metadata
```

Substitua `<repo_url>` pela URL do repositório SVN que deseja converter. É possível e encorajado que no caso de um repositório SVN possuir código fonte de várias stacks executar esse manual várias vezes, criando o diretório e repositório GIT para cada stack. Ex:

- git svn init https://repo.com.br/projeto/trunk/web/ --no-metadata
- git svn init https://repo.com.br/projeto/trunk/app/ --no-metadata
- git svn init https://repo.com.br/projeto/trunk/backend/ --no-metadata

## Configurar o arquivo de autores

Para atrela o novo repositório ao arquivo de autores execute o comando:

```bash
git config svn.authorsfile <authors_file_created>
```

Ao executar esse comando substitua `<authors_file_created>` pelo caminho do arquivo criado anteriormente. Lembre que esse arquivo será responsável por identificar corretamente cada nome de usuário no SVN para um nome e email no GIT.

## Configure as branchs (opcional)

Dentro do repositório GIT criado configure as branchs que deseja que sejam importadas. Para isso adicione ao arquivo `.git/config` a linha de configuração:

```
[-remote "svn"]
    branches = branches/feature*:refs/heads/*
```

O diretório `.git/` por padrão fica oculto nos sistemas, procure nas configurações do seu sistema operacional a opção de exibir pastas e arquivos ocultos

## Iniciar a conversão

Execute o comando para iniciar a conversão do repositório. Este comando poderá levar bastante tempo dependendo do tamanho do repositório.

```bash
git svn fetch
```

Esse processo pode ser interrompido, de forma que você pode iniciar em um dia, interromper e continuar em um outro momento.

## Conclusão

Apresentamos o passo a passo da conversão de um repositório SVN para um repositório GIT, utilizando a ferramenta git-svn. Explicamos os principais comandos para realizar a migração. Lembre-se que suas necessidades podem ser diferentes. Para resolução de problemas utilize a documentação oficial da ferramenta: <a target="_blank" rel="noopener" href="https://git-scm.com/docs/git-svn/pt_BR">https://git-scm.com/docs/git-svn/pt_BR</a>.

Espero que este artigo seja útil para quem deseja fazer a transição de SVN para GIT, ou simplesmente conhecer melhor essas duas ferramentas.