import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	req.method === 'POST' ? res.status(200).end() : res.status(405).end();
}
