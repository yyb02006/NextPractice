import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	//iron-session의 주요 기능은 실제 기능을 하는 함수가ironSessionApiRoute내부에 있기만 하다면
	//req를 session으로 한 번 감싸서 req.session.*으로 데이터를 보호해서 전달할 수 있다는 것.
	const { token } = req.body;
	const existToken = await client.token.findUnique({
		where: { payload: token },
		//이거시 무엇이냐면, token테이블의 userId값이 조인된 테이블에서 userId가 참조하는 Id값을 갖는 행의 정보를 가져온다는 것.
		include: { user: true },
	});
	//existToken이 없을 경우 return해버리면 existToken이 없는 상태로는 return이후의 열들이 실행될 수 없고,
	//이 아래에서 사용되는 existToken변수 들은 존재하지 않을 수 없기 때문에
	//existToken.userId가 오류를 일으키지 않게 된다.
	if (!existToken) return res.status(404).end();
	if (existToken)
		req.session.user = {
			id: existToken.userId,
		};
	await req.session.save();
	await client.token.deleteMany({ where: { userId: existToken.userId } });
	res.json({ success: true });
}

export default apiSessionWrapper(
	handlerWrapper({ method: 'POST', func: handler, inspection: false })
);
