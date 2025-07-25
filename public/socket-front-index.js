import { inserirLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
    documentos.forEach((documento) => {
        inserirLinkDocumento(documento.nome);
    })
});

function emitirAdicionarDocumento(nome){
    socket.emit("adicionar_documento", nome);
}

export { emitirAdicionarDocumento };