"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import PrimaryButton from "../buttons/PrimaryButton";
import CloseIcon from "../svgs/CloseIcon";
import Subheading from "../typography/Subheading";

type ModalProps = {
	isOpen: boolean;
	title: string;
	onClose: () => void;
	buttonTitle: string;
	children?: ReactNode;
	primaryButtonClick?: () => void | Promise<void>;
	className?: string;
};

export default function Modal({
	isOpen = false,
	title,
	onClose,
	children,
	buttonTitle,
	primaryButtonClick,
	className,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	// Effect open and close the dialog.
	useEffect(() => {
		const dialogNode = dialogRef.current;
		if (!dialogNode) return;

		if (isOpen) {
			if (!dialogNode.hasAttribute("open")) {
				dialogNode.showModal();
			}
		} else {
			if (dialogNode.hasAttribute("open")) {
				dialogNode.close();
			}
		}
	}, [isOpen]);

	// Effect to handle outside click or escape key.
	useEffect(() => {
		const dialogNode = dialogRef.current;
		if (!dialogNode) return;

		const handleCancel = (event: Event) => {
			event.preventDefault();
			onClose();
		};
		dialogNode.addEventListener("cancel", handleCancel);

		const handleClick = (event: MouseEvent) => {
			if (event.target === dialogNode) {
				onClose();
			}
		};
		dialogNode.addEventListener("click", handleClick);

		return () => {
			dialogNode.removeEventListener("cancel", handleCancel);
			dialogNode.removeEventListener("click", handleClick);
		};
	}, [onClose]);

	return createPortal(
		<div className="fixed inset-0 z-50 p-4 backdrop-blur-sm">
			<dialog
				ref={dialogRef}
				aria-label={title}
				className={cn(
					"m-auto bg-pink-lemonade rounded-xl w-full max-w-md p-6",
					{
						[className as string]: !!className,
					},
				)}
			>
				<header className="flex items-center justify-between">
					<Subheading text={title} />
					<button
						type="button"
						onClick={onClose}
						className="absolute top-4 right-4 text-shady-character hover:text-classy-mauve transition-colors"
					>
						<CloseIcon className="w-6 h-6" />
					</button>
				</header>
				<p className="font-serif text-lg">{children}</p>
				<div className="flex justify-end space-x-3 p-5">
					<PrimaryButton
						type="button"
						title={buttonTitle as string}
						onClick={primaryButtonClick}
					/>
					<PrimaryButton
						title="Cancel"
						type="button"
						onClick={onClose}
						className="bg-classy-mauve hover:bg-shady-character"
					/>
				</div>
			</dialog>
		</div>,
		document.body,
	);
}
