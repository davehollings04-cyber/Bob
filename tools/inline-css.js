/* Swaps the compiled Tailwind build into index.html between the inline-css markers. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const css = fs.readFileSync(path.join(__dirname, 'build.css'), 'utf8').trim();

const OPEN = '<style id="tw">';
const CLOSE = '</style>';
let html = fs.readFileSync(htmlPath, 'utf8');
const start = html.indexOf(OPEN);
if (start === -1) throw new Error('marker <style id="tw"> not found in index.html');
const end = html.indexOf(CLOSE, start);
html = html.slice(0, start + OPEN.length) + '\n' + css + '\n' + html.slice(end);
fs.writeFileSync(htmlPath, html);
console.log('inlined', (css.length/1024).toFixed(1) + 'KB of CSS');
