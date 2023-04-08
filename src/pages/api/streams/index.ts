import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	if (req.method === 'POST') {
		const {
			body: { name, price, description },
			session: { user },
		} = req;
		const stream = await client.stream.create({
			data: {
				name,
				price,
				description,
				user: { connect: { id: user?.id } },
			},
		});
		console.log(price);
		res.json({ success: true, stream });
	}
	if (req.method === 'GET') {
		const streams = await client.stream.findMany();
		res.json({ success: true, streams });
	}
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET', 'POST'], func: handler, inspection: false })
);
