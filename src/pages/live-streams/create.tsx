import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Input from '@/components/input';
import Button from '@/components/button';
import TextArea from '@/components/textarea';

const Create: NextPage = () => {
	return (
		<Layout canGoBack={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'>
				<Input
					kind='text'
					label='상품 이름'
					name='text'
					placeholder='12억배 줌 카메라가 달린 갈락시 S8200'
					required
				/>
				<Input
					kind='price'
					label='희망 상품금액'
					name='price'
					placeholder='12,999'
					required
				/>
				<TextArea
					label='구매자의 심금을 울릴 4마디 랩가사'
					name='description'
					placeholder='이해를 두 번 해도 일만나면 오해'
					rows={4}
				></TextArea>
				<Button name='나의 지리는 상품을 보여주기'></Button>
			</div>
		</Layout>
	);
};

export default Create;