import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Input from '@/components/input';
import Button from '@/components/button';
import TextArea from '@/components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@/libs/client/useMutation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Stream } from '@prisma/client';

interface CreateForm {
	name: string;
	price: string;
	description: string;
}

interface CreateResult {
	success: boolean;
	stream: Stream;
}

const Create: NextPage = () => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<CreateForm>();
	const [sendStream, { loading, data }] =
		useMutation<CreateResult>('/api/streams');
	const onValid = (validData: CreateForm) => {
		if (!loading) {
			sendStream(validData);
		}
	};
	useEffect(() => {
		if (data && data.success) {
			router.push(`/streams/${data.stream.Id}`);
		}
	}, [data, router]);
	return (
		<Layout canGoBack={true}>
			<form
				onSubmit={handleSubmit(onValid)}
				className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'
			>
				<Input
					kind='text'
					label='상품 이름'
					name='text'
					placeholder='12억배 줌 카메라가 달린 갈락시 S8200'
					register={register('name', { required: '제품의 이름을 적어주세요' })}
					required
				/>
				<Input
					kind='price'
					label='희망 상품금액'
					name='price'
					placeholder='12,999'
					register={register('price', {
						required: '가격표 떨어졌슈',
						valueAsNumber: true,
					})}
					required
				/>
				<TextArea
					label='구매자의 심금을 울릴 4마디 랩가사'
					name='description'
					placeholder='이해를 두 번 해도 일만나면 오해'
					rows={4}
					register={register('description', {
						required: '제품에 대한 설명을 작성해주세요',
					})}
					required
				></TextArea>
				<Button
					name={
						loading ? '상품보고 지려버리는 중' : '나의 지리는 상품을 보여주기'
					}
				></Button>
			</form>
		</Layout>
	);
};

export default Create;
