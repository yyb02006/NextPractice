import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handler from '@/libs/server/withHandler';

async function handlerAction(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.body);
	res.status(200).end();
}

export default handler('POST', handlerAction);
