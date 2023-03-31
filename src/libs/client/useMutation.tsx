import { useState } from 'react';

interface UseMutationState<T> {
	loading: boolean;
	data?: T;
	error?: object;
}

type UseMutation<T> = [(data: unknown) => void, UseMutationState<T>];

export default function useMutation<T = unknown>(url: string): UseMutation<T> {
	const [mutationState, setMutationState] = useState<UseMutationState<T>>({
		loading: false,
		data: undefined,
		error: undefined,
	});
	const mutation = (data: unknown) => {
		setMutationState((p) => ({ ...p, loading: true }));
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			/**headers프로퍼티에 Content-Type을 json으로 설정해주면 {"key":"value"}와 같이 json string형식으로 날아가던 데이터가
			 * {key:value}형식으로 날아감 때문에 이렇게 해야 서버에서 req.body.key로 데이터를 받을 수 있음.
			 * express에서 res.json()으로 던진 데이터가 {key:value}형식이고, axios에서 headers에 content-type를 지정하는 이유와 같음.
			 */
			headers: {
				'Content-Type': 'application/json',
			},
		})
			/**then메소드에서 에로우펑션 쓸 때는 return에 주의하자 */
			.then((res) => res.json().catch(() => {}))
			.then((data) => setMutationState((p) => ({ ...p, data: data })))
			.catch((err) => setMutationState((p) => ({ ...p, error: err })))
			.finally(() => {
				setMutationState((p) => ({ ...p, loading: false }));
			});
	};
	return [mutation, { ...mutationState }];
}
