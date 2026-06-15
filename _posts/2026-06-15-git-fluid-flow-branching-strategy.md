---
title: "Git Fluid Flow: A Branching Strategy for Decoupled Task Promotion"
excerpt: "Tired of ready-to-ship tasks being blocked by unrelated work? Meet Fluid Flow, a branching strategy designed around decoupled task promotion and independent delivery lifecycles."
translation_key: git-fluid-flow-branching-strategy
---

{% include figure popup=false image_path="/assets/images/git-fluid-flow.png" alt="Git Fluid Flow Represetation" caption="A Branching Strategy for Decoupled Task Promotion" %}

## Introduction

Consider the following scenario:

* Feature A is ready for production.
* Feature B still contains bugs identified by QA.
* Feature C is waiting for client approval in staging.

Despite that, all of them belong to the same promotion cycle between environments. As a result, Feature A, which has already been developed, tested, and approved, ends up waiting for the others before it can be delivered.

If you work in medium-sized or large teams, you've probably experienced something similar.

As organizations grow, delivery workflows tend to become increasingly unpredictable. Different teams work on different features, approvals happen at different speeds, and priorities constantly change. While some changes need to reach production quickly, others may remain under validation for weeks or wait for business decisions before moving forward.

In this context, a simple question emerges:

> Why should an independent task depend on the lifecycle of other tasks in order to be promoted?

Modern branching strategies have solved many important problems over the years. They helped organize teams, reduce risks, and structure integration and deployment processes. However, in environments with a high volume of changes and continuous deployment, it is still common to find workflows where environments represent mandatory promotion stages, causing independent tasks to share the same journey.

The result is familiar: blocked deliveries, process exceptions, emergency hotfixes, and an increasing need for parallel mechanisms to bypass limitations imposed by the workflow itself.

Fluid Flow emerged from observing this scenario.

Instead of treating environments as mandatory stages in a promotion pipeline, Fluid Flow proposes an approach based on decoupled task promotion, where each task has its own lifecycle and can be promoted independently to whichever product states make sense for that delivery.

The goal of this strategy is not to replace established models nor to serve as a universal solution for every context. Its purpose is to offer an alternative for teams dealing with multiple simultaneous deliveries, independent approval cycles, and the need to maintain reproducible software states without creating artificial dependencies between unrelated tasks.

## Limitations of Git Flow and GitLab Flow in Modern Environments

Before introducing a new branching strategy, it is important to recognize one fact: Git Flow and GitLab Flow solved real problems and remain excellent choices for many contexts.

Git Flow brought structure to teams working with clearly defined release cycles. The model establishes a clear separation between development, release preparation, and emergency fixes, creating a predictable process for software evolution.

Later, GitLab Flow simplified many aspects of this approach. Instead of relying on multiple specialized branches for releases and hotfixes, the model aligns more closely with the operational reality of many modern teams, especially those practicing continuous integration and frequent deployments.

However, both models share an important characteristic: change promotion remains strongly tied to environment progression.

Consider a simplified structure:

{% include figure popup="true" image_path="/assets/images/postContent/simplified-git-structure-screenshot.png" alt="Simplified Git structure" caption="Simplified Git structure (screenshot by author)" %}

In this scenario, environments represent a natural progression of the software. What is in staging has usually already passed testing. What is in production has usually already passed staging.

This approach works very well when deliveries move forward together.

But what happens when they do not?

Imagine three independent features: Social Login, PDF Export, and ERP Integration.

* Social Login is ready for production.
* PDF Export still contains issues identified by QA.
* ERP Integration is waiting for approval from an external department.

Although these features have completely different lifecycles, they often end up sharing the same promotion flow. As a consequence, a ready-to-ship task may remain blocked waiting for unrelated work to advance.

In small teams, this impact is usually limited. However, as the number of developers, stakeholders, and concurrent deliveries increases, this dependency becomes increasingly noticeable.

Both Git Flow and GitLab Flow were conceived around the assumption that software states evolve in a relatively linear fashion. In many contexts, this assumption remains valid and desirable.

However, some organizations operate differently. Different features may need to move at different speeds, reach different environments, and be promoted at completely independent moments.

