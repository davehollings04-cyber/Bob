/** Tailwind config for the inlined stylesheet in index.html.
 *  Run tools/build-css.sh after adding new utility classes to the app. */
module.exports = {
  content: ['../index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink:   { 900:'#08090d', 800:'#0e1017', 700:'#141722', 600:'#1b1f2e', 500:'#252a3b', 400:'#333a50' },
        neon:  { DEFAULT:'#22e584', dark:'#12b869' },
        flame: { DEFAULT:'#ff5470', dark:'#e63757' },
        gold:  { DEFAULT:'#ffc83d', dark:'#e0a800' },
        violet:{ DEFAULT:'#8b5cf6' }
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','SF Pro Display','Segoe UI','Roboto','Helvetica Neue','sans-serif']
      }
    }
  }
};
