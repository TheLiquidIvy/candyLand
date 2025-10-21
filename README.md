
# Candy Heaven Landing Guide

This repository hosts **Candy Heaven**, a premium candy store landing page built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Project Snapshot
- **Entry point**: `src/main.tsx`
- **Root component**: `src/App.tsx`
- **Styling**: Tailwind utility classes in `src/index.css` with palette defined inline in `App.tsx`
- **Animation**: Framer Motion for hero lollipop spin, confetti button, draggable jars, carousel transitions, and interactive quest/contact sections
- **Build tooling**: Vite 7 (ES module output)

## Current Experience
- **Hero Section**: Spinning lollipop centerpiece with concentric neutral gradients, confetti-trigger button, ambient background blobs, and elevated welcome badge.
- **Product Flight**: Draggable candy jars (`candyJars`) with toned-down gradients, motion-driven “spill” effects, and responsive card layout.
- **Testimonials**: Autoplay carousel with bouncing candy-corn avatar (`CandyCornAvatar`) and pager controls.
- **Quest CTA**: Answer tiles (`questOptions`) update contextual copy and teaser menu via `selectedQuestMessage` logic.
- **Contact Form**: Neutral form fields, badge chips, and animated `ContactButton` using subtle hover morphing.

## Architecture Notes
- Entire UI lives in `App.tsx`; sections can be extracted into components (`HeroSection`, `ProductShowcase`, `Testimonials`, `Quest`, `Contact`) when scaling.
- Data arrays (`candyJars`, `testimonials`, `questOptions`) and palette constants sit near the top for quick updates.
- Confetti uses `createConfettiPieces()` with muted palette (`confettiPalette`), while hero candies reference `heroCandyPalette` for staggered motion.
- Animations rely on Framer Motion primitives; when adding new interactions, maintain gentle easing (`easeInOut`) and staggered timing for consistency.

## Development Commands
- **Install dependencies**: `npm install`
- **Production build**: `npm run build`
- (No tests configured.)

## Design & Interaction Guidelines
- Palette favors warm neutrals (sand, taupe, muted sage) per `web-design-optimization` brief; avoid returning to neon tones.
- Maintain asymmetrical layouts and generous whitespace by leveraging Tailwind grid utilities.
- Keep micro-interactions refined: hover and scroll-trigger effects should enhance legibility, not distract.
- Honor reduced-motion preferences if future work expands animation usage.

## Future Considerations
- Consider extracting shared gradient blob logic into a reusable component.
- Introduce responsive typography tokens via Tailwind config if multiple pages are added.
- For backend needs (forms, specials data), integrate Youware Backend to handle persistence securely.
