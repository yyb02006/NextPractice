import type { NextPage } from 'next';

const Write: NextPage = () => {
	return (
		<form className='bg-[#101010] text-[#fafafa] h-full min-h-screen font-SCoreDream px-4 py-12'>
			<textarea
				rows={4}
				id='description'
				className='appearance-none border-transparent mt-2 text-gray-600 w-full bg-gray-200 rounded-sm placeholder-gray-400 outline-none focus:border-green-600 focus:ring-[2px] focus:ring-green-600'
				placeholder='난 내가 누군지 몰라 이세상을 헤맬 뿐야'
			/>
			<button className='mt-4 w-full bg-green-600 rounded-sm py-2 hover:bg-emerald-500 font-medium focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-color duration-100'>
				쥐-마켓 쥐-식인 믿어보기
			</button>
		</form>
	);
};

export default Write;
