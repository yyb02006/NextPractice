import { withIronSessionApiRoute as ironSession } from 'iron-session/next';
import { NextApiHandler } from 'next';

declare module 'iron-session' {
	interface IronSessionData {
		user?: {
			id: number;
		};
	}
}

const cookieOptions = {
	cookieName: 'ironCookie',
	password: process.env.IRON_SESSION_PASS!,
};

export function apiSessionWrapper(fn: any) {
	return ironSession(fn, cookieOptions);
}
