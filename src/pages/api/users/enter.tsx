import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(req.body);
	req.method === 'POST' ? res.status(200).end() : res.status(405).end();
}
