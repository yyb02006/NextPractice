import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handler, { ResType } from '@/libs/server/handler';
import { withIronSessionApiRoute as ironSession } from 'iron-session/next';

async function handlerAction(
	req: NextApiRequest,
	res: NextApiResponse<ResType>
) {
	//iron-session의 주요 기능은 실제 기능을 하는 함수가ironSessionApiRoute내부에 있기만 하다면
	//req를 session으로 한 번 감싸서 req.session.*으로 데이터를 보호해서 전달할 수 있다는 것.
	const { token } = req.body;
	const existToken = await client.token.findUnique({
		where: { payload: token },
		//이거시 무엇이냐면, token테이블의 userId값이 조인된 테이블에서 userId가 참조하는 Id값을 갖는 행의 정보를 가져온다는 것.
		include: { user: true },
	});
	if (!existToken) res.status(404).end();
	req.session.user = {
		id: existToken?.userId,
	};
	await req.session.save();
	res.status(200).end();
}

export default ironSession(handler('POST', handlerAction), {
	cookieName: 'ironCookie',
	password: process.env.IRON_SESSION_PASS!,
});