When that happens, a different need emerges: decoupling task promotion without sacrificing traceability, reproducibility, or control over product states.

This is precisely where Fluid Flow begins.

## What is Fluid Flow?

**Fluid Flow is a branching strategy for decoupled task promotion.**

The idea starts from a simple premise:

> Independent tasks should be able to evolve independently.

Although this statement sounds obvious, many branching strategies associate feature promotion with the promotion of the environments through which those features travel. As a result, unrelated tasks end up sharing the same lifecycle even when they have completely different levels of maturity, priorities, and approval processes.

Fluid Flow reverses this logic.

Instead of using environments as the primary mechanism for software evolution, the strategy places the task at the center of the promotion process.

This means that every delivery has its own lifecycle and can move independently from other tasks, as long as it is ready to reach the desired product state.

In other words:

> The unit of promotion is no longer the environment. It becomes the task.

This shift in perspective produces an important consequence.

In traditional models, environments usually represent stages in a temporal progression:

```text
testing
 ↓
staging
 ↓
main (production)
```

In Fluid Flow, product states no longer represent a mandatory promotion sequence. Instead, they become reproducible and independent states of the product.

This enables scenarios where different tasks coexist in different states without blocking each other's evolution.

For example, one feature may exist only in testing while another is already running in production. Likewise, a critical fix may be promoted directly into production without depending on unrelated tasks still undergoing validation.

The result is a more flexible workflow for teams handling multiple simultaneous deliveries whose approval cycles do not necessarily follow a single chronological path.

The name Fluid Flow comes precisely from this characteristic.

Instead of imposing a rigid trajectory for every delivery, the strategy allows each task to follow its own path toward the product states for which it was intended, respecting both operational and business needs.

This flexibility, however, does not imply a lack of structure. To ensure that decoupled deliveries remain traceable, reproducible, and understandable over time, Fluid Flow establishes a small set of fundamental concepts that serve as the foundation of the strategy.

## Fundamental Concepts

Fluid Flow was designed to be simple to understand and flexible enough to adapt to different organizational contexts.

For this reason, the strategy relies on only a few fundamental concepts.

### State Branch

**A State Branch represents a durable and reproducible state of the product.**

The meaning of that state depends on the organization's needs.

In some teams, a State Branch may represent an environment:

```text
env/testing
env/staging
main
```

In others, it may represent software versions:

```text
v1
v2
v3
```

Or even specific releases:

```text
release/2026.1
release/2026.2
```

Fluid Flow does not impose a specific organizational structure. Its only requirement is that these branches represent stable product states capable of serving as starting points for new work.

For this reason, every task must originate from a State Branch.

### Task Branch

**A Task Branch represents an independent unit of delivery.**

It should have a clear scope, identifiable value, and the ability to be promoted without depending on the simultaneous delivery of unrelated functionality.

In practice, a Task Branch is very close to the concept of a User Story used by many agile teams:

> A task should be independent, valuable, small, testable, and capable of being delivered in isolation.

Examples:

```text
task/social-login
task/pdf-export
task/erp-integration
```

or:

```text
feat/social-login
fix/token-fix
patch/report-error
```

The strategy does not impose a specific naming convention. What matters is that the branch represents a single delivery with its own lifecycle.

While a State Branch represents a product state, a Task Branch represents a change to that state.
{: .notice--warning}

### Independent Promotion

Independent Promotion is the central concept of Fluid Flow.

In traditional models, promotion typically happens through environment progression. A change advances because the environment advances.

Fluid Flow works the other way around: A change advances because the task advances.

This means the same task can be promoted into different State Branches according to its maturity and operational needs.

For example, consider a task `task/login-social` created from a commit on `main`:

{% include figure popup="true" image_path="/assets/images/postContent/task-branch-has-independent-promotion.png" alt="Task branch has independent promotion" caption="Task branch has independent promotion (screenshot by autor)" %}

Likewise, different tasks can coexist in different product states:

{% include figure popup="true" image_path="/assets/images/postContent/different-tasks-can-coexist-in-different-product-states.png" alt="Different tasks can coexist in different product states" caption="Different tasks can coexist in different product states (screenshot by author)" %}

Without any mandatory dependency between them.

