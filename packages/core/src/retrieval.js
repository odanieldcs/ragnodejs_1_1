import { embedText } from "./embed.js";
import { qdrant } from "./qdrant.js";

export const retrievalContext = async (question) => {
	const queryVector = await embedText(question);
	const results = await qdrant.search("rag", {
		vector: queryVector,
		limit: 5,
		with_payload: true,
	});

	return results.map((res) => res.payload?.text).filter((text) => !!text);
};
