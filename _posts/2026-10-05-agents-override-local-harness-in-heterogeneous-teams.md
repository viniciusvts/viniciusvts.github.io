---
title: "Agents Override: Local Harness in Heterogeneous Teams"
excerpt: "How to use Agents Override in Harness solves the friction of mixed environments in AI usage in teams, separating global project rules from each developer's local configurations."
translation_key: agents-override-local-harness
---

{% include figure popup=false image_path="/assets/images/agents-override-local-harness.jpg" alt="agents.md file overrides local harness" caption="agents.md file overrides local harness" %}

## Introduction
The adoption of AI assistants directly in IDEs has changed the way we write software. Today, establishing an `agents.md` file in the root of the repository so that the artificial intelligence understands the rules is practically a standard. This concept has spread under various names: `.cursorrules`, `.windsurfrules`, or `claude.md`. However, as its use moves from the solo developer and scales to heterogeneous teams, a problem arises: infrastructure friction.

Reason: mixing business rule or architectural instructions with commands restricted to the local infrastructure of whoever wrote the original prompt.

The central thesis is simple: **AI instructions must not mix the software's business or architectural rules with the developer's local infrastructure commands.**

## The Architectural Solution: The "Local Override" Pattern
In the same way that software engineering solved the problem of database credentials and environment variables with the famous .env files, we need to apply the concept of a local override to the context of AI agents.

The separation of concerns here is clear: the repository must dictate the business rule, while the developer's machine dictates the execution rule.

- **The Global Layer (`agents.md`)**: This is the main file, versioned in Git. It contains the team's technical conventions. This is where you explain that the backend runs on a specific language and framework, how the interface is built, and what design principles the system strictly obeys. These are the immutable "laws" of the project, valid for everyone.
- **The Local Layer (`agents.local.md`)**: This is the file that must necessarily be added to .gitignore. It belongs solely and exclusively to the developer's machine. Here lie the personal idiosyncrasies and preferences: whether the developer operates natively on Windows, runs everything virtualized in Docker containers, or prefers WSL2 with a Linux distribution as their environment of choice.


## Use Cases: Far Beyond Infrastructure
Adopting this layered pattern allows the team to truly harness all the capabilities of AI tools, extracting maximum productivity without constraining or breaking colleagues' workflows. The `agents.local.md` serves to shape the entire individual experience:

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

2. In `agents.md` (the versioned Global file), add the reading anchor:

```md
## Project Rules
- We use PHP with Laravel and a Vue.js interface.
- Architecture based on Domain-Driven Design (DDD).

## Local Environment Setup [IMPORTANT]
Always silently check for the existence of a file named `agents.local.md` in the root of this repository before suggesting or executing any terminal command. If the file exists, its execution instructions, directory paths, and preferences MUST override the default behavior.
```

3. In `agents.local.md` (the unversioned Local file), create your profile:

```md
- Execution Environment: I use WSL2 (Linux).
- Commands: All commands must assume Linux paths. Do not use PowerShell commands or syntax.
- Verbosity: Be extremely objective, return only the altered code blocks.
```

## Conclusion: Scaling AI with Governance
True maturity in the adoption of artificial intelligence by development teams does not lie in trying to create a single, flawless "super-prompt" that foresees every scenario. The answer lies in creating a natively flexible context architecture.

Whether your team uses `agents.md`, `.cursorrules`, `.windsurfrules`, or `claude.md`, the fundamental principle of "separation of concerns" must prevail. By isolating what is universal to the project from what is specific to the machine, we eliminate team friction, prevent AI from breaking colleagues' terminals, and ensure this technology acts exclusively as a productivity multiplier.
