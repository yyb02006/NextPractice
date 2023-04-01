import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	console.log(req.session.user);
	const profile = await client.user.findUnique({
		where: { id: req.session.user?.id },
	});
	res.json({
		success: true,
		/**profile = success:true, profile:{id:14,name:14,createAt:141414, ...etc}
		 * ...profile = success:true,id:14,name:14,createAt:14, ...etc
		 */
		profile,
	});
}

export default apiSessionWrapper(
	handlerWrapper({ method: 'GET', func: handler })
);
