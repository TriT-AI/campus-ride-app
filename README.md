# 🚗 Campus Ride Sharing & Mobility

> **Live Demo**: [https://campus-ride-app.vercel.app/](https://campus-ride-app.vercel.app/)

A human-centered design strategy and Minimum Viable Product (MVP) scoping for a new campus mobility application, addressing the critical "Last-Mile Vacuum" that occurs after 20:00. This project was developed as the final project for the **Usability Evaluation Testing** course.

---

## 📑 Table of Contents
- [Executive Summary](#executive-summary)
- [Problem Definition](#problem-definition)
- [User Research & Personas](#user-research--personas)
- [HCI Strategy & UI Execution](#hci-strategy--ui-execution)
- [MVP Scope & Feature Mapping](#mvp-scope--feature-mapping)
- [Usability Testing & Refinement](#usability-testing--refinement)
- [Reflection & Key Learnings](#reflection--key-learnings)

---

## 🎯 Executive Summary
This application transitions students from high-friction, unverified social media carpool groups into a secure, algorithm-driven platform. By heavily leveraging established mental models (Jakob’s Law) and ruthlessly restricting the MVP scope to core safety and efficiency features, the resulting product minimizes cognitive load while maximizing user trust and adoption.

---

## 🚨 Problem Definition: The "Last-Mile" Vacuum
Following the introduction of the €49 D-Ticket, the primary barrier to student commuting shifted from financial cost to **time and comfort**. While daytime regional transit operates efficiently, post-20:00 transit headways drop drastically to 30–60 minutes.

### The "As-Is" User Journey Frictions
The shutdown of previous B2B carpooling platforms has forced students to rely on fragmented, unverified WhatsApp and Telegram groups, creating two primary frictions:
1. **Time Friction (Seeking Phase)**: Students waste 30+ minutes manually negotiating 10-minute rides, leading to high cognitive load and decision fatigue.
2. **Safety Friction (Boarding & Riding Phases)**: Waiting at isolated stops in the dark and riding with unverified strangers triggers acute environmental anxiety, particularly for female students.

---

## 👥 User Research & Personas
To ensure a user-centric MVP, research data was synthesized into two distinct personas representing the extremes of the campus mobility problem:

### 1. Lukas: The Efficiency-Driven Commuter
- **Core Pain Point**: Wasting excessive time coordinating rides via text.
- **Emotional State**: Frustrated and exhausted by the cognitive load of manual ride negotiation.
- **Design Need**: Instantaneous, zero-texting ride matching.

### 2. Mia: The Safety-Conscious Commuter
- **Core Pain Point**: Anxiety regarding unverified drivers and the lack of proactive emergency tools.
- **Emotional State**: Vulnerable and hyper-vigilant when isolated in a vehicle.
- **Design Need**: An institutionally verified network and discreet, built-in safety tools.

---

## 🧠 HCI Strategy & UI Execution
The primary HCI challenge was designing an interface that exhausted students could adopt at 10:00 PM without requiring a tutorial.

### Application of Jakob’s Law
To achieve a "zero learning curve," the design strategy strictly applied Jakob’s Law, inheriting mental models from popular super-apps (e.g., Grab, Be).
- **Full-bleed spatial maps** for immediate context.
- **Bottom-sheet menus** for one-handed ergonomics.
- **Thumb-zone** Call-To-Actions (CTAs).

### The "To-Be" User Flow
1. **Onboarding**: Mandatory University SSO authentication establishes a verified "Walled Garden".
2. **Booking**: 1-tap destination entry utilizing progressive disclosure (e.g., "Same-Gender" filters appear when relevant).
3. **Evaluation**: Built-in cancellation "Escape Hatch" to abort requests if algorithmic wait times are too long.
4. **On-Trip Safety**: Continuous GPS tracking combined with a deliberate "Swipe-to-Alert" SOS mechanism.

---

## 🛠 MVP Scope & Feature Mapping
The MVP is ruthlessly restricted to features that directly repair the validated breaking points in the "As-Is" journey:

- **Pillar 1: The Trust Foundation** (Fixes 'Boarding' Friction)
  - *Features*: SSO Webview Auth, User Profile, Emergency Contacts.
  - *Rationale*: Solves Mia's trust deficit by guaranteeing a 100% verified student network.
- **Pillar 2: The Efficiency Engine** (Fixes 'Seeking' Friction)
  - *Features*: Predictive GPS, Algorithmic Matching, In-App Quick Chat.
  - *Rationale*: Replaces 30 minutes of manual WhatsApp texting with a 1-tap auto-matching engine.
- **Pillar 3: Active Safety Suite** (Fixes 'Riding' Friction)
  - *Features*: Live On-Trip Tracking ("Share Trip") and an SOS Confirmation Modal.
  - *Rationale*: Replaces passive anxiety with proactive security via a PIN-protected SOS modal.

---

## 🧪 Usability Testing & Refinement
A remote unmoderated task-based usability test (via Maze) was conducted with 11 students to isolate pure UI friction and measure cognitive load.

### Key Metrics & Findings
| Metric | Target | Actual | Result |
|--------|--------|--------|--------|
| Onboarding Efficiency | 0% Drop-off Rate | 9.1% Drop-off | ✅ Achieved (Adjusted for prototype error) |
| Cognitive Load | < 10% Misclick Rate | 25.9% Misclick Rate | ❌ Missed (Healthy UI exploration misinterpreted) |
| UI Forgiveness | > 85% Direct Success Rate | 66.7% Success | ❌ Missed (Users trapped without "Cancel" button) |
| Safety Ergonomics | < 5.0s Time-on-Task (ToT) | 4.75s ToT | ✅ Achieved |

### Post-Test Iterations (Based on Heuristic Evaluation)
1. **The "Escape Hatch" Added**: Introduced a transitional "Waiting for Driver" buffer screen with a prominent "Cancel Ride" button, fixing the critical trap (Nielsen’s Heuristic #3: User Control and Freedom).
2. **UI Simplification ("Less is More")**: Removed undeveloped bottom navigation tabs (Activity, Message, Account) that caused "dead clicks" and distracted from the core booking flow.
3. **Elevated Proactive Safety**: Increased color contrast for the "Same-Gender" toggle and grouped it closer to the primary "Book Ride" button to intercept the user's eye-scanning path.
4. **Terminology Clarity**: Added descriptive subtitles to "Campus Pool" and "Solo" options to match real-world mental models (Nielsen’s Heuristic #2).
5. **Critical System Fixes**: Repaired state logic to ensure the chat interface remains responsive when the driver arrives, and linked a mandatory "Enter PIN" modal to properly enforce Error Prevention during SOS cancellation.

---

## 💡 Reflection & Key Learnings
- **Empirical Data Shatters Bias**: What makes sense to the system architect doesn't always make sense to a stressed user. We accidentally built a "digital trap" before testing revealed the need for an Escape Hatch.
- **"Less is More" is a Functional Requirement**: Feature parity with commercial apps (like adding bottom nav bars) caused cognitive friction. Stripping away unused elements drastically improved the prototype's reliability.
- **The Synergy of Testing Methods**: Quantitative data (Maze) showed *where* users failed, but Qualitative review (Heuristics) diagnosed *why*. 
- **Cognitive Ergonomics**: Designing the SOS "Enter PIN" modal wasn't just about linking screens; it was about understanding the mental state of an anxious commuter and building a physical interaction that prevents false alarms without adding cognitive load.

> *"Pushing pixels and drawing connections in a prototyping tool is merely the surface of UI/UX. True usability engineering is a highly rigorous, data-driven science."*