This characteristic allows independent features to follow different validation and approval cycles, reducing artificial bottlenecks between deliveries.

In summary:

> In Fluid Flow, the unit of promotion is the task, not the environment.

## The Fluid Flow Axioms

The concepts introduced so far define the elements of the strategy. The axioms define how those elements are expected to behave.

Unlike operational rules or team-specific conventions, the axioms represent the fundamental principles that characterize Fluid Flow. They preserve the identity of the strategy regardless of the tooling, organizational structure, or delivery process being used.

### Axiom 1: The Task Is the Fundamental Unit of Promotion

In Fluid Flow, promotion does not happen because an environment evolves.

Promotion happens because a task evolves.

Each task has its own lifecycle and its own journey through the delivery process.

This is the primary shift in perspective proposed by the strategy.

> The unit of promotion is the task, not the environment.

### Axiom 2: Independent Tasks Must Be Able to Evolve Independently

A task should not depend on the promotion of other tasks in order to advance through its own lifecycle.

If a feature is ready to reach a particular product state, its promotion should not be artificially blocked by unrelated deliveries.

For example:

```text
task/social-login
```

may be promoted to production.

While:

```text
task/pdf-export
```

remains in staging.

And:

```text
task/erp-integration
```

continues in testing.

Each delivery evolves according to its own level of maturity and business requirements.

### Axiom 3: State Branches Represent Reproducible Product States

State Branches represent known and reproducible states of the software.

These states may have different meanings depending on the organization's context:

* Environments.
* Versions.
* Releases.
* Customer-specific customizations.
* Independent product evolution lines.

What matters is not the naming convention, but the ability to represent a consistent and understandable state of the system.

### Axiom 4: The Workflow Must Remain Decoupled from Organizational Structure

Fluid Flow does not require specific environments, naming conventions, merge strategies, or versioning policies.

The strategy was designed to adapt to the organization's needs rather than imposing a single operational model.

As a result, different teams can use the same approach while maintaining completely different environments, validation processes, and delivery cycles.

### Flexibility Without Losing Control

The axioms do not dictate:

* How merges should be performed.
* When rebasing should be used.
* How conflicts should be resolved.
* How branches should be named.
* How pipelines should be built.
* How environments should be organized.

These decisions remain the responsibility of the team.

The role of the axioms is to establish the minimum set of principles required to preserve the strategy's defining characteristic:

> Independent tasks should be able to evolve independently.

## Practical Example

So far, we have explored the concepts and axioms that define Fluid Flow. Now let's see the strategy in action through a common scenario faced by teams practicing continuous delivery.

Consider an application with three product states represented by the following State Branches:

```text
env/testing
env/staging
main
```

Where:

* `env/testing` represents the testing environment.
* `env/staging` represents the staging environment.
* `main` represents the production environment.

At a certain point, three new requests arrive:

```text
task/social-login
task/pdf-export
task/erp-integration
```

Each task represents an independent delivery with its own scope, acceptance criteria, and validation process.

The tasks are created and developed normally.

```text
main
 ├─ task/social-login
 ├─ task/pdf-export
 └─ task/erp-integration
```

After development is completed, all tasks are promoted to the testing environment.

```text
task/social-login    -> env/testing
task/pdf-export      -> env/testing
task/erp-integration -> env/testing
```

During validation, the QA team identifies issues in the PDF Export functionality.

At the same time:

* Social Login is approved.
* ERP Integration remains under testing.
* PDF Export returns to development for fixes.

At this point, Social Login is promoted to staging.

```text
task/social-login -> env/staging
```

Meanwhile:

* `task/pdf-export` continues receiving fixes.
* `task/erp-integration` remains under validation.

After functional approval in staging, Social Login is promoted to production.

```text
task/social-login -> main
```

Notice that no other task needed to reach the same stage for this to happen.

* `task/pdf-export` remains in testing.
* `task/erp-integration` continues its normal validation process.

Later, ERP Integration is promoted to staging.

```text
task/erp-integration -> env/staging
```

At the end of this scenario, we have something similar to:

```text
social-login
 └─ main

erp-integration
 └─ env/staging

pdf-export
 └─ env/testing
```

