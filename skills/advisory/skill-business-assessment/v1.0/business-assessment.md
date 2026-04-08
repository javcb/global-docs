<!-- type: skill-advisory -->

# Skill: Business Assessment

Evaluate business opportunities, strategies, and decisions. Reports findings, identifies risks and opportunities, recommends next steps. Advisory only—you decide what to do.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-business-assessment` |
| **Type** | advisory (judgment-based assessment) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | business-ventures, business-advisory |

---

## Summary

**Evaluate a business opportunity or strategy.**

Assesses market fit, competitive position, financial viability, risks, and strategic alignment. Reports findings with recommendations. You review and decide next steps.

---

## When to Use This Skill

- **Use this skill when:** Evaluating a new business idea, investment opportunity, or strategic change
- **Do NOT use this skill when:** You've already decided (this informs decisions, not replaces them)
- **Prerequisite state:** You have a specific opportunity, idea, or strategic question to assess

---

## Input Requirements

### Required Inputs
- **Business or strategy to assess:** Description of the opportunity (new venture, pivot, market entry, etc.)
- **Decision you're facing:** What are you trying to decide about this?

### Optional Inputs
- **Constraints:** Budget, timeline, team size, other limitations
- **Goals:** What success would look like for this business
- **Competitive context:** Who else is doing this, or what would compete with it

### Assumptions
- You have enough information to assess (or you'll tell me what's unclear)
- Assessment will help you decide, not make the decision for you
- You'll act on findings, so I should be honest about risks

---

## Execution Flow

### Phase 1: Clarify Assessment

**Goal:** Understand exactly what you're evaluating.

1. You provide: opportunity description + decision question
2. I ask clarifying questions if needed:
   - "What's the core business question here?"
   - "What constraints matter most?"
   - "What would make this successful?"
3. Confirm scope: "I'll assess [this aspect]. Confirm that's what you need?"

**Output:** Clear assessment scope

**Approval Gate:** None (clarification only)

---

### Phase 2: Market & Competitive Analysis

**Goal:** Understand market dynamics and competitive positioning.

1. Analyze market:
   - Market size and growth
   - Customer need or problem being solved
   - Existing solutions or alternatives
   - Market trends and timing

2. Analyze competition:
   - Direct competitors (who else does this)
   - Indirect competitors (alternative solutions)
   - Competitive advantages (what's different/better)
   - Market position (niche, broad, dominant)

3. Assess timing:
   - Is market ready?
   - Are you early, on-time, or late?
   - What trends matter (technology, regulation, culture)?

**Output:** Market and competitive analysis

**Approval Gate:** None (informational analysis)

---

### Phase 3: Financial & Viability Analysis

**Goal:** Assess financial feasibility and unit economics.

1. Financial viability:
   - Revenue model (how it makes money)
   - Unit economics (revenue per customer, cost per unit)
   - Gross margin potential
   - Break-even analysis
   - Profitability timeline

2. Resource requirements:
   - Initial capital needed
   - Ongoing operational costs
   - Team/people requirements
   - Time to launch estimate

3. Cash flow assessment:
   - When does it become cash-flow positive?
   - How much cash runway needed?
   - Is this affordable for you?

**Output:** Financial analysis with viability assessment

**Approval Gate:** None (informational analysis)

---

### Phase 4: Risk Assessment

**Goal:** Identify critical risks and mitigation.

1. Market risks:
   - Customer adoption risk (will people buy?)
   - Market timing risk (too early/late?)
   - Competition risk (can you compete?)

2. Execution risks:
   - Team capability to execute
   - Technical or operational complexity
   - Time-to-market dependencies
   - Regulatory or compliance risks

3. Financial risks:
   - Capital requirements and availability
   - Unit economics assumptions
   - Cash flow and runway risks
   - Exit/pivot difficulty

4. Personal risks (for you):
   - Impact on your other commitments
   - Time investment required
   - Financial downside exposure
   - Opportunity cost

**Output:** Risk assessment with severity levels (CRITICAL, HIGH, MEDIUM, LOW)

**Approval Gate:** None (flagging, not deciding)

---

### Phase 5: Strategic Alignment Assessment

**Goal:** Evaluate fit with your goals and strengths.

1. Goal alignment:
   - Does this align with your stated goals?
   - Is it a strategic fit or distraction?
   - Does it build capabilities you want?

2. Strength assessment:
   - Does this leverage your strengths?
   - Are there major skill gaps?
   - Do you have relevant networks or assets?

3. Timing and capacity:
   - Do you have time for this right now?
   - Is this the right priority?
   - What would you have to stop doing?

**Output:** Strategic alignment analysis with fit assessment

**Approval Gate:** None (informational)

---

### Phase 6: Synthesize & Recommend

**Goal:** Deliver clear assessment with recommendations.

1. Synthesize findings:
   - Market opportunity: [assessment]
   - Competitive position: [assessment]
   - Financial viability: [assessment]
   - Risk level: [assessment]
   - Strategic fit: [assessment]

2. Overall assessment:
   - Is this viable?
   - Is this desirable for you?
   - What are the key decision drivers?

3. Recommendation:
   - Strong GO (high opportunity, manageable risk, good fit)
   - Conditional GO (good but address specific risks first)
   - CAUTION (significant risks or misalignment)
   - PASS (not right time or fit)

4. Next steps:
   - If GO: "Proceed to [next action]. Key focus: [priorities]."
   - If CAUTION: "Before proceeding, address [risks]. Then reassess."
   - If PASS: "Consider [alternative approaches] or [timing]."

**Output:** Complete assessment report with recommendation

**Approval Gate:** None (assessment complete, you decide)

---

## Output Format

**Business Assessment Report:**

```
BUSINESS ASSESSMENT — [OPPORTUNITY NAME]

