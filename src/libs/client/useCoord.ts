import { useEffect, useState } from 'react';

interface UserCoordsStates {
	latitude: number | null;
	longitude: number | null;
}

export default function useCoords() {
	const [coords, setcoords] = useState<UserCoordsStates>({
		latitude: null,
		longitude: null,
	});
	const onSuccess = (coords: GeolocationPosition) => {
		setcoords({
			latitude: coords.coords.latitude,
			longitude: coords.coords.longitude,
		});
	};
	/**pre-rendering 때문에 서버에서 useCoords가 서버에서 실행 될 때는 useEffect를 실행하지 않음
	 * (default값(static)들로 html만 만들기 때문에)
	 * 때문에 null null이 한 번 전달 됐다가 클라이언트 사이드에서 실행 되는 순간
	 * 제대로된 값이 찍히는 것임 이것이 nullnull valuevalue가 나타나는 이유.
	 * */
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onSuccess);
	}, []);
	return coords;
}
