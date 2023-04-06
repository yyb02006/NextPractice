import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		session: { user },
	} = req;
	const reviews = await client.review.findMany({
		where: { createdForId: user?.id },
		include: { createdBy: { select: { id: true, name: true, avatar: true } } },
	});
	res.json({ success: true, reviews });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler, inspection: false })
);
