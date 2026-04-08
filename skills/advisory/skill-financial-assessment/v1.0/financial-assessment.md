<!-- type: skill-advisory -->

# Skill: Financial Assessment

Evaluate financial opportunities, investments, and strategies. Reports findings, identifies risks and returns, recommends next steps. Advisory only—you decide what to do.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-financial-assessment` |
| **Type** | advisory (judgment-based assessment) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | business-ventures, finance-advisory |

---

## Summary

**Evaluate a financial opportunity or strategy.**

Assesses potential returns, risk level, alignment with goals, and financial feasibility. Reports findings with recommendations. You review and decide next steps.

---

## When to Use This Skill

- **Use this skill when:** Evaluating an investment, financial strategy, or portfolio decision
- **Do NOT use this skill when:** You've already decided (this informs decisions, not replaces them)
- **Prerequisite state:** You have a specific financial opportunity or strategy to assess

---

## Input Requirements

### Required Inputs
- **Financial opportunity or strategy:** Description of the opportunity (investment, savings strategy, portfolio rebalance, etc.)
- **Decision you're facing:** What are you trying to decide?

### Optional Inputs
- **Your constraints:** Budget, timeline, risk tolerance, liquidity needs
- **Your goals:** Financial goals this relates to
- **Current situation:** Your current financial position (relevant assets, liabilities, income)

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
   - "What's the financial goal here?"
   - "What's your risk tolerance?"
   - "What's your timeline?"
   - "What constraints matter (liquidity, capital, etc.)?"
3. Confirm scope: "I'll assess [this aspect]. Confirm that's what you need?"

**Output:** Clear assessment scope

**Approval Gate:** None (clarification only)

---

### Phase 2: Financial Analysis

**Goal:** Model returns, risks, and financial characteristics.

1. Return analysis:
   - Expected return (best estimate)
   - Historical performance (if applicable)
   - Return distribution (best/base/worst case)
   - Sensitivity to key variables

2. Cost analysis:
   - Upfront costs (fees, taxes, etc.)
   - Ongoing costs (management fees, etc.)
   - Hidden costs or trade-offs
   - Net return after costs

3. Comparable analysis:
   - How does this compare to alternatives?
   - What would you get elsewhere?
   - Why choose this vs. alternatives?

**Output:** Financial analysis with return and cost assessment

**Approval Gate:** None (informational analysis)

---

### Phase 3: Risk Assessment

**Goal:** Identify all relevant risks and their severity.

1. Market/volatility risk:
   - Downside exposure (how much could you lose)
   - Volatility (how much fluctuation)
   - Historical worst-case scenarios
   - Probability of major loss

2. Liquidity risk:
   - Can you get your money out when you need it?
   - Are there penalties or delays?
   - What's the cost of early exit?

3. Concentration risk:
   - Is this too much in one place?
   - Diversification impact
   - Correlation with other assets

4. Structural/operational risk:
   - Could the investment disappear (counterparty risk)?
   - Regulatory or legal risks
   - Manager/operational quality

5. Personal risks:
   - Can you afford the downside?
   - Does this match your time horizon?
   - What if you need the money?

**Output:** Risk assessment with severity levels (CRITICAL, HIGH, MEDIUM, LOW)

**Approval Gate:** None (flagging, not deciding)

---

### Phase 4: Scenario Analysis

**Goal:** Show what happens in different market/economic conditions.

1. Base case:
   - Most likely outcome
   - Returns and timeline

2. Bear case (adverse scenario):
   - What if markets decline?
   - What if assumptions don't hold?
   - Worst reasonable case

3. Bull case (favorable scenario):
   - What if everything goes right?
   - Best reasonable case
   - What would need to be true?

4. Sensitivity analysis:
   - What variables matter most?
   - How much does return change if [variable] changes?

**Output:** Scenario analysis showing outcomes in different conditions

**Approval Gate:** None (informational)

---

### Phase 5: Alignment Assessment

**Goal:** Evaluate fit with your goals, timeline, and risk tolerance.

1. Goal alignment:
   - Does this help you reach your financial goals?
   - Is it on track with your plan?
   - Does it distract or support?

2. Timeline fit:
   - Does the investment timeline match your needs?
   - When do you need the money?
   - Is this a good match?

3. Risk tolerance fit:
   - Can you psychologically handle the downside?
   - Does this match your risk tolerance?
   - Are you comfortable with volatility?

4. Opportunity cost:
   - What are you not doing if you do this?
   - Is this the best use of capital?
   - Are there better alternatives?

**Output:** Alignment assessment with fit analysis

**Approval Gate:** None (informational)

---

### Phase 6: Synthesize & Recommend

**Goal:** Deliver clear assessment with recommendations.

1. Synthesize findings:
   - Expected return: [range]
   - Risk level: [assessment]
   - Costs: [total impact]
   - Financial viability: [assessment]
   - Goal alignment: [assessment]
   - Overall risk-adjusted return: [assessment]

2. Overall assessment:
   - Is this a good financial decision?
   - What are the key decision drivers?
   - What trade-offs matter most?

3. Recommendation:
   - Strong GO (good return, manageable risk, good fit)
   - Conditional GO (good but address specific risks)
   - CAUTION (high risk or misalignment)
   - PASS (not right fit or timing)

4. Next steps:
   - If GO: "Proceed. Monitor [key metrics]. Review [timeframe]."
   - If CAUTION: "Address [risks] before proceeding. Then reassess."
   - If PASS: "Consider [alternatives] or [timing]."

**Output:** Complete assessment report with recommendation

**Approval Gate:** None (assessment complete, you decide)

---

## Output Format

**Financial Assessment Report:**

```
FINANCIAL ASSESSMENT — [OPPORTUNITY NAME]

