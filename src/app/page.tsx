import { Suspense } from "react";
import Home from "@/components/home/Home";

export default function HomePage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Home />
		</Suspense>
	);
}

export const metadata = {
	title: "Wendi's Worminghall Whimsies Home Page",
	description: "The latest poems by Wendi Coles",
};
