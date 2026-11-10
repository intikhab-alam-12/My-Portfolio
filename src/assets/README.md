# Assets Directory

Place your personal profile portrait here (e.g., `portrait.jpg`, `portrait.png`, or `profile.webp`).

When added:
1. Import your image in `src/components/Hero.jsx`:
   ```javascript
   import profileImg from '../assets/portrait.jpg';
   ```
2. In `Hero.jsx`, replace the `<MonogramAvatar />` call with:
   ```jsx
   <img
     src={profileImg}
     alt="Intikhab Alam"
     className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/40 shadow-glow-purple mx-auto mb-5"
   />
   ```

