
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const urls = [];

function downloadImage(url, index) {
    return new Promise((resolve, reject) => {
        const ext = path.extname(url).split('?')[0] || '.jpg';
        const filename = `external-img-${index}${ext}`;
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
                console.log(`Downloaded: ${filename}`);
                resolve({ url, filename });
            });
        }).on('error', (err) => {
            console.error(`Failed: ${url} - ${err.message}`);
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
