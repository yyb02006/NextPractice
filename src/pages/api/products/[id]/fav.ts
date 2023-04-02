import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		query: { id },
		session: { user },
	} = req;
	const strProductId = id!.toString();
	const existsFav = await client.favorite.findFirst({
		where: { productId: +strProductId, userId: user?.id },
	});
	if (existsFav) {
		await client.favorite.delete({
			where: { Id: existsFav.Id },
		});
	}
	if (!existsFav) {
		await client.favorite.create({
			data: {
				product: { connect: { Id: +strProductId } },
				user: { connect: { id: user?.id } },
			},
		});
	}
	res.json({ success: true });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['POST'], func: handler })
);
