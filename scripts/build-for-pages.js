const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Build static site
console.log('Building for GitHub Pages...');
execSync('npm run build', { stdio: 'inherit' });

// Create a .nojekyll file to tell GitHub Pages not to use Jekyll
const nojekyllPath = path.join(__dirname, '..', 'dist', '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('Created .nojekyll file');

// Copy index.html to 404.html for SPA routing
const indexPath = path.join(__dirname, '..', 'dist', 'public', 'index.html');
const notFoundPath = path.join(__dirname, '..', 'dist', 'public', '404.html');
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('Created 404.html for SPA routing');
}

console.log('Build for GitHub Pages completed!');