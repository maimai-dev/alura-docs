import io from "./servidor.js";

const documentos = [
    {
        nome: "JavaScript",
        texto: "texto de javascript..."
    },
    {
        nome: "Node",
        texto: "texto de node..."
    },
    {
        nome: "Socket.io",
        texto: "texto de socket.io..."
    }
]

io.on('connection', (socket) => {
    console.log('Um cliente se conectou! ID:', socket.id);

    socket.on('disconnect', (motivo) => {
        console.log(`Cliente ${socket.id} desconectado! Motivo: ${motivo}`)
    });

        socket.on('selecionar_documento', (nome_documento, devolverTexto) => {
            socket.join(nome_documento)
            const documento = encontrarDocumento(nome_documento);
            
            if(documento){
                devolverTexto(documento.texto);
            }

    });

    socket.on('texto_editor', ({texto, nomeDocumento}) => {
        const documento = encontrarDocumento(nomeDocumento);

        if(documento){
            documento.texto = texto;
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });

});

function encontrarDocumento (nome) {
    const documento = documentos.find((documento) => {
        return documento.nome === nome;
    });

    return documento;
}

