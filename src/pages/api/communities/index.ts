import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const posts = await client.post.findMany({
		include: {
			user: { select: { name: true } },
			_count: { select: { WonderToo: true, answer: true } },
		},
	});
	res.json({ success: true, posts });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler })
);
