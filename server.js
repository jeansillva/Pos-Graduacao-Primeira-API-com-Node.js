const http = require('http');
const PORT = 3000;

const usuarios = [];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/usuarios') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(usuarios));

    } else if (req.method === 'POST' && req.url === '/usuarios') {

        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const novoUsuario = JSON.parse(body);
            usuarios.push(novoUsuario); 

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensagem: 'Usuário adicionado com sucesso!' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensagem: 'Rota não encontrada!' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
