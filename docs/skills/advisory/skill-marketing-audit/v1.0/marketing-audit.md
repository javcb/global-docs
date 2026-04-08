<!-- type: skill-advisory -->

# Skill: Marketing Audit

Evaluate marketing strategies, campaigns, and messaging effectiveness. Reports findings, identifies gaps and opportunities, recommends improvements. Advisory only—you decide what to change.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-marketing-audit` |
| **Type** | advisory (judgment-based assessment) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | marketing-advisory |

---

## Summary

**Evaluate marketing effectiveness and strategy.**

Assesses messaging clarity, positioning strength, audience alignment, competitive differentiation, channel effectiveness, and strategic coherence. Reports findings with recommendations for improvement.

---

## When to Use This Skill

- **Use this skill when:** Evaluating a marketing strategy, campaign, or messaging before launch
- **Do NOT use this skill when:** You've already decided (this informs decisions, not replaces them)
- **Prerequisite state:** You have marketing materials, strategy, or campaign to evaluate

---

## Input Requirements

### Required Inputs
- **Marketing to audit:** Strategy document, campaign plan, website copy, messaging framework, etc.
- **Audit angle:** What specifically do you want assessed? (positioning, messaging clarity, audience fit, differentiation, etc.)

### Optional Inputs
- **Target audience:** Who is this marketing for?
- **Business goals:** What should this marketing achieve?
- **Competitive context:** Who else is marketing to this audience?
- **Success metrics:** How do you measure marketing success?

### Assumptions
- Audit will inform decisions, not make them
- You'll act on findings or deliberate why you won't
- Marketing exists or is documented enough to assess

---

## Execution Flow

### Phase 1: Clarify Audit Scope

**Goal:** Understand exactly what you're evaluating.

1. You provide: marketing materials + audit focus
2. I clarify:
   - "What's the core question you want answered?"
   - "Who is the target audience?"
   - "What should this marketing achieve?"
3. Confirm scope: "I'll assess [these aspects]. Correct?"

**Output:** Clear audit scope

**Approval Gate:** None (clarification only)

---

### Phase 2: Messaging & Positioning Analysis

**Goal:** Assess clarity and differentiation.

1. Messaging clarity:
   - Core message: Is it clear what's being offered?
   - Supporting messages: Do they reinforce the core?
   - Audience resonance: Does messaging speak to target audience?
   - Differentiation: What makes this different from competitors?

2. Positioning strength:
   - Market position: Where does this sit relative to alternatives?
   - Competitive advantage: What's the unique value?
   - Believability: Is the positioning credible?
   - Consistency: Does messaging align across channels?

**Output:** Messaging and positioning analysis

**Approval Gate:** None (informational)

---

### Phase 3: Audience & Channel Analysis

**Goal:** Assess audience fit and channel appropriateness.

1. Audience analysis:
   - Target audience clarity: Specifically who?
   - Audience needs: What are they looking for?
   - Audience language: Does messaging match how they talk?
   - Audience fit: How well does this resonate with them?

2. Channel analysis:
   - Channel selection: Why these channels?
   - Channel effectiveness: Do these channels reach the audience?
   - Channel consistency: Is messaging consistent across channels?
   - Channel gaps: Are important channels missing?

**Output:** Audience and channel analysis

**Approval Gate:** None (informational)

---

### Phase 4: Content & Creative Assessment

**Goal:** Evaluate quality and effectiveness of marketing materials.

1. Content quality:
   - Clarity: Is it easy to understand?
   - Relevance: Does it address audience needs?
   - Evidence: Is the value backed by data or examples?
   - Engagement: Does it hold attention?

2. Creative effectiveness:
   - Visuals: Do they support the message?
   - Tone: Is it appropriate for audience and brand?
   - Call to action: Is next step clear?
   - Memorability: Will audience remember this?

**Output:** Content and creative assessment

**Approval Gate:** None (informational)

---

### Phase 5: Strategic Alignment & Gap Assessment

**Goal:** Identify misalignments and missing elements.

1. Strategic alignment:
   - Business goals: Does this marketing align with stated goals?
   - Brand consistency: Is this on-brand?
   - Market timing: Is this the right time for this message?

2. Completeness:
   - Coverage: Are all key audience segments addressed?
   - Lifecycle: Does this cover awareness → consideration → decision?
   - Measurement: How will you know if this works?

3. Competitive context:
   - Competitive differentiation: How does this compare to competitors?
   - Market gaps: What are competitors not doing?
   - Competitive threats: What could undermine this?

**Output:** Strategic alignment and gap analysis

**Approval Gate:** None (flagging, not deciding)

---

### Phase 6: Synthesize & Recommend

**Goal:** Deliver clear assessment with recommendations.

1. Synthesize findings:
   - Messaging effectiveness: [assessment]
   - Positioning strength: [assessment]
   - Audience fit: [assessment]
   - Channel appropriateness: [assessment]
   - Content quality: [assessment]
   - Strategic alignment: [assessment]

2. Overall assessment:
   - Is this marketing effective?
   - What are the key strengths?
   - What are the key gaps?

3. Recommendation:
   - Strong PROCEED (well-positioned, clear, effective)
   - Conditional PROCEED (good but address gaps first)
   - REFINE (fundamental issues to address)
   - RECONSIDER (misalignment or weak positioning)

4. Next steps:
   - If PROCEED: "Ready to launch. Monitor [metrics]."
   - If CONDITIONAL: "Address [gaps] before launch."
   - If REFINE: "Revise [elements] and re-evaluate."
   - If RECONSIDER: "Consider [alternative approach]."

**Output:** Complete audit report with recommendation

**Approval Gate:** None (assessment complete, you decide)

---

## Output Format

**Marketing Audit Report:**

```
MARKETING AUDIT — [Campaign/Strategy Name]

