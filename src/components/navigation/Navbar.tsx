"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { cn } from "@/utils/cn";
import CloseIcon from "../svgs/CloseIcon";
import MenuIcon from "../svgs/MenuIcon";

type NavbarProps = {
	className?: string;
};

const navLinks = [
	{
		name: "About",
		url: "/about",
	},
	{
		name: "Archive",
		url: "/archive",
	},
];

export default function Navbar({ className }: NavbarProps) {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);
	useClickAway(navRef, () => {
		setIsMenuOpen(false);
	});
	const handleToggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<nav
			ref={navRef}
			className={cn(
				"sticky inset-x-0 top-0 z-50 backdrop-blur-sm p-6 h-20 drop-shadow-md",
				className,
			)}
		>
			<div className="container flex items-center justify-between mx-auto w-full max-w-3xl">
				<div className="relative flex-1 flex items-center justify-center sm:hidden">
					{/* Mobile */}
					<ul
						className={cn(
							"absolute flex items-center justify-around w-full transition-opacity duration-300 ease-in-out",
							{
								"opacity-100": isMenuOpen,
								"opacity-0 pointer-events-none": !isMenuOpen,
							},
						)}
					>
						{navLinks.map((link) => (
							<li key={link.name}>
								<Link
									href={link.url}
									onClick={handleToggleMenu}
									prefetch
									className={cn(
										"text-shady-character text-lg font-display transform transition-colors duration-100 ease-in-out",
										{
											underline: pathname === link.url,
										},
									)}
								>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
					<Link href={"/"}>
						<h1
							className={cn(
								"text-center text-xl transition-opacity duration-300 ease-in-out",
								{
									"opacity-0 pointer-events-none": isMenuOpen,
									"opacity-100": !isMenuOpen,
								},
							)}
						>
							Wendi's Worminghall Whimsies
						</h1>
					</Link>
				</div>

				{/* Desktop */}
				<Link href={"/"}>
					<h1 className="hidden sm:block sm:text-xl transform transition-colors duration-100 ease-in-out hover:text-classy-mauve">
						Wendi's Worminghall Whimsies
					</h1>
				</Link>
				<ul className="flex items-center justify-end">
					<li>
						<button
							type="button"
							className="sm:hidden h-6 w-6 text-shady-character cursor-pointer flex items-center justify-center"
							onClick={handleToggleMenu}
							aria-label="Toggle menu"
						>
							{isMenuOpen ? <CloseIcon /> : <MenuIcon />}
						</button>
					</li>
					{navLinks.map((link) => (
						<li key={link.name} className="hidden sm:block ml-8">
							<Link
								href={link.url}
								aria-label={`Maps to ${link.name}`}
								aria-disabled={pathname === link.url}
								prefetch
								className={cn(
									"text-shady-character text-lg font-display transform transition-colors duration-100 ease-in-out hover:text-classy-mauve",
									{
										underline: pathname === link.url,
									},
								)}
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
