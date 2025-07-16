import Subheading from "../typography/Subheading";

export default function AdminDashboard() {
	return (
		<section className="flex flex-col">
			<Subheading text={"Comment moderation"} />
			<div className="flex overflow-x-auto rounded-xl border-2 border-classy-mauve/50">
				<table className="flex-1 divide-y divide-classy-mauve/50">
					<thead>
						<tr>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Comment
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Author
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Poem
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Date
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Status
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-t border-t-classy-mauve/50">
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								This is a comment
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Peter
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Poem title
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								2 days ago
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Pending
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Approve
							</td>
						</tr>
						<tr className="border-t border-t-classy-mauve/50">
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								This is a comment
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Peter
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Poem title
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								2 days ago
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Pending
							</td>
							<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
								Approve
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}
