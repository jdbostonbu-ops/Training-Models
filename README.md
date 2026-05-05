# Maya Chen — ML Research Engineer Portfolio 🧠
A dark-aesthetic, animation-driven personal portfolio for a fictional ML research engineer, built as the capstone of **CSS Labs: Phase I, Thinking with AI: HTML + CSS — Build a Styled Page**. This project began as a single `<h1>` and a community center page and grew into a multi-section portfolio featuring a live neural network hero animation, an educational explainer on artificial neural networks, four research project cards with custom Canvas micro-animations, a curated list of real arXiv publications, and a multi-stage booking flow with staggered calendar assembly — all delivered in pure Vanilla HTML, CSS, and JavaScript with zero dependencies.

## 👤 Author
**Jacqueline**
[Check out my GitHub Profile](https://github.com/jdbostonbu-ops)
🚀 **[Launch — Maya Chen Portfolio](https://jdbostonbu-ops.github.io/Training-Models/)**

<div align="center">
  <img src="src/trainingmodels.gif" width="100%" alt="Maya Chen Portfolio Demo">
</div>

---

# 🎓 Built During CSS Labs: Phase I

This project is the deliverable for **Phase I of Thinking with AI: HTML + CSS — Build a Styled Page**. The lab focused on:

- Reading and writing semantic HTML structure
- Understanding the difference between margin and padding
- Using flexbox and CSS grid for layout
- Adding interactivity through CSS transitions and `@keyframes`
- Splitting code into separate `.html`, `.css`, and `.js` files
- Working iteratively with AI as a thinking partner — refining prompts, evaluating output, and pushing back when something didn't match the vision

The portfolio started as a community center HTML structure exercise and evolved into a full single-page site through repeated cycles of prompting, building, critiquing, and refining. The final version reflects both technical learning (semantic markup, the box model, flexbox, animations, accessibility) and design judgment (typography scaling, animation pacing, content hierarchy).

---

# 🌟 Key Features

- **Live Neural Network Hero Animation:** A full-screen Canvas-rendered neural network with four layers (6, 10, 10, 5 nodes) and amber pulses traveling left-to-right along random connection paths every 280ms. Each pulse triggers a fading glow at the activated node, simulating forward propagation through the network. Built with `requestAnimationFrame` and retina-aware Canvas scaling.
- **Typewriter Heading Reveal:** The "What is a neural network?" heading types itself out letter-by-letter using a CSS `@keyframes` animation on the `width` property paired with `steps(28)` timing — combined with a blinking caret made from an animated `border-right`.
- **Educational ANN Explainer:** A dedicated section that introduces non-technical visitors to artificial neural networks, with a labeled input/hidden/output diagram, a worked probability example (`P(shark | location=Gulf, season=summer, time=day) = 0.34`), and a comparison of three architectures: CNN, RNN, and Transformer.
- **Three Architecture Micro-Animations:** Each architecture card features its own Canvas animation — a sweeping convolutional filter for the CNN, sequential node activation for the RNN, and varying-thickness attention lines connecting tokens for the Transformer.
- **Four Research Project Cards:** Mini Canvas animations demonstrate the work in each project — a ball rolling on a wavy loss surface (gradient descent), a shifting attention heatmap, points organizing into latent-space clusters, and a real-time training loss curve with live `loss:` and `step:` readouts.
- **Real Publication Links:** The "Selected writing" section links to five genuine, openly accessible papers on arXiv covering mechanistic interpretability, attention dynamics, and circuit discovery — every link verified and dated.
- **Staggered Calendar Assembly:** When a visitor clicks "Book A Call," the calendar assembles piece by piece sliding in from the right — header, day labels, then each week of dates — with `80ms` stagger delays per piece using `transition-delay` and a `cubic-bezier(0.34, 1.4, 0.64, 1)` ease-out-back curve for a subtle bounce.
- **Multi-Stage Booking Flow:** Calendar → time slots reveal → project details form → animated success state with an SVG checkmark drawn via `stroke-dasharray` animation. The form includes name, email, project type tag selection, and a free-text inquiry field, with a confirmation bar showing the chosen date and time.
- **Pre-Filled Email Template:** The "Email" contact link uses a properly URL-encoded `mailto:` with a complete subject line ("AI Training and Collaboration") and a multi-paragraph body template that visitors can edit before sending.
- **Fully Accessible:** Every animation respects `@media (prefers-reduced-motion: reduce)` — typewriter effects, scroll cues, calendar staggers, and the checkmark draw all disable for users who request reduced motion. Semantic HTML throughout, including `<section>` landmarks, descriptive `alt` text on all images, and `target="_blank" rel="noopener"` on all external links.
- **Zero Dependencies:** Pure Vanilla HTML5, CSS3, and JavaScript ES6+ — no frameworks, no build tools, no npm.

---

# 🎨 Design Philosophy

The design takes its cues from the visual language of leading AI research organizations — Anthropic, OpenAI, DeepMind — where restraint and craft signal seriousness more than flashy effects. The page progresses from dramatic to quiet as the visitor scrolls, mirroring the shift from "first impression" to "sustained reading."

### Color
- **Background:** Deep matte black `#0a0a0a` with secondary surfaces at `#0f0f10` and `#050505` — three near-black tones create depth without lifting into gray
- **Accent:** A single warm amber `#f59e0b` carries every interactive moment — link hovers, active states, pulse colors, button fills, the checkmark
- **Text:** A four-step opacity scale on white — `0.85` for body, `0.65` for secondary, `0.4` for tertiary, `0.2` for disabled — never pure white outside of headings, never pure gray
- **Borders:** All borders are `0.5px` (not 1px) at low opacity — a refined editorial tell that reads as "designed" rather than "default"

### Typography
- **System font stack:** `-apple-system, BlinkMacSystemFont, "SF Pro Display"` — zero external font requests, no FOIT or FOUT
- **Hero title at 98px:** Large enough to dominate the neural network background instead of getting lost in it
- **Lead paragraphs at 20px:** Body sizing chosen for readability on full-screen displays — prioritizing the reader over visual density
- **Letter-spacing:** Tight on the hero title (`-0.02em`) for confidence; expanded on section tags (`0.15em`) for editorial labels

### Motion
- **One bouncy curve:** `cubic-bezier(0.34, 1.4, 0.64, 1)` — used everywhere for entrances. The `1.4` overshoot value is what makes calendar pieces, project cards, and the success checkmark feel physical
- **Pacing rule:** Loud → quiet → very quiet. Hero is full-screen and animated; project cards are smaller and simpler; writing list and contact are pure typography. The visitor's energy curve matches the page's energy curve.
- **Animation tax respected:** Every motion can be turned off via OS-level reduced motion settings. Nothing relies on animation to be functional.

---

# 📋 Page Structure

| Section | Tag | What It Does |
| :--- | :--- | :--- |
| 01 | Hero | Full-screen neural network animation with name, title, and tagline |
| 02 | How it works | Educational explainer on what neural networks are, with three architecture cards |
| 03 | Selected work | Four research project cards with live Canvas micro-animations |
| 04 | Selected writing | Curated list of five real arXiv papers with publication dates |
| 05 | Contact | Email, X, Book A Call, Home links — Book A Call expands into the booking flow |

---

# 🌐 Browser & Device Compatibility

| Browser / Device | Status | Performance Notes |
| :--- | :--- | :--- |
| **Google Chrome** | ✅ Optimized | Full support — Canvas animations, staggered calendar, typewriter effect, and all transitions render smoothly. |
| **Microsoft Edge** | ✅ Optimized | Matches Chrome's rendering engine exactly. |
| **Firefox** | ✅ Supported | Full feature support including Canvas and CSS animations. |
| **Apple Safari (macOS)** | ✅ Supported | Full support. Canvas-based animations perform identically to Chrome. |
| **Safari (iOS)** | ✅ Supported | Touch interactions and booking flow fully functional. Hero animation scales to viewport. |
| **iPad / iPadOS** | ✅ Supported | Responsive grid stacks to single column at the 720px breakpoint via CSS media query. |
| **Android Chrome** | ✅ Supported | Full mobile compatibility, though heavy Canvas animations may stutter on older devices. |

> **Technical Note:** All Canvas animations use `requestAnimationFrame` with retina-aware `devicePixelRatio` scaling. The page reloads on window resize to recalculate canvas dimensions — a deliberate simplification chosen over `IntersectionObserver`-based pause/resume logic. The booking flow uses `scrollIntoView({ behavior: 'smooth' })` to bring the calendar into view after the visitor clicks "Book A Call."

---

# 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+) — `requestAnimationFrame`, Canvas 2D API, `getBoundingClientRect`, `devicePixelRatio` retina scaling, `classList` toggling, `matchMedia` for reduced-motion detection, `setTimeout` for staggered triggers
- **Styling:** CSS3 — Custom Properties, CSS Grid (`repeat(2, 1fr)`, `repeat(3, 1fr)`), Flexbox, `transform: translateX`, `transition-delay` staggering, `@keyframes`, `cubic-bezier` easing, `stroke-dasharray` for SVG path animation, `prefers-reduced-motion` media query, `steps()` timing for typewriter effect
- **Typography:** `-apple-system`, `BlinkMacSystemFont`, `"SF Pro Display"`, `"Helvetica Neue"`, sans-serif — system font stack, zero external font dependency
- **Graphics:** HTML5 Canvas for all neural network and project animations, inline SVG for the success checkmark
- **Storage:** No backend, no cookies, no localStorage — stateless on every load
- **Deployment:** GitHub Pages — zero-config static hosting

---

# 🚀 The User Flow

- **Land:** Full-screen hero loads with the neural network already animating — pulses traveling through layers, "Training models that reason" text overlaid, "↓ scroll" cue at the bottom
- **Learn:** Scroll into the educational section — heading types itself out, mini ANN diagram pulses, three architecture cards each demonstrate their own behavior
- **Explore:** Continue scrolling to four research project cards, each with a Canvas animation showing the concept (gradient descent, attention, clustering, training loss)
- **Read:** Selected writing section — five real arXiv papers, hover to see the title shift in amber and slide right
- **Book:** Click "Book A Call" in the contact section — calendar pieces stagger in from the right, pick a date, time slots slide down, pick a time, fill in project details, watch the success checkmark draw itself

---

# 🎓 Future Vision

- **Real Backend Integration:** Wire the booking form to Formspree, Netlify Forms, or a Calendly embed so inquiries actually reach the inbox
- **Performance Optimization:** Replace the page-reload-on-resize approach with `IntersectionObserver` to pause Canvas animations when off-screen — meaningful for mobile battery life
- **Real Maya:** Replace placeholder content (papers, project descriptions, biographical details) with real ML researcher content — this template would work for any researcher's portfolio
- **Dark/Light Toggle:** Add a CSS custom-properties theme switch — though the dark aesthetic is intentional for the AI research domain
- **Trust Strip:** Add a "Previously at: DeepMind · Anthropic · MIT CSAIL" section between the hero and education — social proof drives trust on researcher sites
- **Now Section:** Add a "Currently reading / building / mentoring" section — a popular pattern on developer portfolios that signals active engagement

---

# 📚 What I Learned

- **The box model is everything.** Margin pushes elements apart; padding makes them roomier inside. Once that clicked, layout stopped being mysterious.
- **Flexbox is for one direction; grid is for two.** The Atlas header reading exercise made `justify-content: space-between` and `align-items: center` permanent muscle memory.
- **Animation is about restraint.** The first version of every animation I built was too fast and too dramatic. Slowing things down by 100-200ms and softening the easing curve almost always made them better.
- **Single-file vs. multi-file is a real tradeoff.** I started with one `portfolio.html` containing everything, then split into `index.html`, `styles.css`, and `script.js`. Single-file is great for learning; multi-file is how real projects are organized.
- **AI is a thinking partner, not a code generator.** The best results came from clear prompts with constraints, then pushing back when output didn't match the vision (typography that was too small, technical inaccuracies in the CNN explanation, broken email links). The conversation matters more than any single answer.
- **Accessibility is not optional.** Every animation got a `prefers-reduced-motion` fallback. Every external link got `rel="noopener"`. Every interactive element became keyboard-navigable. These details separate a learner project from a real one.

⭐ Love this project? Give it a star and explore the other projects in this portfolio.
