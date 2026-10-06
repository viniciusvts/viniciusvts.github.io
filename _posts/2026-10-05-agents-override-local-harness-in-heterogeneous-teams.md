---
title: "Agents Override: Local Harness in Heterogeneous Teams"
excerpt: "How to use Agents Override in Harness solves the friction of mixed environments in AI usage in teams, separating global project rules from each developer's local configurations."
last_modified_at: 2026-10-06
translation_key: agents-override-local-harness
---

{% include figure popup=false image_path="/assets/images/agents-override-local-harness.jpg" alt="agents.local.md overriding agents.md" caption="agents.local.md overrides agents.md for the local environment" %}

## Introduction
The adoption of AI assistants directly in IDEs has changed the way we write software. Each of them runs inside a harness: the layer around the model that defines which tools it can use, which instructions it gets, and what context it works in. One of the simplest pieces of that harness has become common practice: an `agents.md` file in the root of the repository so that the artificial intelligence understands the rules. Depending on the tool, the same idea goes by other names: `.cursorrules`, `.windsurfrules`, or `claude.md`.

This works well for solo developers; however, as usage moves beyond the individual developer and scales to diverse teams, the problem of infrastructure friction arises. The person who wrote the file often mixes project rules with instructions that only make sense on their own machine. If that person uses Docker, the file instructs the agent to run everything via `docker compose exec`. A colleague using native Windows or WSL2 receives commands that simply do not work in their environment.


So here's my point: **AI instructions must not mix the software's business or architectural rules with the developer's local infrastructure commands.**

## The Architectural Solution: The "Agents Override" Pattern
In the same way that software engineering solved the problem of database credentials and environment variables with `.env` files, we need to apply the concept of a local override to the context of AI agents.

The separation of concerns here is here: the repository must dictate the business rule, while the developer's machine dictates the execution rule.

- **The Global Layer (`agents.md`)**: This is the main file, versioned in Git. It contains the team's technical conventions. This is where you explain that the backend runs on a specific language and framework, how the interface is built, and what design principles the system strictly obeys. These rules are valid for everyone.
- **The Local Layer (`agents.local.md`)**: This is the file that must necessarily be added to `.gitignore`. It belongs solely and exclusively to the developer's machine and describes your local harness. If the developer operates natively on Windows, runs everything virtualized in Docker containers, or prefers WSL2 with a Linux distribution, plus your personal preferences.


## Use Cases: Far Beyond Infrastructure
With Agents Override, each developer can tune their own harness to the way they work without imposing it on the rest of the team. Infrastructure is the obvious case, but not the only one:

- **Execution and Terminal**: While one developer might instruct the AI to always run migration commands through isolated Docker containers, another directs the tool to use native executables and bash-based paths from their WSL2.

- **Local Tool Integration**: If you integrate open-source engines running on your own machine, you can include the following rule in your isolated file: "Whenever you need to analyze massive blocks of local logs, route the call to my local Ollama model instead of consuming cloud token quotas."

- **Verbosity and Formatting**: You can configure the local file to ask the AI to never explain the code, returning only the raw diff directly, if that is your preferred review pace.


## Practical Implementation Guide
To establish this governance pattern in your next project, implementation is straightforward and requires three simple steps:

1. In your `.gitignore`, add the exclusion rule:

```
# AI Agents Local Overrides
agents.local.md
``` 

2. In `agents.md` (the versioned Global file), add an instruction pointing to the local file:

```md
## Project Rules
- We use PHP with Laravel and a Vue.js interface.
- Architecture based on Domain-Driven Design (DDD).

## Local Environment Setup [IMPORTANT]
At the start of each session, check whether a file named `agents.local.md` exists in the root of this repository and, if it does, read it. His instructions regarding access to external tools, the execution environment, directory paths, user confirmations, terminal commands, the use of MCPs, and response style **MUST override** the default behavior of this file and the skills.
```

3. In `agents.local.md` (the unversioned Local file), create your profile:

```md
- Execution Environment: I use WSL2 (Linux).
- Commands: All commands must assume Linux paths. Do not use PowerShell commands or syntax.
- Verbosity: Be extremely objective, return only the altered code blocks.
```

## Conclusion: Scaling AI with Governance
No single prompt will cover every developer's environment, and trying to write one only makes the file longer and more fragile. Splitting the context into layers works better, and that's what Agents Override proposes: what belongs to the project goes in the repository, what belongs to your local harness stays on your machine.

Whether your team uses `agents.md`, `.cursorrules`, `.windsurfrules`, or `claude.md`, the principle of "separation of concerns" must prevail. By isolating what is universal to the project from what is specific to the machine, we eliminate team friction, prevent AI from breaking colleagues' terminals, and ensure this technology acts exclusively as a productivity multiplier.
