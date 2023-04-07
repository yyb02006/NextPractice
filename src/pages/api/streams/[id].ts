import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		query: { id },
	} = req;
	if (!id) return;
	const strId = id.toString();
	const stream = await client.stream.findUnique({
		where: { Id: +strId },
	});
	res.json({ success: true, stream });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler, inspection: false })
);
