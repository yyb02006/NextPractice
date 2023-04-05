import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		query: { id },
		session: { user },
	} = req;
	if (!id) return;
	const strPostId = id.toString();
	if (req.method === 'GET') {
		const post = await client.post.findUnique({
			where: { Id: +strPostId },
			include: {
				user: { select: { id: true, name: true, avatar: true } },
				answer: {
					select: {
						answer: true,
						Id: true,
						user: { select: { id: true, name: true, avatar: true } },
					},
				},
				_count: { select: { answer: true, wonderToo: true } },
			},
		});
		const isWonderToo = Boolean(
			await client.wonderToo.findFirst({
				where: { userId: user?.id, postId: +strPostId },
			})
		);
		if (post) {
			res.json({ success: true, post, isWonderToo });
			return;
		}
		if (!post) {
			res.status(404).end();
		}
	}
	if (req.method === 'POST') {
		const {
			body: { answer },
		} = req;
		const resAnswer = await client.answer.create({
			data: {
				answer: answer,
				user: { connect: { id: user?.id } },
				post: { connect: { Id: +strPostId } },
			},
		});

		res.json({ success: true });
	}
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET', 'POST'], func: handler })
);