═══════════════════════════════════════════════════════════════

OPPORTUNITY OVERVIEW

Business: [What it is]
Market: [Who needs it, what problem it solves]
Your decision: [What are you deciding]

═══════════════════════════════════════════════════════════════

MARKET & COMPETITIVE ANALYSIS

Market opportunity:
├─ Market size: [estimate]
├─ Market growth: [trend]
└─ Customer need: [What problem being solved]

Competitive landscape:
├─ Direct competitors: [Who else does this + positioning]
├─ Competitive advantage: [What's different/better]
└─ Market position: [Where you'd fit]

Timing assessment:
├─ Market readiness: [Is market ready]
├─ Your timing: [Early / On-time / Late]
└─ Key trends: [What matters]

═══════════════════════════════════════════════════════════════

FINANCIAL ANALYSIS

Revenue model: [How it makes money]

Unit economics:
├─ Revenue per [unit]: $[X]
├─ Cost per [unit]: $[X]
└─ Gross margin: [%]

Startup requirements:
├─ Initial capital: $[X] or [TBD]
├─ Monthly operational cost: $[X]
└─ Break-even timeline: [Months]

Cash flow:
├─ Months to cash-flow positive: [#]
├─ Runway required: [Months]
└─ Affordable for you: [Yes / No / Maybe]

Viability: [Financially viable or not]

═══════════════════════════════════════════════════════════════

RISK ASSESSMENT

🔴 CRITICAL risks:
├─ [Risk]: [Severity: Blocks viability / major concern]
└─ [Mitigation: what you'd do to address]

🟠 HIGH risks:
├─ [Risk]: [why it matters]
└─ [Mitigation approach]

🟡 MEDIUM risks:
├─ [Risk]: [impact]
└─ [Mitigation approach]

═══════════════════════════════════════════════════════════════

STRATEGIC ALIGNMENT

Goal alignment: [Does this fit your goals]
Strength fit: [Leverages your strengths or gaps]
Time availability: [Do you have capacity]
Opportunity cost: [What would you stop doing]

═══════════════════════════════════════════════════════════════

OVERALL ASSESSMENT

Market opportunity: [Strong / Moderate / Weak]
Competitive position: [Advantaged / Neutral / Disadvantaged]
Financial viability: [Strong / Possible / Challenged]
Risk level: [Low / Moderate / High / Critical]
Strategic fit: [Excellent / Good / Neutral / Poor]

═══════════════════════════════════════════════════════════════

RECOMMENDATION

[Strong GO / Conditional GO / CAUTION / PASS]

If GO:
├─ Proceed to [skill-project-kickoff or next step]
└─ Key focus areas: [Priorities to manage]

If CAUTION:
├─ Address these risks first: [List]
└─ Then reassess

If PASS:
├─ Reason: [Why not now]
└─ Reconsider if: [What changes]

═══════════════════════════════════════════════════════════════
```

---

## Evaluation Framework

**What makes a STRONG GO:**
- Clear market need with reasonable size
- Sustainable competitive advantage
- Achievable unit economics (profitable path exists)
- Manageable risks (no CRITICAL blockers)
- Strong strategic fit (leverages your strengths, aligns with goals)
- Realistic resource requirements given your capacity

**What makes a CONDITIONAL GO:**
- Good opportunity with identified risks that are manageable
- Missing information that's addressable
- Requires specific actions before launch (capital, partnerships, etc.)
- Good fit but timing needs adjustment

**What makes a CAUTION:**
- Significant risks without clear mitigation
- Weak competitive position or unclear differentiation
- Unit economics challenged or unproven
- Misalignment with your goals or capacity

**What makes a PASS:**
- Viable opportunity but wrong timing for you
- Strategic misfit (distraction from priorities)
- Unacceptable risk level
- Resource requirements exceed what's reasonable

---

## Red Flag Patterns

🚩 **Market Red Flags:**
- "Everyone needs this" without identifying specific customer
- Market size unclear or unvalidated
- No evidence of actual customer demand
- Existing competitors with significant advantage
- Market too small to support business

🚩 **Financial Red Flags:**
- No clear revenue model
- Unit economics don't work (losing money on each sale)
- Capital requirements are vague or massive
- Profitability timeline is decades away
- Personal downside exposure is unacceptable

🚩 **Execution Red Flags:**
- Critical capabilities missing (yours or team's)
- Execution dependency on external factors you can't control
- Timeline is aggressively optimistic
- No evidence that this can actually be built
- Hidden complexity in operations

🚩 **Personal Red Flags:**
- "This will only take a little time" (if it doesn't)
- Major life disruption without thinking it through
- Conflicts with other priorities
- Financial risk you can't afford
- Doing this because you "should," not because you want to

---

## Recommendation Logic

**GO if:**
- Market demand is clear
- Competitive position is defensible
- Unit economics are viable
- Risks are manageable
- Strategic fit is strong

**Conditional GO if:**
- Opportunity is real but missing pieces
- Risks are high but addressable
- You need to prove one assumption first
- Timing or resources need adjustment

**CAUTION if:**
- Any CRITICAL risks exist
- Unit economics don't work
- Multiple HIGH risks without mitigation
- Strategic misfit or resource overcommitment

**PASS if:**
- Opportunity doesn't align with your priorities
- Risks exceed acceptable level
- You don't have capacity right now
- Better alternatives exist

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Load context before assessment |
| `skill-project-kickoff` | If assessment leads to GO, hands off to project-kickoff |
| [future: financial-modeling] | Deep dive on financial analysis |

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Your goals and priorities (for strategic alignment assessment)
- **domains/business-ventures-context.md** — Business venture autonomy and standards
- **domains/business-advisory-context.md** — Advisory work standards

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
