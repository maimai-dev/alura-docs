import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://admin:admin123@aluracluster.4qemetw.mongodb.net/?retryWrites=true&w=majority&appName=AluraCluster");

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    const documentos = db.collection("documentos");

    console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
    console.log(erro);
}