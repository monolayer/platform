# Technical Writing Guidelines

This document outlines the core principles, voice, and formatting rules used to craft documentation that is clear, approachable, and highly user-centric.

## 1. Voice and Tone

The tone should be confident, encouraging, and professional. The documentation is a conversation between a knowledgeable guide and an intelligent user.

* **Speak directly to the user:** Use second-person pronouns ("you" and "your") rather than third-person ("the user") or passive constructions ("it is required").
  * *Avoid:* The user must configure the token.
  * *Prefer:* You must configure your token.
* **Use active voice:** Ensure the subject of the sentence performs the action. It makes sentences shorter and more dynamic.
  * *Avoid:* The base URL is resolved by the CLI in the following order.
  * *Prefer:* The CLI resolves the base URL in the following order.
* **Be positive and encouraging:** Frame situations in terms of what the user can do, rather than what the system prevents. Focus on solutions rather than errors.
  * *Avoid:* Failure Modes.
  * *Prefer:* Troubleshooting.

## 2. Clarity and Simplicity

Respect the user's time by getting straight to the point. Remove unnecessary jargon, filler words, and robotic phrasing.

* **Keep it concise:** Omit needless words. If a sentence can be cut without losing meaning, cut it.
* **Use simple, everyday language:** Choose common words over complex ones. 
  * Use "use" instead of "utilize".
  * Use "help" instead of "facilitate".
  * Use "start" instead of "initiate".
* **Explain the "Why":** Don't just tell the user *what* to do; briefly explain *why* they are doing it, anchoring the action to a goal.
  * *Avoid:* Run this command.
  * *Prefer:* To test your connection, run this command.

## 3. Structure and Hierarchy

Organize information so it is easy to scan. Users rarely read documentation top-to-bottom; they scan for the specific task they want to accomplish.

* **Action-oriented headings:** Start task-based headings with an imperative verb.
  * *Avoid:* Installation Steps.
  * *Prefer:* Install the CLI package.
* **Conversational grouping:** Group related concepts under approachable, conversational headings.
  * *Avoid:* Prerequisites / Requirements.
  * *Prefer:* What you need.
  * *Avoid:* Operation Details.
  * *Prefer:* How it works.
* **Sentence case for headings:** Capitalize only the first word of headings and subheadings (and proper nouns). It looks cleaner and is easier to read than Title Case.
  * *Avoid:* Verify Your Installation
  * *Prefer:* Verify your installation

## 4. Formatting and Scannability

Use formatting strategically to guide the user's eye and make the document highly scannable.

* **Bold text for emphasis and UI elements:** Use bolding to highlight specific concepts, exact phrases the user will see, or quick summaries of list items.
  * *Example:* **Missing base URL:** `Missing base URL. Pass...`
* **Lists over paragraphs:** If a paragraph contains a list of items or sequential steps, break it out into a bulleted or numbered list.
  * Use numbered lists for sequential steps (1, 2, 3).
  * Use bulleted lists for related items where order does not matter.
* **Code blocks:** Always wrap commands, code snippets, and output in fenced code blocks with the appropriate language tag (e.g., `bash`, `json`).
* **Inline code:** Use backticks (\`) for file names, variable names, inline commands, and literal strings.

## 5. Summary of Common Transformations

| Traditional/Robotic Style | Modern Conversational Style |
| :--- | :--- |
| Requirements | What you need |
| Syntax | Command syntax |
| Failure Modes / Error Handling | Troubleshooting |
| Description | How it works / Overview |
| The command outputs the results... | The command outputs the results... |
| Triggers deployment for a branch... | Use the command to trigger a deployment... |
| Missing behavior: Command error | If the token is missing, the command fails. |
