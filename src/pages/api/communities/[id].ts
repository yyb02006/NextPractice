import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		query: { id },
	} = req;
	console.log(id);
	if (req.method === 'GET') {
		if (!id) return;
		const post = await client.post.findUnique({
			where: { Id: +id.toString() },
			include: {
				user: { select: { id: true, name: true, avatar: true } },
				answer: {
					select: {
						answer: true,
						Id: true,
						user: { select: { id: true, name: true, avatar: true } },
					},
				},
				_count: { select: { answer: true, WonderToo: true } },
			},
		});
		res.json({ success: true, post });
	}
	if (req.method === 'POST') {
		// const respone = await client.answer.create({
		// 	data: {
		// 		answer: answer,
		// 		user: { connect: { id: user?.id } },
		// 		post: { connect: { Id: +id } },
		// 	},
		// });
		console.log(id);

		res.json({ success: true });
	}
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET', 'POST'], func: handler })
);