═══════════════════════════════════════════════════════════════

OVERVIEW
Marketing: [What's being evaluated]
Audit focus: [What was evaluated]
Target audience: [Intended recipients]

═══════════════════════════════════════════════════════════════

MESSAGING & POSITIONING

Core message: [What's the core message]
Assessment: [Clarity, strength, differentiation]

Supporting messages:
├─ Message A: [assessment]
├─ Message B: [assessment]
└─ Alignment: [How well they work together]

Competitive positioning: [Position relative to alternatives]
Differentiation: [What makes this different]

═══════════════════════════════════════════════════════════════

AUDIENCE & CHANNEL ANALYSIS

Target audience: [Who this is for]
Audience fit: [How well messaging resonates]

Channels used:
├─ Channel A: [Appropriateness for audience]
├─ Channel B: [Appropriateness for audience]
└─ Gap: [Any important channels missing]

═══════════════════════════════════════════════════════════════

CONTENT QUALITY

Clarity: [Is it easy to understand]
Relevance: [Addresses audience needs: yes/no]
Evidence: [Supported by data or examples: yes/no]
Engagement: [Does it hold attention: yes/no]

Creative execution:
├─ Visuals: [Assessment]
├─ Tone: [Appropriate for audience: yes/no]
├─ CTA: [Clear next step: yes/no]
└─ Memorability: [Will audience remember it]

═══════════════════════════════════════════════════════════════

STRATEGIC ALIGNMENT

Business goals: [Does this align with goals]
Brand consistency: [On-brand: yes/no]
Market timing: [Right time for this: yes/no]

Coverage: [All audience segments addressed]
Lifecycle: [Covers awareness → consideration → decision]
Measurement: [Plan to measure effectiveness]

═══════════════════════════════════════════════════════════════

COMPETITIVE CONTEXT

Differentiation: [How this differs from competitors]
Market gaps: [What competitors aren't doing]
Competitive threats: [What could undermine this]

═══════════════════════════════════════════════════════════════

OVERALL ASSESSMENT

Strengths:
├─ [Strength 1]
├─ [Strength 2]
└─ [Strength 3]

Gaps/Concerns:
├─ [Gap 1]
├─ [Gap 2]
└─ [Gap 3]

═══════════════════════════════════════════════════════════════

RECOMMENDATION

[Strong PROCEED / Conditional PROCEED / REFINE / RECONSIDER]

If PROCEED:
└─ Ready to launch. Monitor: [Key metrics]

If CONDITIONAL:
├─ Address these first: [List]
└─ Then launch

If REFINE:
├─ Revise: [Elements to improve]
└─ Re-evaluate before launch

If RECONSIDER:
├─ Consider: [Alternative approach]
└─ Reconsider if: [What changes]

═══════════════════════════════════════════════════════════════
```

---

## Evaluation Framework

**What makes STRONG PROCEED:**
- Clear, compelling core message
- Strong positioning with clear differentiation
- Audience alignment and relevance
- Quality content and creative execution
- Strategic alignment with goals
- Appropriate channels for audience
- Measurable success criteria

**What makes CONDITIONAL PROCEED:**
- Good foundation with addressable gaps
- Messaging clear but could be stronger
- Channels appropriate but incomplete
- Gaps that don't block launch but should be addressed

**What makes REFINE:**
- Weak or unclear messaging
- Poor audience fit or positioning
- Strategic misalignment
- Significant gaps in coverage
- Quality issues that reduce effectiveness

**What makes RECONSIDER:**
- Fundamental positioning problems
- Audience misalignment
- Business goal misfit
- Competitive disadvantage
- Better alternatives exist

---

## Red Flag Patterns

🚩 **Messaging Red Flags:**
- "Everyone will want this" (no specific audience identified)
- Core message unclear or buried
- Messaging inconsistent across channels
- Positioning same as competitors
- Benefits not connected to audience needs

🚩 **Audience Red Flags:**
- Target audience not clearly defined
- Messaging doesn't match how audience talks
- Channels don't reach target audience
- Audience needs not addressed
- Tone inappropriate for audience

🚩 **Content Red Flags:**
- Claims without evidence or examples
- Jargon that audience won't understand
- No clear call to action
- Visuals don't support message
- No way to measure if it worked

🚩 **Strategic Red Flags:**
- Misalignment with business goals
- Timing wrong for market
- Off-brand or inconsistent
- Not differentiated from competitors
- No measurement plan

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Load context before audit |
| `skill-marketing-advisory` (domain) | Informs marketing strategy recommendations |
| [future: campaign-performance-analysis] | Deep dive on campaign metrics |

---

## Related Docs

- **domains/marketing-advisory-context.md** — Marketing advisory standards
- **GLOBAL-CONTEXT.md** — Communication preferences and standards

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
