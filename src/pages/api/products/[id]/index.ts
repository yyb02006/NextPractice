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
	const strProductId = id.toString();
	const product = await client.product.findUnique({
		where: {
			Id: +strProductId,
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
				Id: { not: +strProductId },
			},
		},
	});
	/**
	 * AND는 contians같은 세부적인 조건이 필요할 때나 쓰고 단순히 두 가지 필드를 조건으로 레코드를 불러오고 싶다면
	 * 그냥 필드 조건을 두 번 적으면 된다. (product.Id == strProductId)
	 */
	const isLiked = Boolean(
		await client.favorite.findFirst({
			where: {
				productId: product?.Id,
				userId: user?.id,
			},
			select: {
				//boolean을 받기 위해선 존재하는 레코드냐 아니냐만 중요하기 때문에 id필드의 값만 가져온다.
				Id: true,
			},
		})
	);
	res.json({ success: true, isLiked, product, relatedProducts });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler })
);
