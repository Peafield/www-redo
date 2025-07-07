"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { cn } from "@/utils/cn";
import CloseIcon from "./svgs/CloseIcon";
import MenuIcon from "./svgs/MenuIcon";

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
				"sticky inset-x-0 top-0 z-50 backdrop-blur-sm p-6 h-20 bg-pink-lemonade drop-shadow-md",
				className,
			)}
		>
			<div className="container flex items-center justify-between mx-auto w-full max-w-3xl">
				<div className="flex-1 sm:hidden">
					{isMenuOpen ? (
						<ul className="flex items-center justify-around">
							{navLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.url}
										onClick={handleToggleMenu}
										className="text-shady-character text-lg font-display transform transition-colors duration-200 ease-in hover:text-classy-mauve"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<h1 className="text-center text-xl">
							Wendi's Worminghall Whimsies
						</h1>
					)}
				</div>

				<h1 className="hidden sm:block sm:text-xl">
					Wendi's Worminghall Whimsies
				</h1>

				<ul className="flex items-center justify-end">
					<li>
						<button
							type="button"
							className={cn(
								"sm:hidden h-6 w-6 text-shady-character cursor-pointer transform transition-all duration-500 ease-in hover:text-classy-mauve",
								{
									"rotate-0": isMenuOpen,
									"rotate-180": !isMenuOpen,
								},
							)}
							onClick={handleToggleMenu}
							aria-label="Toggle menu"
						>
							{!isMenuOpen ? <MenuIcon /> : <CloseIcon />}
						</button>
					</li>
					{navLinks.map((link) => (
						<li key={link.name} className="hidden sm:block ml-8">
							<Link
								href={link.url}
								aria-label={`Maps to ${link.name}`}
								className="text-shady-character text-lg font-display transform transition-colors duration-200 ease-in hover:text-classy-mauve"
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