Each task exists in a different product state.

Each task has a different level of maturity.

Each task evolves at its own pace.

Yet none of them blocks the promotion of the others.

This is the primary objective of Fluid Flow.

In traditional models, promotion typically follows environment progression. When a group of changes moves forward, every change contained within that state moves forward as well.

Fluid Flow works differently.

Tasks advance individually as they satisfy the requirements necessary to reach each product state.

The result is a workflow where independent deliveries remain independent throughout their entire lifecycle.

> A task should be promoted when it is ready, without waiting for other tasks to become ready.

## Benefits

Every branching strategy involves trade-offs.

The goal of Fluid Flow is not to eliminate the inherent complexity of software development, but rather to reduce some of the most common sources of friction faced by teams managing multiple simultaneous tasks with independent validation and approval cycles.

When applied in the right context, the model provides several important benefits.

### Decoupled Task Promotion

The primary benefit of Fluid Flow is allowing independent tasks to remain independent throughout their entire lifecycle.

In many traditional models, different features end up sharing the same promotion path between environments. As a result, a task that is ready to ship may be forced to wait for other tasks that have not yet reached the same level of maturity.

In Fluid Flow, each task follows its own path.

This allows features to advance according to their own validation criteria, approval processes, and business priorities.

> A task should be promoted when it is ready, without waiting for other tasks to become ready.

### Reduced Team-Level Bottlenecks

In larger organizations, multiple teams often work on the same product simultaneously.

Not every task has the same priority.

Not every task carries the same level of risk.

Not every task follows the same approval process.

By making the task the fundamental unit of promotion, Fluid Flow reduces the need for artificial coordination between unrelated work items.

The result is fewer bottlenecks caused solely by the structure of the branching workflow.

### Reproducible Product States

In Fluid Flow, State Branches represent known software states.

These states may represent environments, versions, releases, or any other product evolution line adopted by the organization.

This approach makes it easier to understand what composes a particular product state at any given moment and simplifies the creation of new work from known references.

It also makes it easier to reproduce specific scenarios for testing, maintenance, and bug fixes.

### Flexibility Across Delivery Models

Not every organization operates the same way.

Some practice continuous deployment.

Others maintain multiple product versions simultaneously.

Some support customer-specific customizations.

Others rely on formal release cycles.

Fluid Flow does not require a specific organizational structure to work.

The same strategy can be applied using environments, versions, releases, or other mechanisms for representing product states.

This flexibility allows teams to adapt the model to different contexts without changing its fundamental principles.

### Simpler Automation and Pipelines

When promotion no longer depends on the collective evolution of environments, pipelines tend to become more predictable.

Instead of interpreting complex release stages, automation can focus on simpler and more objective events:

* A task was promoted to a specific State Branch.
* A State Branch received new changes.
* A specific product state needs to be deployed.

This approach simplifies the construction of continuous integration and continuous delivery pipelines, reducing special rules and operational exceptions.

### Less Reliance on Parallel Processes

A common situation in teams practicing frequent deployments is the creation of parallel mechanisms to bypass limitations of the main workflow.

Emergency hotfixes.

Temporary branches.

Manual promotions.

Special release procedures for specific features.

Although these mechanisms may still be necessary in some situations, decoupled task promotion reduces how often they are needed simply to prevent one task from being blocked by another.

### Better Alignment with Operational Reality

Perhaps the greatest benefit of Fluid Flow is how closely it reflects the way many organizations already operate.

In teams handling multiple simultaneous deliveries, multiple business areas, numerous stakeholders, and constantly shifting priorities, features rarely evolve at the same pace.

Fluid Flow acknowledges this reality and turns it into a natural part of the strategy.

Instead of artificially synchronizing all work, the model allows each task to follow its own lifecycle while preserving traceability, control, and predictability throughout the delivery process.

## Operational Recommendations

The recommendations presented in this section are not mandatory requirements for adopting Fluid Flow. They represent practices that tend to maximize the benefits of the strategy while minimizing operational issues commonly encountered during its adoption.

### Prefer Creating Tasks from Their Target State Branch

Whenever possible, create a task from the State Branch that represents its final destination.

For example:

```text
main
 └─ task/social-login
```

