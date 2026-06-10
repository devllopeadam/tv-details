const fs = require('fs');

const inputFile = 'sports_morocco.m3u';
const outputFile = 'sports_morocco_fixed.m3u';

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = content.split(/\r?\n/);

let outLines = [];
if (lines[0] !== '#EXTM3U') {
    outLines.push('#EXTM3U');
}

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.startsWith('#EXTINF:')) {
        // Remove tvg-id attribute completely
        line = line.replace(/tvg-id="[^"]*"\s*/, '');
        
        // Remove resolutions like (1080p), (720p), (HD), (SD) from the channel name at the end
        // e.g. group-title="Sports",Arryadia HD 1 (1080p) -> group-title="Sports",Arryadia HD 1
        line = line.replace(/\s*\(\d+p\)\s*$/, '');
        line = line.replace(/\s*\[.*?\]\s*$/, ''); // Remove things like [Not 24/7]
    }
    outLines.push(line);
}

fs.writeFileSync(outputFile, outLines.join('\n'));
console.log('Fixed M3U saved to ' + outputFile);
