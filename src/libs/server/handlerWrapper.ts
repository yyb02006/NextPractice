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
		/**세션이 없는 상황에서 enter화면으로 사용자를 내보낼 수 있는 장치 */
		if (inspection && !req.session.user) {
			return res.status(401).json({ success: false });
		}
		try {
			/**why use await? */
			await func(req, res);
		} catch (err) {
			console.log(err);
			//여기에서 잡히는 에러 중 하나는 own api에서 세션이 없을 때 findUnique가 일으키는 에러가 있음.
			//그 에러가 useUser로 전달되면 로그인 오류가 하나 생김 지금은 위의 오류를 먼저 발생시키는 것으로 해결
			res.status(500).json(err);
		}
	};
}
