import { NextApiRequest, NextApiResponse } from 'next';

/**res로 json을 넣어줄 때 내부에 success나 기타 등등의 키값이 있으려면 타입지정 필*/
export interface ResType {
	success: boolean;
	[key: string]: any;
}

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

/**예를 들어 매개변수로 boolean값을 넣어서 아규먼트로 true, false밖에 못 적게 할 바에는
 * 객체로 묶어서 설정값으로 인자를 받는 것이 훨씬 크-린하다
 */
interface Config {
	methods: Method[];
	func: (req: NextApiRequest, res: NextApiResponse) => void;
	inspection?: boolean;
}

export default function handlerWrapper({
	methods,
	func,
	inspection = true,
}: Config) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (req.method && !methods.includes(req.method as Method)) {
			return res.status(405).end();
		}
		if (inspection && !req.session.user) {
			return res.status(401).json({ success: false });
		}
		try {
			/**func에 비동기적 요소가 있을 경우 catch로 넘어가면 안되기 때문에 await 사용 */
			await func(req, res);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	};
}
