/** Tailwind config for the stylesheet inlined into index.html.
 *  Colours resolve through CSS custom properties so one set of utility
 *  classes covers both the light and dark themes.
 *  Run tools/build-css.sh after adding new utility classes to the app. */
const withVar = v => `rgb(var(${v}) / <alpha-value>)`;

module.exports = {
  content: ['../index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:       withVar('--bg'),
        surface:  withVar('--surface'),
        surface2: withVar('--surface2'),
        line:     withVar('--line'),
        fg:       withVar('--fg'),
        muted:    withVar('--muted'),
        brand:    withVar('--brand'),
        win:      withVar('--win'),
        lose:     withVar('--lose'),
        gold:     withVar('--gold'),
        violet:   withVar('--violet')
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','SF Pro Rounded','SF Pro Display','Segoe UI','Roboto','Helvetica Neue','sans-serif']
      }
    }
  }
};
