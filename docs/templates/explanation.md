<!-- type: explanation -->

# [Your Explanation Title: "Understanding [topic]" or "[Topic]: Why We Built It This Way"]

> **When to use this template:** You're writing to help someone understand *why* something is designed the way it is, not to help them do something right now. Explanations are narrative and analytical. They explore context, history, trade-offs, and alternatives considered. Good explanations answer "Why did we design it this way?" and "What were the alternatives?"

## Overview

<!-- 
Set up the topic and what understanding this provides.
Why is it important to understand this?
What will the reader know after reading?

1-2 paragraphs. Can be narrative.
Example:
"The hub-and-spoke model organizes repositories into a central 'hub' 
that defines universal standards, and spoke repositories that implement 
those standards with domain-specific variations. Understanding this model 
is essential for knowing how to structure new repositories and coordinate 
across the organization."
-->

## Context: How We Got Here

<!-- 
What was the situation before?
What was the problem we were trying to solve?
Why was change needed?

This helps readers understand the *why* behind the design.
Can include history, evolution, or previous attempts.

Example:
"Originally, each repository had its own standards, leading to 
inconsistencies in naming, testing, and deployment. This made it 
hard to move code between repos and onboard new developers."
-->

## The Design: How It Works

<!-- 
Explain the core concept and how it functions.
Use diagrams or analogies if helpful.
Focus on the *what* and *how*, linking to reference docs for details.

Example with structure:
"The hub-and-spoke model has three layers:
1. Universal Hub (global-docs)
   - Defines standards applied everywhere
   - Reference for all repos
   - Single source of truth
2. Domain Spokes (individual repos)
   - Implement universal standards
   - Add domain-specific extensions
   - Reference back to hub
3. Feedback Loop
   - New patterns discovered in spokes can be promoted to hub
   - Hub changes are tested in spokes before promotion"
-->

## Why This Design

<!-- 
What are the advantages of this approach?
What problems does it solve?
Why is it better than the alternatives?

Example:
"This design provides:
- **Consistency:** All repos follow the same standards
- **Flexibility:** Each repo can extend for its domain
- **Scalability:** New repos can copy the pattern
- **Discoverability:** One place to learn what all standards are
- **Evolvability:** We can improve standards without forking repos"
-->

## Alternatives Considered

<!-- 
What other approaches did we consider?
Why didn't we choose them?
What trade-offs did we make?

This shows the thinking process and helps readers understand the cost/benefit.

Example:
"**Alternative 1: Monorepo (everything in one repo)**
Pros: Single source of code
Cons: Unmanageable at scale, hard to separate concerns
Decision: Not suitable for our distributed team structure

**Alternative 2: Complete decentralization (no hub)**
Pros: Maximum autonomy
Cons: Inconsistency, high onboarding burden, duplicated effort
Decision: Creates more problems than it solves

**Alternative 3: Hub-and-spoke (chosen)**
Pros: Consistency + flexibility, scalable, discoverability
Cons: Requires discipline to maintain
Decision: Right balance for our needs"
-->

## How This Impacts You

<!-- 
What does this design mean for developers, maintainers, users?
What do they need to know or do differently?
What benefits do they get?

Example:
"If you're starting a new project:
- You follow the hub pattern from global-docs
- You save time, not designing standards from scratch
- Your project is consistent with others

If you discover a better pattern:
- You can propose adding it to the hub
- It becomes available to all future projects
- Everyone benefits"
-->

## Related Concepts

<!-- 
Link to other explanations, reference docs, or how-to guides
that deepen understanding.

Example:
"- [Core vs Adapters Architecture](core-vs-adapters.md) 
  for complementary design philosophy
- [Modularity Standards Reference](../standards/modularity.md) 
  for specific rules
- [How to Create a New Repository](../processes/new-repo-checklist.md) 
  for practical application"
-->

## Further Reading

<!-- 
If there are papers, articles, or external references that inform this design,
list them here. Optional section.

Example:
"- Monolith to Microservices by Sam Newman — inspired the spoke pattern
- The twelve-factor app — influenced our process design"
-->
