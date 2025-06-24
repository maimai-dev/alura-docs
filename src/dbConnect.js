import { MongoClient } from "mongodb";

const cliente = new MongoClient("");

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    const documentos = db.collection("documentos");

    console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
    console.log(erro);
}