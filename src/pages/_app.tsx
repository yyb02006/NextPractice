import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { SWRConfig } from 'swr';
import { clsNm } from '@/libs/client/utils';
import IsLogin from '@/components/IsLogin';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--font-roboto',
});

// const UseUser = () => {
// 	const { user } = useUser();
// 	return null;
// };

export default function App({ Component, pageProps }: AppProps) {
	// useUser를 이쪽에다가 사용하면 SWRConfig보다 이전에 작동하기 떄문에 실행이 안됨.
	// useSWR을 단독으로 fetch를 인자로 주고 실행시키면 가능할듯(아마도).
	return (
		<SWRConfig
			value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
		>
			<main className={clsNm(roboto.variable, `w-full max-w-lg mx-auto`)}>
				<Component {...pageProps} />
				<IsLogin />
			</main>
		</SWRConfig>
	);
}