═══════════════════════════════════════════════════════════════

OPPORTUNITY OVERVIEW

Opportunity: [What it is]
Your decision: [What are you deciding]
Timeline: [When you'd invest / timeline of investment]

═══════════════════════════════════════════════════════════════

FINANCIAL ANALYSIS

Expected returns:
├─ Base case: [Return / growth estimate]
├─ Best case: [Upside scenario]
└─ Worst case: [Downside scenario]

Costs:
├─ Upfront costs: [Fees, taxes, etc.]
├─ Ongoing costs: [Annual costs, percentages]
└─ Total impact on return: [Net return after costs]

Comparable analysis:
├─ vs. Alternative A: [Comparison]
├─ vs. Alternative B: [Comparison]
└─ Why this: [Key differentiators]

═══════════════════════════════════════════════════════════════

RISK ASSESSMENT

🔴 CRITICAL risks:
├─ [Risk]: [Why critical]
└─ [Can you mitigate / Is this acceptable]

🟠 HIGH risks:
├─ [Risk]: [Impact]
└─ [Mitigation or acceptance]

🟡 MEDIUM risks:
├─ [Risk]: [Impact]
└─ [Mitigation]

Downside exposure: [Maximum loss scenario]
Liquidity: [How liquid is this]

═══════════════════════════════════════════════════════════════

SCENARIO ANALYSIS

Base case (most likely):
├─ Assumption: [Key assumptions]
├─ Expected return: [%]
└─ Timeline: [Years to goal]

Bear case (adverse):
├─ Scenario: [What happens]
├─ Return: [% or loss]
└─ Timeline: [Recovery or impact]

Bull case (favorable):
├─ Scenario: [What happens]
├─ Return: [%]
└─ Likelihood: [Realistic or optimistic]

═══════════════════════════════════════════════════════════════

ALIGNMENT ASSESSMENT

Financial goal fit: [Does this support your goals]
Timeline fit: [Does timeline match your needs]
Risk tolerance fit: [Comfortable with downside]
Opportunity cost: [What you're not doing instead]

═══════════════════════════════════════════════════════════════

OVERALL ASSESSMENT

Expected return: [Range after costs]
Risk level: [Low / Moderate / High / Critical]
Goal alignment: [Excellent / Good / Neutral / Poor]
Opportunity vs. alternatives: [Best / Comparable / Inferior]

═══════════════════════════════════════════════════════════════

RECOMMENDATION

[Strong GO / Conditional GO / CAUTION / PASS]

If GO:
├─ Proceed with [amount/structure]
└─ Monitor: [Key metrics to watch]

If CAUTION:
├─ Address these concerns first: [List]
└─ Then reassess

If PASS:
├─ Reason: [Why not now]
└─ Reconsider if: [What changes]

═══════════════════════════════════════════════════════════════
```

---

## Evaluation Framework

**What makes a STRONG GO:**
- Attractive risk-adjusted return
- Manageable risks (no CRITICAL blockers)
- Low or transparent costs
- Strong alignment with goals and timeline
- Financial feasibility (you can afford it)
- Better than alternatives

**What makes a CONDITIONAL GO:**
- Good return with identified risks manageable
- Requires specific conditions (rebalancing, limits, hedges)
- Good fit but timing needs adjustment
- Missing information that's addressable

**What makes a CAUTION:**
- High or unquantifiable risk
- Return doesn't justify the risk
- Misalignment with goals or timeline
- You can't afford the downside

**What makes a PASS:**
- Better alternatives exist
- Doesn't fit your goals or timeline
- Risk exceeds your tolerance or capacity
- Not the right time financially

---

## Red Flag Patterns

🚩 **Return Red Flags:**
- Returns that seem too good to be true ("Guaranteed 20% returns")
- Returns not explained or backed by data
- Historical returns don't match realistic expectations
- Costs not transparently disclosed

🚩 **Risk Red Flags:**
- Risk not quantified or explained
- "It's completely safe" about anything financial
- Leverage or complexity you don't understand
- Concentration in one position or sector
- Downside exposure you can't afford

🚩 **Structural Red Flags:**
- Counterparty risk (depends on someone else's solvency)
- Regulatory uncertainty or legal questions
- Illiquid (hard to get money out)
- Locked up for years with no flexibility
- Manager quality or track record questionable

🚩 **Personal Red Flags:**
- "This will make me rich" (if it sounds too good)
- Pressure to decide quickly
- Not understanding what you're investing in
- Conflicts with your stated goals
- Emotional/FOMO-driven decision (should be analytical)

---

## Recommendation Logic

**GO if:**
- Return is attractive relative to risk
- Risks are manageable and acceptable
- Costs are low and transparent
- Strong goal alignment
- You can afford the downside

**Conditional GO if:**
- Good opportunity with specific risks to manage
- Requires particular structure or monitoring
- Timing or conditions need adjustment
- One assumption needs to be proven first

**CAUTION if:**
- Any CRITICAL risks exist
- Return doesn't justify the risk
- High cost or unclear pricing
- Major misalignment with goals
- Downside exceeds what you can afford

**PASS if:**
- Better alternatives exist
- Doesn't support your goals
- Risk exceeds acceptable level
- Timing is wrong
- You don't understand it

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Load context before assessment |
| [future: financial-modeling] | Deep dive on financial analysis |
| [future: portfolio-analysis] | Assess impact on overall portfolio |

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Your goals and priorities (for alignment assessment)
- **domains/finance-advisory-context.md** — Financial advisory standards and constraints
- **domains/business-ventures-context.md** — Business financial assessment

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
