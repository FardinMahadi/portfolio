# Plan

1. **Optional Visual Polish for Projects (pending)**
   - Make project screenshots open in a modal/lightbox using an accessible pattern (e.g., dialog via Framer Motion) so viewers can inspect details without leaving the page.
   - Reuse existing design tokens to ensure the lightbox matches the current theme and remains keyboard navigable.

2. **Surface Latest Blog Content (pending)**
   - Create a “Latest Article” preview for the homepage (likely near HeroSection or BlogSection) with thumbnail, title, excerpt, and CTA.
   - Ensure data pulls from existing blog data and remains performant via memoization or static props.

3. **Introduce Skills & Strengths (pending)**
   - Add a SkillsSection component detailing soft skills, specialties (performance, accessibility), and tech stack, reusing theme tokens.
   - Include responsive layout and motion accents consistent with the rest of the site.

4. **Add Testimonials (pending)**
   - Design a testimonial carousel or grid component (new file under LandingPage) with quotes, names, roles, and optional logos.
   - Implement focus and keyboard navigation, animating transitions subtly.

5. **Highlight Achievements (pending)**
   - Build an achievements/certifications strip or cards (badges, awards, hackathon wins) sourced from a JSON data file for maintainability.
   - Integrate iconography from /public/Icons or new assets.

6. **Accessibility & Performance Audits (pending)**
   - Run Lighthouse and axe audits; document findings.
   - Schedule fixes (e.g., color contrast tweaks in globals.css, ARIA updates) and ensure WCAG AA compliance.

7. **Blog Category Navigation (pending)**
   - Expand blog components (BlogIndexPage, CategoryFilter) to expose categories and SEO-friendly routes or anchors.
   - Update structured data if necessary.

8. **Enhance Contact Form (pending)**
   - Add a reason-for-contact dropdown/radio group to ContactSection with validation and accessible labeling.
   - Adjust API route (api/contact/route.ts) to accept the new field.

9. **Footer Navigation (pending)**
   - Introduce a simple footer component with quick links (Home, Projects, Blog, Contact) and social icons.
   - Ensure it’s theme-aware and mobile-responsive.

10. **CTA Microinteractions (pending)**
    - Audit key buttons (hero CTAs, project cards) and apply subtle hover/active states—e.g., animated borders or gradient shifts.
    - Consolidate reusable variants in ui/button.tsx if beneficial.

11. **Mobile Usability QA (pending)**
    - Test across breakpoints; adjust spacing, typography, and tap targets in key sections (hero, navigation, contact, projects).
    - Address any discovered issues iteratively.

12. **Internationalization Readiness (pending)**
    - Outline locale support (e.g., using Next.js i18n). Add language switcher placeholder and structure content for future translations.

13. Analytics & Feedback (pending)
    - Integrate a lightweight feedback widget (e.g., custom modal or third-party) allowing visitors to rate experience or leave comments.
    - Ensure consent/compliance considerations are covered.
