import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		body: { question, category },
		session: { user },
	} = req;

	const post = await client.post.create({
		data: { question, category, user: { connect: { id: user?.id } } },
	});
	res.json({ success: true, post });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['POST', 'GET'], func: handler })
);
