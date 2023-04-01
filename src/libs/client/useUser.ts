import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useUser() {
	const [user, setUser] = useState();
	const router = useRouter();
	useEffect(() => {
		fetch('/api/users/own')
			.then((res) => res.json())
			.then((data) => {
				if (!data.success) {
					return router.replace('/enter');
				}
				if (data.success) {
					setUser(data.profile);
				}
			});
	}, [router]);
	return user;
}
