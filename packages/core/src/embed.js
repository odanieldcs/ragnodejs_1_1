import { openai } from "./openai.js";

export const embedText = async (text, dimension) => {
	const res = await openai.embeddings.create({
		model: "text-embedding-3-small",
		input: text,
		dimensions: dimension,
	});
	return res.data[0].embedding;
};
