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
	const strPostId = id.toString();
	const existWonder = await client.wonderToo.findFirst({
		where: { postId: +strPostId, userId: user?.id },
	});
	if (existWonder) {
		await client.wonderToo.delete({
			where: { Id: existWonder.Id },
		});
	}
	if (!existWonder) {
		await client.wonderToo.create({
			data: {
				post: { connect: { Id: +strPostId } },
				user: { connect: { id: user?.id } },
			},
		});
	}
	res.json({ success: true });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['POST'], func: handler })
);
