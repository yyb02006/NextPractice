import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { SWRConfig } from 'swr';
import { clsNm } from '@/libs/client/utils';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--font-roboto',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}
		>
			<main className={clsNm(roboto.variable, `w-full max-w-lg mx-auto`)}>
				<Component {...pageProps} />
			</main>
		</SWRConfig>
	);
}
