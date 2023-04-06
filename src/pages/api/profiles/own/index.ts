import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	const {
		session: { user },
		body: { valid, prev },
	} = req;

	/**이 코드의 문제점은 한 번의 res가 실행되면 코드가 끝난다는 것.
	 * 맞는 이메일과 틀린 핸드폰 번호가 둘 다 들어오면 이메일은 들어가지만 핸드폰 번호는 튕긴다는 것.
	 * 반대의 경우는 핸드폰 번호도 안 들어가고 이메일도 튕긴다는 것.
	 * 이메일이 틀린 순간ㅡ 핸드폰이 들렸는 지 검사결과를 알 수 없기 때문에
	 * 이메일과 핸드폰번호의 validation 여부를 동시에 response할 수 없다는 것
	 * */
	if (valid.email) {
		const alreadyExists = await client.user.findUnique({
			where: { email: valid.email },
			select: { id: true },
		});
		if (alreadyExists && alreadyExists.id !== user?.id) {
			return res.json({ success: false, error: '이메일 이미 있슴!' });
		}
		await client.user.update({
			where: { id: user?.id },
			data: { email: valid.email },
		});
	}
	if (valid.phone) {
		const alreadyExists = await client.user.findUnique({
			where: { phone: valid.phone },
			select: { id: true },
		});
		if (alreadyExists && alreadyExists.id !== user?.id) {
			return res.json({ success: false, error: '폰남바 이미 있슴!' });
		}
		await client.user.update({
			where: { id: user?.id },
			data: { phone: valid.phone },
		});
	}
	if (valid.name) {
		await client.user.update({
			where: { id: user?.id },
			data: { name: valid.name },
		});
	}
	res.json({ success: true });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['POST'], func: handler })
);
