---
title: "Commit with purpose: How to standardize and facilitate your project documentation"
excerpt: "Commits are part of software documentation and allow you to track development history, identify the authors, justify decisions and facilitate bug fixing and new features."
translation_key: standardize-and-facilitate-your-project-documentation
redirect_from:
  - /blog/standartize-and-facilitate-yout-project-documentation/
---

{% include figure popup=false image_path="/assets/images/padronizar-e-facilitar-a-documentacao-de-projetos.png" alt="representation of documentation construction" caption="Standartize your project documentation. (image por DALL-E)" %}

I am part of a process that began with [research](/blog/dominating-the-conversion-from-SVN-to-GIT/) and [application](/blog/the-guide-from-GIT-to-SVN-conversion/) of repository conversion from SVN-to-Git. This represents our professionalism and our commitment to standards and best practices in the software industry.

Well, I don’t know if you remember the software engineering classes, but in every stage of the process of building and developing software, a document is generated. The requirements stage generates a document, the specification generates a document, testing, implementation, instructions, and software maintenance also generate documents.

And continuing to maintain our efforts in traceable and auditable documentation, we need to establish a process that allows verification and validation by other colleagues: the standardization of commits.

## Conventional Commits

A commit in the context of computer science: "Refers to the process of making a set of changes permanent, that is, of implementing the changes". In the context of version control: "These are records of changes made to a software's source code in the version control system". They are part of the software documentation because they allow tracking the development history, identifying the authors of the changes, justifying the decisions made, and facilitating bug fixes or the implementation of new features. A good commit should have a clear, concise, and informative message that describes what was done and why.

With the goal of providing an explicit and standardized history, the **semantic commit** or, in its formal specification the **conventional commit**, uses simple and clear rules to reduce the time spent understanding what was done, even if by another team of developers.

The specification of <a rel="noopener" target="_blank" href="https://www.conventionalcommits.org/en/v1.0.0/">conventional commit</a> is a lightweight convention for commit messages, providing an easy set of rules to create an explicit commit history, which makes it easier to write automated tools on top of it, describing the features, fixes, and breaking changes made in the commit messages.

The message should be structured as follows:

```
<type>[scope]: <description>

[body]

[footer(s)]
```

### The Type:

This is used to indicate the user’s intent when making changes:

- fix: fixes a bug or error in the code.
- feat: introduces a new feature.
- build: the change affects the build or is related to external dependencies (e.g., Composer, Maven, Gulp, Broccoli, npm).
- chore: the change occurs in code that does not go into production (e.g., .gitignore).
- ci: describes changes to CI (Continuous Integration) configuration files and scripts (e.g., Travis, GitHub Actions, GitLab CI).
- docs: includes changes to documentation (e.g., README or docblocks).
- perf: indicates changes to the code that improve application performance.
- refactor: for changes to the code that do not alter the application’s functionality.
- style: identifies changes that alter the code’s style, such as: spacing, indentation, formatting, etc.
- test: describes the addition of tests or the correction of existing tests.

### The Scope

The scope is an optional description that can be added to the message to provide more information about the change. The Semantic Commits specification defines scope as: "a top-level identifier, i.e., one related to the project, component, or module".

### The Description

The description is a short, descriptive message that summarizes the change made.

- Start with a verb in the present simple tense, such as "add", "fix", "remove", or "update" instead of "added", "fixed", etc. This helps make the message clearer and more concise.
- Be specific: Provide enough details in the message so that other developers can understand what has been changed. For example, instead of "fix bug", use "fix inconsistent rendering bug on mobile devices".
- Separate the subject from the body with a blank line, this helps make the message easier to read.

### The Body

The body of the message is optional. If included, it should contain supplementary information regarding the type, scope, and summary description already defined in the title.

Use it to provide context for why, in relation to the business rule, that implementation was carried out. Be precise, descriptive, and concise. Avoid writing long, detailed messages.

### The Footer
The footer of a conventional commit message is optional and can be used to provide additional information. The footer must be separated from the body of the message by a blank line and consist of a word token, followed by a colon (:), a space, and the description.

Some examples of word tokens that can be used in the footer of a conventional commit message:

- Closes: used to indicate that the commit closes an issue.
- Refs: used to indicate that the commit references an issue.
- BREAKING CHANGE: used to indicate that the commit introduces a change that breaks backward compatibility.
- Co-authored-by: used to indicate that the commit was written by more than one author. Each author must be listed in the footer with their name and email address.

Semantic commits examples:

```
fix: fix rendering bug on mobile devices

Fixes a bug that caused inconsistent rendering on mobile devices.

Refs: #456
```

```
feat: add Google login

Add new functionality to allow users to log in using their Google accounts.

Closes: #123
```

## Conclusion

This article presented a strategy for creating a clearer, more consistent, and more informative commit history that reflects the significant changes in your project and makes it easier to manage. "Committing with purpose" is a practice that aims to facilitate communication among developers, in addition to contributing to the quality of documentation. I hope this article has been helpful and that you can apply what you’ve learned to your future projects.
