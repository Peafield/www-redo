import { cn } from "@/utils/cn";

type SubheadingProps = {
	text: string;
	className?: string;
};

export default function Subheading({ text, className }: SubheadingProps) {
	return (
		<h3
			className={cn(
				"font-display font-bold text-2xl text-shady-character mb-4",
				{
					[className as string]: !!className,
				},
			)}
		>
			{text}
		</h3>
	);
}
