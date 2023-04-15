import { useCallback, useEffect, useRef, useState } from 'react';

// interface promProps {
// 	price: number;
// 	item: string;
// 	num: number;
// }

// const prom = async ({ price, item, num }: promProps) => {
// 	const wait = (time: number): Promise<unknown> =>
// 		new Promise((resolve) => setTimeout(resolve, time));
// 	console.log(`${price}원짜리 ${item}을(를) ${num}개 주문했습니다.`);

// 	(async function () {
// 		await wait(1000);
// 		console.log('계산중입니다.');
// 	})();
// 	const total = price * num;
// 	await wait(2000);
// 	console.log(`${total}원 결제되었습니다.`);
// 	const myfunc = (function () {
// 		return 4;
// 	})();
// 	console.log(myfunc);
// };

// const state = () => {
// 	const [test, setTest] = useState(0);
// 	console.log('beforeEvent' + test);
// 	function onTest() {
// 		if (test < 2) {
// 			setTest((p) => p + 1);
// 			console.log('Event' + test);
// 		}
// 	}
// 	console.log('afterEvent' + test);
// };

export const useObserver = (
	onIntersect: any,
	threshold = 1.0,
	root = null,
	rootMargin = '0px'
) => {
	const [ref, setRef] = useState<HTMLDivElement | null>(null);

	const checkIntersect: IntersectionObserverCallback = useCallback(
		([entry], observer) => {
			if (entry.isIntersecting) {
				onIntersect(entry, observer);
			}
		},
		[]
	);
	console.log(ref);

	useEffect(() => {
		let observer: any;

		if (ref) {
			observer = new IntersectionObserver(checkIntersect, {
				root,
				rootMargin,
				threshold,
			});
			observer.observe(ref);
		}

		return () => observer && observer.disconnect();
	}, [ref, rootMargin, threshold, checkIntersect, root]);

	return setRef;
};

export default function Test() {
	// prom({ item: '콜라', num: 2, price: 2000 });
	const [page, setPage] = useState(1);

	const onIntersect = (entry: any, observer: any) => {
		setPage((prev) => prev + 1);
	};

	const infRef = useObserver(onIntersect, 0.1);

	return <div ref={infRef} className='w-40 h-40 bg-indigo-500'></div>;
}
