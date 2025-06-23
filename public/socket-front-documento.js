import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nome){
    socket.emit("selecionar_documento", nome);
}

function emitirTextoEditor(dados){
    socket.emit("texto_editor", dados);
}

socket.on('texto_editor_clientes', (texto) => {
    atualizaTextoEditor(texto);
});

socket.on('disconnect', (motivo) => {
    console.log(`Servidor desconectado! Motivo: ${motivo}`);
});

export { emitirTextoEditor, selecionarDocumento };