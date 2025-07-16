import { cn } from "@/utils/cn";

type PrimaryButtonProps = {
	type: "button" | "submit" | "reset";
	title: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
};

export default function PrimaryButton({
	type,
	title,
	onClick,
	disabled,
	className,
}: PrimaryButtonProps) {
	return (
		<button
			className={cn(
				"inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm font-serif text-pink-lemonade bg-shady-character mb-4 hover:bg-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve cursor-pointer transition-colors duration-300 ease-in-out",
				{
					[className as string]: !!className,
				},
			)}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{title}
		</button>
	);
}
