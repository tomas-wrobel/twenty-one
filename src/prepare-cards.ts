import {TemplateResult, html} from "lit";

export default function () {
	const cards: TemplateResult<1>[] = [];

	const values = [
		"J",
		"Q",
		"K",
		7,
		8,
		9,
		10,
		"A"
	];

	for (const symbol of "♧♡♢♤") {
		for (const value of values) {
			cards.push(html`<playing-card symbol=${symbol} value=${value}></playing-card>`);
		}
	}

	const result: TemplateResult<1>[] = [];
	const indexes = cards.map((_, i) => i);

	while (indexes.length) {
		const [index] = indexes.splice(Math.floor(Math.random() * cards.length), 1);
		result.push(cards[index]);
	}

	return result;
}