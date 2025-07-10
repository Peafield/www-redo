import About from "@/components/about/About";
import BottomNav from "@/components/navigation/BottomNav";

export default function AboutPage() {
	return (
		<section className="w-full h-full flex flex-col items-center justify-center gap-8">
			<About />
			<BottomNav />
		</section>
	);
}
