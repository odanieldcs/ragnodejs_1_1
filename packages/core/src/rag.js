import { openai } from "./openai.js";
import { retrievalContext } from "./retrieval.js";

export const answerWithRAG = async (question) => {
	// buscar os chunck com esste contexto
	const contextChunks = await retrievalContext(question);

	// montar prompt: instruir o LLM
	const systemPrompt =
		"Você é um assistente que responde de forma sucinta e direta apenas com o contexto fornecido, sem ser criativo para a resposta.";
	// montar o contexto
	const context = contextChunks.join("\n\n---\n\n");
	const userPrompt = `Contexto:\n${context}\n\nPergunta: ${question}`;

	// chamar a LLM para obter a resposta
	const response = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{
				role: "system",
				content: systemPrompt,
			},
			{
				role: "user",
				content: userPrompt,
			},
		],
		temperature: 0.1,
	});

	// formatar o retorno da LLM
	return response.choices[0].message.content ?? "";
};
