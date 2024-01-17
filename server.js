const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Obtém o caminho do arquivo a ser servido
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = 'index.html';
  }

  // Obtém a extensão do arquivo
  const extname = path.extname(filePath);
  
  // Mapeia as extensões para os tipos MIME
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
  };

  // Define o tipo MIME do arquivo
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Lê o arquivo do sistema de arquivos
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Página não encontrada (404)
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        // Outro erro do servidor (500)
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1>');
      }
    } else {
      // Arquivo encontrado, serve com o tipo MIME apropriado
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Define a porta em que o servidor irá escutar
const port = process.env.PORT || 3000;

// Inicia o servidor
server.listen(port, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${port}/`);
});
