export const chuckText = (text, maxTokens) => {
	const sentences = text.split(/(?<=[.?!]\s+)/);
	const chuncks = [];
	let chunck = "";

	for (const sentence of sentences) {
		if ((chunck + sentence).split(" ").length > maxTokens) {
			chuncks.push(chunck.trim());
			chunck = "";
		}
		chunck += `${sentence} `;
	}
	if (chunck.trim()) chuncks.push(chunck.trim());

	return chuncks;
};
