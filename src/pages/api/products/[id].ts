import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const { id } = req.query;
	const product = await client.product.findUnique({
		where: {
			Id: +id!.toString(),
		},
		include: { user: { select: { name: true, id: true, avatar: true } } },
	});
	res.json({ success: true, product });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler })
);
