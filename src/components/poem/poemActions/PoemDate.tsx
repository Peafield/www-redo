type PoemDateProps = {
	date: string;
};

export default function PoemDate({ date }: PoemDateProps) {
	return <p className="font-serif text-shady-character">Published {date}</p>;
}
