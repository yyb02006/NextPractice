import FloatingButton from '@/components/floating-button';
import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Goods from '@/components/goods';
import useSWR, { SWRConfig } from 'swr';
import { Product } from '@prisma/client';
import { imageUrl } from '@/libs/client/utils';
import client from '@/libs/server/client';

export interface ProductWithCount extends Product {
	_count: { Favorite: number };
}

interface ProductProps {
	success: boolean;
	products: ProductWithCount[];
}

const Home: NextPage = () => {
	const {
		data: productData,
		error,
		isLoading: productLoading,
	} = useSWR<ProductProps>('/api/products');
	return (
		<Layout title='집구석' hasTabBar={true} seoTitle='G리는 상품 목록'>
			<div className='bg-[#101010] text-[#fafafa] font-Roboto pt-12 px-4 space-y-4'>
				{productData?.products?.map((product) => (
					<Goods
						color='Black'
						comment={5}
						id={product.Id}
						key={product.Id}
						like={product._count?.Favorite || 0}
						price={product.price}
						title={product.name}
					>
						{product.image !== 'none' ? (
							<img
								src={imageUrl(product.image, 'public')}
								alt={product.name}
								className='rounded-sm'
							/>
						) : (
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
						)}
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
	);
};

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
	return (
		<SWRConfig
			value={{
				fallback: {
					'/api/products': {
						success: true,
						products,
					},
				},
			}}
		>
			<Home />
		</SWRConfig>
	);
};

export const getServerSideProps = async () => {
	const products = await client.product.findMany({});
	return {
		props: { products: JSON.parse(JSON.stringify(products)) },
	};
};

export default Page;
