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
		/**세션의 유무를 검증해서 enter화면으로 사용자를 내보내거나 응답을 주지 않을 수 있는 장치
		 * headers.referer는 현재페이지를 요청한 이전페이지의 uri정보를 담고 있다. 즉, 어디로부터 왔는지. 이건 여기선 쓸 수 없고,
		 * 대신 useUser로부터 path정보를 담아서 받고, 이 path정보로 어떤 페이지에서 보낸 요청인지 판별하여
		 * /enter에서 날린 요청이면 에러를 보내지 않는다.
		 */
		if (inspection && !req.session.user) {
			if (req.query.path === '/enter') {
				return res.end();
			} else {
				// console.log(req.url); : 지금 이 리퀘스트가 전달된 url
				return res.status(401).json({ success: false });
			}
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
