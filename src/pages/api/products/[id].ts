import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const { id } = req.query;
	const strId = id!.toString();
	const product = await client.product.findUnique({
		where: {
			Id: +strId.toString(),
		},
		include: { user: { select: { name: true, id: true, avatar: true } } },
	});
	const term = product?.name
		.split(' ')
		.map((word) => ({ name: { contains: word } }));
	const relatedProducts = await client.product.findMany({
		where: {
			OR: term,
			AND: {
				Id: { not: +strId },
			},
		},
	});
	console.log(relatedProducts);
	res.json({ success: true, product, relatedProducts });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler })
);
