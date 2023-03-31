import { NextApiRequest, NextApiResponse } from 'next';

export interface ResType {
	success: boolean;
	[key: string]: any;
}

export default function handler(
	method: 'GET' | 'POST' | 'DELETE' | 'PUT',
	func: (req: NextApiRequest, res: NextApiResponse) => void
) {
	return async function (req: NextApiRequest, res: NextApiResponse) {
		if (req.method != method) {
			res.status(405).end();
		} else {
			try {
				/**func에 비동기적 요소가 있을 경우 catch로 넘어가면 안되기 때문에 await 사용 */
				await func(req, res);
			} catch (err) {
				console.log(err);
				res.status(500).json(err);
			}
		}
	};
}
