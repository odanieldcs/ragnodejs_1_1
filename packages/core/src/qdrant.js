import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrant = new QdrantClient({
	url: "http://localhost:6333",
});

export const ensureCollection = async (
	connection,
	collectionName,
	vectorStore,
) =>
	await connection.createCollection(collectionName, {
		vectors: { size: vectorStore, distance: "Cosine" },
	});
