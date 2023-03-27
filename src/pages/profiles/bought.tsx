import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Goods from '@/components/goods';

const Bought: NextPage = () => {
	return (
		<Layout canGoBack={true} hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-Roboto pt-12 px-4 space-y-4'>
				{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
					<div key={i}>
						<Goods
							color='Black'
							comment={5}
							id={1}
							like={3}
							price={440}
							title='Galaxy S100'
						>
							<svg
								className='w-full h-full'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
								></path>
							</svg>
						</Goods>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default Bought;
