import parse from "html-react-parser";

type PoemContentProps = {
	content: string;
};

export default function PoemContent({ content }: PoemContentProps) {
	return (
		<div className="prose prose-p:font-serif lg:prose-lg w-full mx-auto mb-14">
			{parse(content)}
		</div>
	);
}
