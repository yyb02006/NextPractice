import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

/**특히 enter페이지의 useUser는 SSR을 이용해서 사용자에게 로그인 폼을 보여주지 않고 리다이렉션하는 것이 중요*/

export default function useUser() {
	const { data, error, isLoading } = useSWR('/api/users/own');
	const router = useRouter();
	console.log(1111);

	useEffect(() => {
		/***** data와 !data.success를 묶어서 조건문으로 사용하는이유?
		 *
		 * useEffect는 의존성배열을 가지고 있어도 첫 렌더링을 수행한다. 리다이렉션은 success가 false인 상태에서 일어나야 하는데,
		 * !data.success의 값은 data가 undefined일 시 마찬가지로 undefined. 즉, API가 호출되기 전에는 리다이렉션이 일어난다는 것.
		 * 이것을 방지하기 위해 data를 조건문에 and로 추가하여 API호출 전에는 false, true상태로,
		 * 정상적으로 호출된 후에는 true, false상태로, success가 false라면 true,true가 되어 리다이렉션이 일어난다.*/
		if (data && !data.success && router.pathname !== '/enter') {
			router.replace('/enter');
			return;
		}
		if (data && data.success && router.pathname === '/enter') {
			router.replace('/');
			return;
		}
	}, [data, router]);
	//로딩때는 data가 없으므로 이럴때는 옵셔널체이닝
	return { user: data?.profile, isLoading: isLoading };
}
