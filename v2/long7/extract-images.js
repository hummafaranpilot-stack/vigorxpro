const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const htmlFile = './index.html';
const imagesDir = './images';

// Read HTML file
let html = fs.readFileSync(htmlFile, 'utf8');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Extract and save base64 images
const base64Regex = /(?:url\(["']?|src=["'])?(data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,([^"'\)]+))["'\)]?/g;
let base64Match;
let base64Count = 0;
const base64Map = new Map();

console.log('=== Extracting Base64 Images ===\n');

while ((base64Match = base64Regex.exec(html)) !== null) {
    const fullDataUri = base64Match[1];
    const imageType = base64Match[2].replace('+xml', '');
    const base64Data = base64Match[3];

    // Skip if already processed
    if (base64Map.has(fullDataUri)) continue;

    base64Count++;
    const ext = imageType === 'jpeg' ? 'jpg' : imageType;
    const filename = `base64-img-${base64Count}.${ext}`;
    const filepath = path.join(imagesDir, filename);

    // Decode and save
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filepath, buffer);

    base64Map.set(fullDataUri, filename);
    console.log(`Saved: ${filename} (${buffer.length} bytes)`);
}

console.log(`\nTotal base64 images extracted: ${base64Count}\n`);

// Find external image URLs
console.log('=== External Image URLs ===\n');
const externalUrlRegex = /(?:src|data-src)=["'](https?:\/\/[^"']+\.(?:png|jpg|jpeg|gif|webp|svg))["']/gi;
let urlMatch;
const externalUrls = new Set();

while ((urlMatch = externalUrlRegex.exec(html)) !== null) {
    externalUrls.add(urlMatch[1]);
}

externalUrls.forEach(url => console.log(url));
console.log(`\nTotal external URLs: ${externalUrls.size}\n`);

// Find ClickBank image URLs (they use different patterns)
console.log('=== ClickBank/CDN Image URLs ===\n');
const cbUrlRegex = /["'](https?:\/\/[^"']*(?:clickbank|hopcdn|cb)[^"']*\.(?:png|jpg|jpeg|gif|webp))["']/gi;
let cbMatch;
const cbUrls = new Set();

while ((cbMatch = cbUrlRegex.exec(html)) !== null) {
    cbUrls.add(cbMatch[1]);
}

cbUrls.forEach(url => console.log(url));
console.log(`\nTotal ClickBank URLs: ${cbUrls.size}\n`);

// Replace base64 images in HTML with local paths
console.log('=== Updating HTML ===\n');
let updatedHtml = html;

base64Map.forEach((filename, dataUri) => {
    // Escape special regex characters in data URI
    const escapedUri = dataUri.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedUri, 'g');
    updatedHtml = updatedHtml.replace(regex, `images/${filename}`);
});

// Save updated HTML
fs.writeFileSync('./index-updated.html', updatedHtml);
console.log('Saved: index-updated.html\n');

// Generate download script for external images
const downloadScript = `
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const urls = ${JSON.stringify([...externalUrls, ...cbUrls], null, 2)};

function downloadImage(url, index) {
    return new Promise((resolve, reject) => {
        const ext = path.extname(url).split('?')[0] || '.jpg';
        const filename = \`external-img-\${index}\${ext}\`;
        const filepath = path.join('./images', filename);

        const protocol = url.startsWith('https') ? https : http;

        protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                downloadImage(response.headers.location, index).then(resolve).catch(reject);
                return;
            }

            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(\`Downloaded: \${filename}\`);
                resolve({ url, filename });
            });
        }).on('error', (err) => {
            console.error(\`Failed: \${url} - \${err.message}\`);
            reject(err);
        });
    });
}

async function downloadAll() {
    for (let i = 0; i < urls.length; i++) {
        try {
            await downloadImage(urls[i], i + 1);
        } catch (err) {
            // Continue on error
        }
    }
}

downloadAll();
`;

fs.writeFileSync('./download-external.js', downloadScript);
console.log('Saved: download-external.js (run this to download external images)\n');

console.log('=== Summary ===');
console.log(`Base64 images extracted: ${base64Count}`);
console.log(`External URLs found: ${externalUrls.size + cbUrls.size}`);
console.log('\nNext steps:');
console.log('1. Run: node download-external.js');
console.log('2. Review index-updated.html');
console.log('3. Replace index.html with index-updated.html');
