import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	//세션이 없는 상태에서 새로고침을 하면 req.session이 없는 상태로 findUnique를 하게 되는데,
	//프리즈마는 이렇게 하면 '유니크형식의 아규먼트에는 Id가 되었던, phone이 되었던, email이 되었던
	//하나 이상의 아규먼트가 필요하다'고 에러가 나온다. where다음에 아무것도 넣지 않은 상태로 인정되어서 그런듯.
	const profile = await client.user.findUnique({
		where: { id: req?.session.user?.id },
	});

	if (profile) {
		res.json({
			success: true,
			/**profile = success:true, profile:{id:14,name:14,createAt:141414, ...etc}
			 * ...profile = success:true,id:14,name:14,createAt:14, ...etc
			 */
			profile,
		});
	} else if (!profile) {
		res.json({ success: false });
	}
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['GET'], func: handler })
);
