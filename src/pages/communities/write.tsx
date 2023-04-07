import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import TextArea from '@/components/textarea';
import useMutation from '@/libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RadioButton from '@/components/radioButton';
import useCoords from '@/libs/client/useCoord';

interface WriteForm {
	question: string;
	category: string;
}

interface WriteResult {
	success: boolean;
	post: Post;
}

const Write: NextPage = () => {
	const router = useRouter();
	const { latitude, longitude } = useCoords();
	const [category, setCategory] = useState('');
	const [buttonValues, setButtonValues] = useState([
		'콤-퓨타',
		'만화책',
		'배달음식',
		'돗자리',
		'전자제품',
		'키보드',
		'아이패드',
		'에어팟',
	]);
	const [sendWrite, { loading, data }] = useMutation<WriteResult>(
		'/api/communities/write'
	);
	const { register, handleSubmit } = useForm<WriteForm>();
	const onValid = (validData: WriteForm) => {
		if (loading || !category) return;
		sendWrite({ ...validData, category, latitude, longitude });
	};
	useEffect(() => {
		if (data?.post && data?.success) {
			router.push(`/communities/${data.post.Id}`);
		}
	}, [data, router]);
	return (
		<Layout canGoBack={true}>
			<form
				onSubmit={handleSubmit(onValid)}
				className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'
			>
				<RadioButton
					title='카테고리'
					buttonValues={buttonValues}
					category={category}
					setCategory={setCategory}
				></RadioButton>
				<TextArea
					label='궁금한 내용을 적어주십사와용'
					name='question'
					placeholder='난 내가 누군지 몰라 이 세상을 헤맬뿐야'
					rows={4}
					register={register('question', {
						required: '질문지를 작성해주say-yo!',
					})}
					required
				></TextArea>
				<Button
					name={loading ? '쥐-식인 논문 제출중...' : '쥐-마켓 쥐-식인 믿어보기'}
				></Button>
			</form>
		</Layout>
	);
};

export default Write;
