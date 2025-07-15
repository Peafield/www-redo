import parse from "html-react-parser";

type PoemContentProps = {
	content: string;
};

export default function PoemContent({ content }: PoemContentProps) {
	return (
		<div className="prose prose-p:font-serif lg:prose-lg w-full sm:w-2/3 mx-auto mb-8">
			{parse(content)}
		</div>
	);
}
