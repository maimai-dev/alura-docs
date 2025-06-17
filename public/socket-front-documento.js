import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function emitirTextoEditor(texto){
    socket.emit("texto_editor", texto);
}

socket.on('texto_editor_clientes', (texto) => {
    atualizaTextoEditor(texto);
});

socket.on('disconnect', (motivo) => {
    console.log(`Servidor desconectado! Motivo: ${motivo}`);
});

export { emitirTextoEditor };