instead of:

```text
env/testing
 └─ task/social-login
```

When a task is created from an intermediate State Branch, it may inherit changes that have not yet reached their final intended state.

This increases the risk of unintended dependencies between features that should remain independent.

Creating tasks from their target State Branch helps preserve decoupling and simplifies future promotions.

### Keep Tasks Small and Independent

Fluid Flow works best when each task represents a clear and self-contained delivery.

In practice, this means a task should have:

* A specific objective.
* A limited scope.
* Well-defined acceptance criteria.
* The ability to be delivered independently.

The larger the task, the greater the likelihood of dependencies, conflicts, and promotion bottlenecks.

### Be Careful with Task Dependencies

Independent promotion is most effective when tasks are also independent from both a technical and functional perspective.

For example:

```text
task/login
task/permissions
```

If the permissions implementation depends directly on the existence of the login functionality, both tasks may belong to the same evolutionary path and should be planned accordingly.

The lower the coupling between tasks, the greater the flexibility during promotion.

### Use State Branches with a Clear Purpose

State Branches should have a clear meaning understood by the entire team.

For example:

```text
env/testing
env/staging
main
```

or:

```text
v1
v2
```

or:

```text
release/2026.1
release/2026.2
```

What matters is that every team member can quickly understand the role of that branch within the workflow.

Ambiguous State Branches reduce traceability and make it harder to understand the actual state of the product.

### Remove Completed Task Branches

Once a task has fulfilled its purpose, its Task Branch typically loses operational value.

Keeping old branches indefinitely tends to increase repository complexity and make navigation more difficult over time.

Whenever possible, remove branches that have completed their lifecycle.

If additional changes are required in the future, a new task can be created from the appropriate State Branch.

### Automate Promotion Whenever Possible

Fluid Flow does not require a specific CI/CD implementation.

However, the strategy tends to produce better results when validation, build, and deployment processes are automated.

Because promotions occur independently, automated pipelines help ensure predictability and reduce the operational cost of managing multiple concurrent tasks.

Automation also improves traceability throughout the lifecycle of each task.

### Adapt the Strategy to Your Reality

Fluid Flow was not designed to impose a single way of working.

Different teams have different needs.

Some organizations rely on validation environments.

Others maintain multiple product versions.

Some practice continuous deployment.

Others operate through planned release cycles.

The purpose of the strategy is not to replace these particularities, but to provide a model that enables independent tasks to be promoted independently without creating artificial dependencies between them.

For that reason, adapt these recommendations whenever necessary while preserving the fundamental axioms that define Fluid Flow.

## Conclusion

Branching strategies exist to help teams deliver software with safety, predictability, and traceability. However, as products and organizations grow, the challenges faced by teams evolve as well.

In many modern environments, the problem is no longer limited to organizing source code or managing versions. The challenge becomes enabling multiple tasks to coexist, be validated at different speeds, and reach their desired product states without creating artificial dependencies between one another.

Fluid Flow emerged from this need.

Throughout this article, we explored a proposal built around a simple idea: the task is the fundamental unit of promotion.

This shift in perspective moves the focus away from environments and toward the work itself. Instead of depending on the collective evolution of product states, each task gains its own lifecycle and promotion path.

This approach allows independent features to evolve independently, reducing operational bottlenecks and providing greater flexibility for teams handling multiple simultaneous tasks.

Naturally, this flexibility comes with trade-offs. Fluid Flow does not eliminate the need for sound engineering practices, does not solve existing technical dependencies, and does not replace proper quality, automation, or governance processes. Like any branching strategy, it represents a set of choices and compromises.

For that reason, the goal of this article is not to present a universal solution nor to suggest that established models should be abandoned. Git Flow, GitLab Flow, Trunk-Based Development, and other strategies remain excellent options when applied to the contexts for which they were designed.

Fluid Flow is simply an alternative for a specific problem: Environments where independent tasks need to evolve independently.

Instead of treating environments as mandatory stages in a promotion pipeline, Fluid Flow treats them as reproducible product states.

And when that shift in perspective makes sense for an organization, a natural consequence emerges:

**A task should be promoted when it is ready, without waiting for other tasks to become ready.**
