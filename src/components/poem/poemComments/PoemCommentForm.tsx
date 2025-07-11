// TODO: Complete this form with server actions

export default function PoemCommentForm() {
	return (
		<form className="my-12 w-full sm:w-2/3">
			<h3 className="text-xl font-bold mb-4 font-serif text-shady-character">
				Leave a comment
			</h3>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-shady-character sr-only"
					>
						Name
					</label>
					<input
						className="block w-full font-serif placeholder:text-shady-character/50 p-2 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50"
						id="name"
						name="name"
						placeholder="Your Name"
						type="text"
					/>
				</div>
				<div>
					<label
						className="block text-sm font-medium text-shady-character sr-only"
						htmlFor="comment"
					>
						Comment
					</label>
					<textarea
						className="block w-full font-serif placeholder:text-shady-character/50 p-2  rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve  bg-white/50"
						id="comment"
						name="comment"
						placeholder="Write your comment..."
						rows={4}
					/>
				</div>
				<div>
					<button
						className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm font-serif text-pink-lemonade bg-shady-character hover:bg-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve cursor-pointer transition-colors duration-300 ease-in-out"
						type="submit"
					>
						Post Comment
					</button>
				</div>
			</div>
		</form>
	);
}
