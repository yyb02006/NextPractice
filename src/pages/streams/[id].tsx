import type { NextPage } from 'next';
import Layout from '@/components/layout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from '@/libs/client/useMutation';
import { Stream } from '@prisma/client';
import useUser from '@/libs/client/useUser';

interface MessageWithUser {
	Id: number;
	chat: string;
	user: { id: number; name: string; avatar: string | null };
}

interface StreamWithMessage extends Stream {
	user: { name: string };
	message: MessageWithUser[];
}

interface StreamResponse {
	success: boolean;
	stream: StreamWithMessage;
}

interface ChatForm {
	message: string;
}

const StreamDetail: NextPage = () => {
	const { user } = useUser();
	const router = useRouter();
	const {
		data: streamData,
		isLoading,
		mutate,
	} = useSWR<StreamResponse>(
		router.query.id ? `/api/streams/${router.query.id}` : null,
		{ refreshInterval: 1000 }
	);

	const [sendChat, { loading, data: sendChatData }] = useMutation(
		`/api/streams/${router.query.id}/chats`
	);
	const { register, handleSubmit, reset } = useForm<ChatForm>();
	const onValid = (validData: ChatForm) => {
		if (loading) return;
		mutate(
			(prev) =>
				prev && {
					...prev,
					stream: {
						...prev.stream,
						message: [
							...prev.stream.message,
							{
								Id: 3,
								chat: validData.message,
								user: { id: user.id, name: user.name, avatar: user.avatar },
							},
						],
					},
				},
			false
		);
		sendChat(validData);
		reset();
	};
	return (
		<Layout
			canGoBack={true}
			hasTabBar={true}
			seoTitle={
				streamData?.stream.name ? streamData?.stream.name : '라이브 커머스'
			}
		>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream py-12'>
				<div className='w-full'>
					<div className='relative w-full bg-indigo-500 aspect-video rounded-sm'>
						<iframe
							className='w-full aspect-video'
							src='https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/iframe'
							allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
							allowFullScreen={true}
						></iframe>
						<div className='absolute py-2 px-3 font-normal text-sm shadow-md shadow-green-700 bg-green-500 bottom-3 right-4 flex rounded-sm justify-center, items-center'>
							\ {streamData?.stream.price}
						</div>
					</div>
					<div className='px-4'>
						<h3 className='mt-3 font-GmarketSans font-bold text-xl text-gray-200'>
							{streamData?.stream.name}
						</h3>
						<p className='mt-6 text-sm text-gray-300'>
							{streamData?.stream.description}
						</p>
						<div className='mt-6 font-medium text-xs text-gray-600 overflow-x-scroll scrollbar-hide'>
							<span className='text-gray-400'>
								Secret Key <span className='text-red-400'>(공유 금지)</span>
							</span>
							<p className='mt-1'>
								URL:
								{streamData?.stream.cloudflareKey
									? streamData?.stream.cloudflareKey
									: null}
							</p>
							<p>
								KEY:
								{streamData?.stream.cloudflareKey
									? streamData?.stream.cloudflareKey
									: null}
							</p>
						</div>
						<div className='mt-4 flex justify-between font-normal text-xs text-gray-400'>
							<span>{streamData?.stream.user.name} 님의 라이브</span>
							<span>2시간째 방송중</span>
						</div>
					</div>
				</div>
				<div className='mt-10 h-[40vh] overflow-y-scroll scrollbar-hide'>
					{streamData?.stream.message.map((message) =>
						message.user.id === streamData.stream.userId ? (
							<div
								key={message.Id}
								className='flex flex-row-reverse justify-start items-start gap-2 mt-4 bg-[#1a1a1a] p-4'
							>
								<div className='bg-pink-400 min-w-[40px] aspect-square rounded-md' />
								<div>
									<div className='font-normal text-xs text-right text-gray-400'>
										{message.user.name}
									</div>
									<div className='font-SCoreDream pl-20 font-light text-sm leading-6 text-gray-200 break-keep'>
										{message.chat}
									</div>
								</div>
							</div>
						) : (
							<div
								key={message.Id}
								className='flex items-start gap-2 mt-4 bg-[#1a1a1a] p-4'
							>
								<div className='bg-pink-400 min-w-[40px] aspect-square rounded-md' />
								<div>
									<div className='font-normal text-xs text-gray-400'>
										{message.user.name}
									</div>
									<div className='font-SCoreDream font-light text-sm leading-6 text-gray-200 w-full break-keep'>
										{message.chat}
									</div>
								</div>
							</div>
						)
					)}
				</div>
				<div className='fixed bottom-32 left-0 w-full mx-auto px-4 '>
					<form
						onSubmit={handleSubmit(onValid)}
						className='relative flex items-center '
					>
						<input
							type='text'
							{...register('message', { required: true })}
							className='appearance-none shadow-xl shadow-[#101010] pl-5 pr-14 text-gray-600 w-full bg-gray-200 rounded-full border-0 placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
						/>
						<button className='absolute pl-2 pr-4 h-full flex justify-center items-center text-2xl font-bold text-green-600 right-0 rounded-full focus:outline-none'>
							<span>&rarr;</span>
						</button>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default StreamDetail;
