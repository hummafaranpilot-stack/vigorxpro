const fs = require('fs');

const htmlFile = './index.html';
const cssFile = './styles.css';

// Read HTML file
let html = fs.readFileSync(htmlFile, 'utf8');

// Extract all CSS from style tags (including type="text/css")
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let cssContent = '';
let match;
let styleCount = 0;

while ((match = styleRegex.exec(html)) !== null) {
    styleCount++;
    const css = match[1].trim();
    if (css) {
        cssContent += `/* === Style Block ${styleCount} === */\n`;
        cssContent += css + '\n\n';
    }
}

console.log(`Found ${styleCount} style blocks`);

// Save combined CSS
fs.writeFileSync(cssFile, cssContent);
console.log(`Saved: ${cssFile} (${(cssContent.length / 1024).toFixed(2)} KB)`);

// Remove style tags from HTML (except commented ones)
let updatedHtml = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (match) => {
    // Keep commented style tags
    if (match.includes('<!--')) return match;
    return '';
});

// Add link to external CSS in head
const headEndPos = updatedHtml.indexOf('</head>');
if (headEndPos !== -1) {
    const cssLink = '    <link rel="stylesheet" href="./styles.css">\n';
    updatedHtml = updatedHtml.slice(0, headEndPos) + cssLink + updatedHtml.slice(headEndPos);
}

// Clean up multiple empty lines
updatedHtml = updatedHtml.replace(/\n\s*\n\s*\n/g, '\n\n');

// Save updated HTML
fs.writeFileSync(htmlFile, updatedHtml);
console.log(`Updated: ${htmlFile}`);

console.log('\nDone! CSS extracted to styles.css');
