import FloatingButton from '@/components/floating-button';
import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Goods from '@/components/goods';
import useUser from '@/libs/client/useUser';
import useSWR from 'swr';
import { Product } from '@prisma/client';

interface ProductProps {
	success: boolean;
	products: Product[];
}

const Home: NextPage = () => {
	/**useLayoutEffect에 useUser를 퍼리하는 것은 useUser에서 처리할 값이 없는 상태로 실행되어야 하기 때문에 불가능*/
	const { user, isLoading } = useUser();
	const {
		data: productData,
		error,
		isLoading: productLoading,
	} = useSWR<ProductProps>('/api/products');
	console.log(productData);
	return (
		<>
			{user ? (
				<Layout title='집구석' hasTabBar={true}>
					<div className='bg-[#101010] text-[#fafafa] font-Roboto pt-12 px-4 space-y-4'>
						{productData?.products?.map((product) => (
							<Goods
								color='Black'
								comment={5}
								id={product.Id}
								key={product.Id}
								like={3}
								price={product.price}
								title={product.name}
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
						))}
						<FloatingButton href='/details/upload'>
							<svg
								className='h-10 w-10'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M12 6v6m0 0v6m0-6h6m-6 0H6'
								/>
							</svg>
						</FloatingButton>
					</div>
				</Layout>
			) : null}
		</>
	);
};

export default Home;
