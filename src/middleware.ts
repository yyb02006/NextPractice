import { getIronSession } from 'iron-session/edge';
import {
	NextFetchEvent,
	NextRequest,
	NextResponse,
	userAgent,
} from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	const { isBot } = userAgent(req);
	if (isBot) {
		//403에러페이지 리다이렉트
	}
	if (!req.nextUrl.pathname.startsWith('/enter')) {
		if (!req.cookies.has('ironCookie')) {
			const url = req.nextUrl.clone();
			url.pathname = '/enter';
			return NextResponse.redirect(url);
		} else {
			/**ironSession 요청하고 시작*/
			const res = NextResponse.next();
			const session = await getIronSession(req, res, {
				cookieName: 'ironCookie',
				password: process.env.IRON_SESSION_PASS!,
				cookieOptions: {
					secure: process.env.NODE_ENV === 'production',
				},
			});
			console.log(session);
			/**자 이제 어떻게 db요청을 날리지? */
		}
	}
}

/**
 * 미들웨어는 모든 리퀘스트요청에 대해 작동하는데, 이 리퀘스트란 것이 엄청나게 많이 발생한다
 * 셋업을 위해 프레임워크에서 /_next/static/chunks/main.js, /_next/static/chunks/pages/_app.js같은 경로로도
 * 요청을 날리기 때문에 미들웨어는 이 모든 요청에 대해 실행하게 되고 그 것을 방지하기 위해 아래 config가 필요
 */
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
