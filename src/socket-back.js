import { adicionarDocumento, atualizaDocumento, encontrarDocumento, obterDocumentos } from "./documentosDb.js";
import io from "./servidor.js";

io.on('connection', (socket) => {
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();
        
        devolverDocumentos(documentos);
    });

    socket.on("adicionar_documento", async (nome) => {
        const resultado = await adicionarDocumento();
        console.log(resultado);
    })

    socket.on('disconnect', (motivo) => {
        console.log(`Cliente ${socket.id} desconectado! Motivo: ${motivo}`)
    });

        socket.on('selecionar_documento', async (nome_documento, devolverTexto) => {
            socket.join(nome_documento)

            const documento = await encontrarDocumento(nome_documento);
            
            if(documento){
                devolverTexto(documento.texto);
            }

    });

    socket.on('texto_editor', async ({texto, nomeDocumento}) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if(atualizacao.modifiedCount){
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });

});


