import type { Comment } from "@/types/posts";
import Subheading from "../typography/Subheading";
import PendingCommentTableRow from "./pendingComments/PendingCommentTableRow";

type AdminDashboardProps = {
	pendingComments: Comment[] | null;
};

export default function AdminDashboard({
	pendingComments,
}: AdminDashboardProps) {
	console.log(pendingComments);
	return (
		<section>
			<Subheading text={"Comment moderation"} />
			<div className="overflow-x-auto rounded-xl border-2 border-classy-mauve/50">
				<table className="min-w-full divide-y divide-classy-mauve/50">
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
						{pendingComments?.map((comment) => (
							<PendingCommentTableRow
								key={comment._id as string}
								comment={comment}
							/>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
