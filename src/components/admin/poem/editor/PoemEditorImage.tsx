import Image from "next/image";

type PoemEditorImageProps = {
	imageSrc?: Blob | string;
};

export default function PoemEditorImage({ imageSrc }: PoemEditorImageProps) {
	if (!imageSrc) return null;
	let imageURL = "";
	if (typeof imageSrc === "string") {
		imageURL = `/api/image/${encodeURIComponent(imageSrc)}`;
	}

	if (imageSrc instanceof Blob) {
		imageURL = URL.createObjectURL(imageSrc);
	}

	return (
		<div className="relative w-full sm:w-2/3 aspect-3/2 drop-shadow-2xl rounded-2xl">
			<Image
				src={imageURL}
				alt={"Image for poem"}
				fill
				sizes="(max-width: 640px) 100vw, 50vw"
				className="object-cover rounded-2xl"
			/>
		</div>
	);
}
