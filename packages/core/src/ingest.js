import { v4 as uuid } from "uuid";
import { chuckText } from "./chunck.js";
import { embedText } from "./embed.js";
import { ensureCollection, qdrant } from "./qdrant.js";

export const ingest = async (text, docId) => {
	const VECTOR_STORE = 1536;
	const COLLECTION = "rag";
	// chunck -- quebra o texto em blocos
	const chuncks = chuckText(text, 300);
	console.log("Chuncks:", chuncks);
	// embed
	const points = await Promise.all(
		chuncks.map(async (text) => ({
			id: uuid(),
			vector: await embedText(text, VECTOR_STORE),
			payload: {
				text,
				docId,
			},
		})),
	);

	console.log(points);
	// cria nossa collection
	await ensureCollection(qdrant, COLLECTION, VECTOR_STORE);

	// store / upsert
	await qdrant.upsert(COLLECTION, { wait: true, points });
};
