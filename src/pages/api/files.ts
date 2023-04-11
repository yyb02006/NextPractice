import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const response = await (
		await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v2/direct_upload`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_KEY}`,
				},
			}
		)
	).json();
	res.json({ success: true, ...response.result });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler, inspection: false })
);
