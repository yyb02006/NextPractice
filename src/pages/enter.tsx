import { useState } from 'react';
import { clsNm } from '@/libs/client/utils';
import Input from '@/components/input';
import Button from '@/components/button';
import { FieldErrors, useForm } from 'react-hook-form';
import useMutation from '@/libs/client/useMutation';

interface EnterForm {
	phone: string;
	email: string;
}

interface TokenForm {
	token: string;
}

interface useMutationResult {
	success: boolean;
}

export default function Enter() {
	const [send, { loading, data, error }] =
		useMutation<useMutationResult>('/api/users/enter');
	const [
		sendToken,
		{ loading: tokenLoading, data: tokenData, error: tokenError },
	] = useMutation<useMutationResult>('/api/users/confirm');
	const { register, reset, handleSubmit } = useForm<EnterForm>();
	const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
		useForm<TokenForm>();
	const [method, setMethod] = useState<'email' | 'phone'>('email');
	const onEmailClick = () => {
		reset();
		setMethod('email');
	};
	const onPhoneClick = () => {
		reset();
		setMethod('phone');
	};

	const onValid = (validData: EnterForm) => {
		if (loading) return;
		send(validData);
	};
	const onTokenValid = (validData: TokenForm) => {
		if (loading) return;
		sendToken(validData);
	};
	console.log(loading, data, error);
	return (
		<div className='bg-[#101010] text-[#fafafa] border-[#fafafa] overflow-hidden h-screen font-SCoreDream'>
			<div className='font-GmarketSans flex flex-col items-center -space-y-2 mt-14 mb-14'>
				<span className='font-bold text-[46px]'>
					실험용<span className='text-green-500'>쥐</span>-마켓
				</span>
				<span className='font-bold text-2xl'>
					자, 로그인을 해보도록 하<span className='text-green-500'>쥐</span>
				</span>
			</div>
			<div className='px-4'>
				{data?.success ? (
					<>
						<div className='flex flex-col items-center space-y-10'>
							{method === 'email' ? (
								<h5 className='text-gray-500 text-sm font-medium'>
									이메일을 확인 해보시<span className='text-green-700'>쥐</span>
								</h5>
							) : null}
							{method === 'phone' ? (
								<h5 className='text-gray-500 text-sm font-medium'>
									핸드폰을 확인 해보시<span className='text-green-700'>쥐</span>
								</h5>
							) : null}
						</div>
						<form
							onSubmit={tokenHandleSubmit(onTokenValid)}
							className='flex flex-col item space-y-4 mt-4'
						>
							<Input
								kind='etc'
								label='어이, 암호는?'
								name='token'
								placeholder=''
								register={tokenRegister('token', {
									required: '이-메일을 넣으야지!',
								})}
								required
								type='number'
							/>
							{loading ? (
								<Button name='ㅎㅎ잠만여'></Button>
							) : (
								<Button name='암호를 대라'></Button>
							)}
						</form>
					</>
				) : (
					<>
						<div className='flex flex-col items-center space-y-10'>
							<h5 className='text-gray-500 text-sm font-medium'>
								우린 두 가지만 제공하<span className='text-green-700'>쥐</span>
							</h5>
							<div className='grid grid-cols-2 w-full font-medium'>
								<button
									onClick={onEmailClick}
									className={clsNm(
										'border-b-2 pb-3 border-gray-400 transition-color duration-200',
										method === 'email' ? ' border-green-500 text-green-500' : ''
									)}
								>
									이-메일
								</button>
								<button
									onClick={onPhoneClick}
									className={clsNm(
										'border-b-2 pb-3 border-gray-400 transition-color duration-200',
										method === 'phone' ? ' border-green-500 text-green-500' : ''
									)}
								>
									님폰없?
								</button>
							</div>
						</div>
						<form
							onSubmit={handleSubmit(onValid)}
							className='flex flex-col item space-y-4 mt-4'
						>
							{method === 'email' ? (
								<Input
									kind='email'
									label='이-메일 어드레-쓰'
									name='email'
									placeholder='abcd@efg.com'
									register={register('email', {
										required: '이-메일을 넣으야지!',
									})}
									required
								/>
							) : null}
							{method === 'phone' ? (
								<Input
									kind='phone'
									label='One call Away - Charlie puth'
									name='phone'
									placeholder='010-5555-5555'
									register={register('phone', { required: '님 폰 진짜 없?' })}
									required
								/>
							) : null}
							{method === 'email' ? (
								loading ? (
									<Button name='뭐 잠깐 하는중'></Button>
								) : (
									<Button name='이메일 로그인'></Button>
								)
							) : null}
							{method === 'phone' ? (
								loading ? (
									<Button name='나...폰...!'></Button>
								) : (
									<Button name='나폰있!'></Button>
								)
							) : null}
						</form>
					</>
				)}
				<div>
					<div className='relative overflow-hidden'>
						<div className='absolute border-b-[1px] w-full top-6 border-gray-500' />
						<div className='relative text-center mt-4 font-normal text-xs text-gray-300'>
							<span className='bg-[#101010] px-2'>
								어떻게든 로그인 시도해보기
							</span>
						</div>
					</div>
					<div className='grid grid-cols-2 mt-4 gap-4'>
						<button className='flex justify-center items-center py-2 outline outline-1 outline-gray-500 rounded-md hover:outline-green-700 hover:outline-2 hover:bg-[#202020] transition-color duration-100'>
							<svg
								className='w-6 aspect-square'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
							</svg>
						</button>
						<button className='flex justify-center items-center py-2 outline outline-1 outline-gray-500 rounded-md hover:outline-green-700 hover:outline-2 hover:bg-[#202020] transition-color duration-100'>
							<svg
								className='w-6 aspect-square'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
