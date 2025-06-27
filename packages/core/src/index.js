import { ingest } from "./ingest.js";
import { answerWithRAG } from "./rag.js";

// ingest
const contentToRAG = `RAG é uma técnica de recuperação de informações que combina a busca por dados relevantes com a geração de respostas. Ela utiliza modelos de linguagem para gerar respostas baseadas em informações recuperadas de fontes externas, como bancos de dados ou documentos. Isso permite que os modelos forneçam respostas mais precisas e contextualizadas, aproveitando o conhecimento existente.`;
await ingest(contentToRAG, "oqueerag");

// answer
const resposta = await answerWithRAG(
	"Que tipos de documentos posso processar com RAG?",
);
console.log("Resposta", resposta);
