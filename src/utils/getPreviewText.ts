import nlp from "compromise";
import { htmlToText } from "html-to-text";

export function getPreviewText(rawHtml: string): string {
	const text = htmlToText(rawHtml || "", {
		wordwrap: false,
	});
	const doc = nlp(text);
	const firstSentence = doc.sentences().first().text();
	const cleanSentence = firstSentence.replace(/[.,!?;:]$/, "");

	return `${cleanSentence}...`;
}
