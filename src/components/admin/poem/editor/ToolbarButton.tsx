type ToolbarButtonProps = {
	onClick: () => void;
	isActive: boolean;
	children: React.ReactNode;
};

export default function ToolbarButton({
	onClick,
	isActive,
	children,
}: ToolbarButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`p-2 transition-colors duration-100 ease-in-out rounded cursor-pointer ${
				isActive
					? " bg-classy-mauve text-black"
					: "text-shady-character hover:bg-classy-mauve/50"
			}`}
		>
			{children}
		</button>
	);
}
