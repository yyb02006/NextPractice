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
		{
			/*const {
			result: {
				uid: cloudflareId,
				rtmps: { url: cloudflareUrl, streamKey: cloudflareKey },
			},
		} = await (
			await fetch(
				`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/stream/live_inputs`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_KEY}`,
					},
					body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic" }}`,
				}
			)
			).json();*/
		}
		const stream = await client.stream.create({
			data: {
				name,
				price,
				description,
				user: { connect: { id: user?.id } },
				cloudflareId: 'none',
				cloudflareKey: 'none',
				cloudflareUrl: 'none',
			},
		});
		res.json({ success: true, stream });
	}
	if (req.method === 'GET') {
		const {
			query: { page, size },
		} = req;
		if (!page || !size) return;
		const numSize = +size.toString();
		const numPage = +page.toString();
		const streams = await client.stream.findMany({
			take: numSize,
			skip: numPage * numSize,
		});
		res.json({ success: true, streams, page });
	}
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET', 'POST'], func: handler, inspection: false })
);
