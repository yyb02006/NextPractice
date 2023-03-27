import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import TextArea from '@/components/textarea';

const Write: NextPage = () => {
	return (
		<Layout canGoBack={true}>
			<form className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12 space-y-4'>
				<TextArea
					label='궁금한 것이 있나요?'
					name='question'
					placeholder='난 내가 누군지 몰라 이 세상을 헤맬뿐야'
					rows={4}
				></TextArea>
				<Button name='쥐-마켓 쥐-식인 믿어보기'></Button>
			</form>
		</Layout>
	);
};

export default Write;
