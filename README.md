# FractionQuest: Fino's Fraction Adventure

An interactive, bilingual storybook website designed as an educational innovation for an **MTES6023 Teacher Education Assignment** in Malaysia.

---

## 🌟 Project Background

- **Target Learners**: Year 4 KSSR Mathematics pupils in Malaysia.
- **Curriculum Alignment**:
  - **Content Standard 2.1**: Fractions / Pecahan
  - **Learning Standard 2.1.2**: Add two proper fractions with different denominators / Menambah dua pecahan wajar yang penyebutnya berbeza.
- **Pedagogical Focus**: Addresses the common learning issue where pupils incorrectly add numerators and denominators separately (e.g. $\frac{1}{2} + \frac{1}{4} = \frac{2}{6}$) without understanding equivalent fractions and common denominators.

---

## 🦊 Features

1. **Magical Storybook Interface**:
   - Designed with warm pastel aesthetics (Cream, Sage Green, Peach, Lavender, and Light Blue).
   - Features **Fino the Explorer Fox**, a friendly orange fox wearing a teal explorer scarf.
   - Storybook frame panels, responsive mobile-friendly layout, and smooth animations (with reduced-motion accessibility support).

2. **Bilingual Support (Bahasa Melayu & English)**:
   - **Bahasa Melayu** is the default language.
   - Instant language switcher in the header dynamically updates all visible website text (navigation, story dialogue, instructions, button labels, and feedback) without resetting pupil progress.

3. **5 Story Chapters**:
   1. **Misteri Bahagian Pecahan** / *The Mystery of Fraction Pieces*
   2. **Hutan Pecahan Setara** / *The Forest of Equivalent Fractions*
   3. **Jambatan Bahagian Sama Saiz** / *The Bridge of Equal Parts*
   4. **Istana Penambahan Pecahan** / *The Castle of Fraction Addition*
   5. **Misi Terakhir Pecahan** / *The Final Fraction Quest*

4. **Progress & Adventure Map**:
   - Illustrated adventure map showing chapter lock/unlock status and completion badges.
   - Saves pupil learning progress locally in `localStorage`.

5. **Extensible Architecture**:
   - Modular structure allowing future interactive math activities, quizzes, and feedback logic to be seamlessly added.

---

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom pastel storybook theme
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS keyframes
- **Testing**: Vitest & React Testing Library

---

## 🛠️ Local Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fractionquest.git
cd fractionquest

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Testing & Verification

Run the automated test suite using Vitest:

```bash
# Run unit & component tests
npm test

# Run TypeScript typecheck
npm run lint
```

---

## 📦 Production Build & Vercel Deployment

### Build Locally
```bash
npm run build
```
The output files will be compiled into the `dist/` directory.

### Deploying to Vercel

1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com) and import your repository.
3. Vercel will automatically detect Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

---

## 📄 License
Created for MTES6023 Educational Innovation Assignment. All Rights Reserved.
