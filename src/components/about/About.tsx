import Image from "next/image";
import { ABOUT_ME_TEXT } from "@/app/constants/constants";

export default function About() {
	return (
		<section className="mx-auto mb-4 w-full sm:w-2xl">
			<h3 className="font-display font-bold text-2xl text-shady-character mb-6 sm:my-8">
				About Me
			</h3>
			<div className="relative float-right ml-4 mb-4 size-48 sm:size-52 rounded-full">
				<Image
					src={"/protrait-of-wendi.jpg"}
					alt="Portrait picture of Wendi Coles"
					fill
					className="rounded-full object-cover shadow-xl"
				/>
			</div>
			<article className="prose prose-p:font-serif lg:prose-lg">
				<p className="text-shady-character">{ABOUT_ME_TEXT}</p>
			</article>
		</section>
	);
}
