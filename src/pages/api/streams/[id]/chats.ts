import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		query: { id },
		body: { message },
		session: { user },
	} = req;
	if (!id) return;
	const strId = id.toString();
	const chat = await client.message.create({
		data: {
			chat: message,
			user: { connect: { id: user?.id } },
			stream: { connect: { Id: +strId } },
		},
	});
	res.json({ success: true });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['POST'], func: handler, inspection: false })
);
