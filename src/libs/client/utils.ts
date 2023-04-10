export function clsNm(...classname: string[]) {
	return classname.join(' ');
}

export function imageUrl(imageId: string, kind: 'public' | 'avatar') {
	return `https://imagedelivery.net/LE3yaWt_BFNQZjNv82UjSw/${imageId}/${kind}`;
}
