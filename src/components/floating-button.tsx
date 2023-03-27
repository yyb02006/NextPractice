import { clsNm } from '@/libs/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

/**svg가 들어가는 버튼의 경우 children으로 해결 가능 */
interface FloatingButtonProps {
	children: React.ReactNode;
	href: string;
}

export default function FloatingButton({
	children,
	href,
}: FloatingButtonProps) {
	return (
		<Link href={href}>
			<span className='fixed flex bottom-32 justify-center items-center shadow-md shadow-green-800 bg-green-600 w-12 aspect-square rounded-full right-6 hover:bg-emerald-500 transition-colors'>
				{children}
			</span>
		</Link>
	);
}
