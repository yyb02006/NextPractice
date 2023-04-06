import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		session: { user },
	} = req;
	const favorites = await client.favorite.findMany({
		where: { userId: user?.id },
		include: {
			product: {
				include: { _count: { select: { Favorite: true } } },
			},
		},
	});
	res.json({ success: true, favorites });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler, inspection: false })
);
