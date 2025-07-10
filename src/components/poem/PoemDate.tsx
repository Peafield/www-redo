type PoemDateProps = {
	date: string;
};

export default function PoemDate({ date }: PoemDateProps) {
	return (
		<div className="w-full sm:w-2/3 flex items-center justify-end">
			<p className="text-sm font-serif text-shady-character">
				Published {date}
			</p>
		</div>
	);
}
