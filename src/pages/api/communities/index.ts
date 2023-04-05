import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		session: { user },
	} = req;
	const posts = await client.post.findMany({
		include: {
			user: { select: { name: true } },
			_count: { select: { wonderToo: true, answer: true } },
		},
	});
	const userWonderToo = await client.wonderToo.findMany({
		where: { userId: user?.id },
	});
	const newPosts = posts.map((post) => ({
		...post,
		isWonderToo: Boolean(userWonderToo.find((d) => d.postId === post.Id)),
	}));

	/**
	 * posts를 map이나 forEach돌리면 posts 각각의 원소들에게 isWonderToo를 심는 것이 가능함
	 * 단, map은 map이 완전히 끝난 이후 다음 스크립트를 실행시키지만 forEach는 실행만 되면
	 * 다음 스크립트를 실행시키기 때문에 제대로 값을 전달받기 어려움
	 * */
	res.json({ success: true, newPosts });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler })
);
