const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5173;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <head><title>SEBEN - Page d'accueil</title></head>
            <body style="font-family: Arial, sans-serif; background: #0a0a0a; color: white; padding: 2rem;">
              <h1>🌍 SEBEN - Dictionnaire des Langues Nationales</h1>
              <p>Application en cours de développement...</p>
              <div style="margin-top: 2rem;">
                <h2>Fonctionnalités :</h2>
                <ul>
                  <li>📚 Dictionnaire Bambara</li>
                  <li>🤖 Assistant IA</li>
                  <li>✍️ Éditeur de texte</li>
                  <li>🔄 Traduction multilingue</li>
                </ul>
              </div>
            </body>
          </html>
        `);
      } else {
        res.writeHead(500);
        res.end('Erreur serveur: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`🚀 Serveur SEBEN démarré sur http://localhost:${port}`);
  console.log('📱 Ouvrez votre navigateur et allez sur http://localhost:5173');
});

