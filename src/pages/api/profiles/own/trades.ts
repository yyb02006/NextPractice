import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		session: { user },
		query: { kind },
	} = req;
	console.log(kind);
	if (kind === 'purchases') {
		const purchases = await client.trade.findMany({
			where: { userId: user?.id, kind: 'PURCHASE' },
			/**
			 * select와 include의 차이점은, select는 선택이기 때문에 where조건에 맞는 레코드의 select된 값만을 가져오고,
			 * include는 포함이기 때문에 where조건에 맞는 레코드의 값에 include를 포함하는 값을 가져온다
			 * */
			include: {
				product: { include: { _count: { select: { Favorite: true } } } },
			},
		});
		res.json({ success: true, purchases });
	}
	if (kind === 'sales') {
		const sales = await client.trade.findMany({
			where: { userId: user?.id, kind: 'SALE' },
			include: {
				product: { include: { _count: { select: { Favorite: true } } } },
			},
		});
		res.json({ success: true, sales });
	}
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler, inspection: false })
);
