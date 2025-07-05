type SectionHeadingProps = {
	text: string;
};

const SectionHeading = ({ text }: SectionHeadingProps) => {
	return (
		<section className="mb-4 mt-2 p-4">
			<h2 className="text-center text-4xl font-bold">{text}</h2>
		</section>
	);
};

export default SectionHeading;
