import React from 'react';
import Link from 'next/link';

interface ChatRoomProps {
	id: number;
	name: string;
	text: string;
	children: React.ReactNode;
}

export default function ChatRoom({ id, name, text, children }: ChatRoomProps) {
	return (
		<Link href={`/chats/${id}`}>
			<div className='flex items-center gap-2 bg-[#1a1a1a] p-4 hover:bg-[#2a2a2a]'>
				<div className='bg-pink-400 w-12 aspect-square rounded-md'>
					{children}
				</div>
				<div>
					<p className='font-medium text-base text-gray-200'>{name}</p>
					<p className='font-medium text-xs text-gray-400'>{text}</p>
				</div>
			</div>
		</Link>
	);
}
