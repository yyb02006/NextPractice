import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		body: { title, price, description },
		session: { user },
	} = req;
	const product = await client.product.create({
		data: {
			/**userId는 user.id를 직접 넣어주는 게 아니라 user컬럼에 user.id를 조인시켜서 연결해야함*/
			user: { connect: { id: user?.id } },
			name: title,
			price: Number(price),
			desc: description,
			image: 'none',
		},
	});
	//product.Id만 가져가는 것도 좋지만, prisma client가 Product type을 지원하기 때문에 전체 다 보내는 것도 고려해볼만 함
	res.json({ success: true, product });
}

export default apiSessionWrapper(
	handlerWrapper({ method: 'POST', func: handler })
);
