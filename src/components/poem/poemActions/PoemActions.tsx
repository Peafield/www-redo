import PoemDate from "./PoemDate";
import PoemShareButton from "./PoemShareButton";

type PoemActionsProps = {
	date: string;
};

export default function PoemActions({ date }: PoemActionsProps) {
	return (
		<aside className="w-full flex flex-col items-end justify-around mb-8">
			<PoemDate date={date} />
			<PoemShareButton />
		</aside>
	);
}
