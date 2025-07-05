import Image from "next/image";
import { ABOUT_ME_TEXT } from "@/app/constants/constants";
import ContentCard from "./ContentCard";
import HeroSection from "./HeroSection";

const About = () => {
	return (
		<>
			<HeroSection
				className="flex items-center justify-center"
				showImage={false}
			>
				<div className="grid w-full grid-cols-2 bg-tertiary mobile:gap-x-4 md:gap-x-8">
					<div className="flex size-full items-center justify-end">
						<h1 className="text-center font-bold mobile:text-4xl md:text-6xl">
							About Me
						</h1>
					</div>
					<div className="relative size-full">
						<div className="relative aspect-square mobile:w-48 md:w-56">
							<Image
								src="/profile-pic.jpeg"
								alt="Image of me"
								placeholder="blur"
								blurDataURL="/profile-pic.jpeg"
								priority
								fill
								sizes="100%"
								className="rounded-full object-cover shadow-xl"
							/>
						</div>
					</div>
				</div>
			</HeroSection>
			<ContentCard content={ABOUT_ME_TEXT} showShareButton={false} />
		</>
	);
};

export default About;
