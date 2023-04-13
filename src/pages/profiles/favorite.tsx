import type { NextPage } from 'next';
import Layout from '@/components/layout';
import Goods from '@/components/goods';
import useSWR from 'swr';
import { Favorite } from '@prisma/client';
import { ProductWithCount } from '..';

interface FavoriteWithProduct extends Favorite {
	product: ProductWithCount;
}

interface FavoriteProps {
	success: boolean;
	favorites: FavoriteWithProduct[];
}

const Trade: NextPage = () => {
	const { data: favoriteData, isLoading } = useSWR<FavoriteProps>(
		'/api/profiles/own/favorites'
	);
	return (
		<Layout canGoBack={true} hasTabBar={true} seoTitle='내가 찜쪄먹을 상품들'>
			<div className='bg-[#101010] text-[#fafafa] font-Roboto pt-12 px-4 space-y-4'>
				{favoriteData?.favorites.map((favorite) => (
					<div key={favorite.Id}>
						<Goods
							color='Black'
							id={favorite.product.Id}
							like={favorite.product._count.Favorite}
							price={favorite.product.price}
							title={favorite.product.name}
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

export default Trade;
