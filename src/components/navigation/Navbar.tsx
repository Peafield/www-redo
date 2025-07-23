"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import adminLogout from "@/app/actions/adminLogout";
import { cn } from "@/utils/cn";
import CloseIcon from "../svgs/CloseIcon";
import MenuIcon from "../svgs/MenuIcon";

type NavbarProps = {
	className?: string;
};

type NavLinks = {
	name: string;
	url: string;
}[];

const baseNavLinks: NavLinks = [
	{
		name: "About",
		url: "/about",
	},
	{
		name: "Archive",
		url: "/archive",
	},
];

const adminNavLinks: NavLinks = [
	{
		name: "Manage Poems",
		url: "/admin",
	},
	{
		name: "New poem",
		url: "/admin/new-poem",
	},
	{
		name: "Comment Moderation",
		url: "/admin/moderation",
	},
	{
		name: "Logout",
		url: "/",
	},
];

export default function Navbar({ className }: NavbarProps) {
	const pathname = usePathname();
	const isAdmin = pathname.startsWith("/admin");
	const navLinks = isAdmin ? adminNavLinks : baseNavLinks;
	const navbarTitle = isAdmin
		? "Admin Dashboard"
		: "Wendi's Worminghall Whimsies";
	const navbarTitleLink = isAdmin ? "/admin" : "/";
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);
	useClickAway(navRef, () => {
		setIsMenuOpen(false);
	});
	const handleToggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};
	const handleLogout = async () => {
		await adminLogout();
		setIsMenuOpen(false);
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
									onClick={
										link.name === "Logout" ? handleLogout : handleToggleMenu
									}
									prefetch
									className={cn(
										"text-shady-character text-lg font-serif transform transition-colors duration-100 ease-in-out",
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
					<Link href={navbarTitleLink}>
						<h1
							className={cn(
								"text-center text-xl transition-opacity duration-300 ease-in-out",
								{
									"opacity-0 pointer-events-none": isMenuOpen,
									"opacity-100": !isMenuOpen,
								},
							)}
						>
							{navbarTitle}
						</h1>
					</Link>
				</div>

				{/* Desktop */}
				<Link href={navbarTitleLink}>
					<h1 className="hidden sm:block sm:text-xl transform transition-colors duration-100 ease-in-out hover:text-classy-mauve">
						{navbarTitle}
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
								onClick={link.name === "Logout" ? handleLogout : () => {}}
								prefetch
								className={cn(
									"text-shady-character text-lg font-serif transform transition-colors duration-100 ease-in-out hover:text-classy-mauve",
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
