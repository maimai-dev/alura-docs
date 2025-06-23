import io from "./servidor.js";

io.on('connection', (socket) => {
    console.log('Um cliente se conectou! ID:', socket.id);

    socket.on('disconnect', (motivo) => {
        console.log(`Cliente ${socket.id} desconectado! Motivo: ${motivo}`)
    });

        socket.on('selecionar_documento', (nome_documento) => {
        socket.join(nome_documento)
    });

    socket.on('texto_editor', ({texto, nomeDocumento}) => {
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    });

})

