import { ProductWithCount } from '@/pages';
import { Trade } from '@prisma/client';
import useSWR from 'swr';
import Goods from './goods';

interface TradeWithProduct extends Trade {
	product: ProductWithCount;
}

interface TradeProps {
	[key: string]: TradeWithProduct[];
}

interface TradeListProps {
	kind: 'purchases' | 'sales';
}

export default function TradeList({ kind }: TradeListProps) {
	const { data, isLoading } = useSWR<TradeProps>(
		`/api/profiles/own/trades?kind=${kind}`
	);
	if (data) {
		console.log(data);
	}
	return data ? (
		<>
			{/**이런식으로 사용하면 이름이 정해지지 않은 프로퍼티도 map을 사용할 수 있음
			 * `${}`도 사용 가능
			 */}
			{data[kind]?.map((trade) => (
				<div key={trade.Id}>
					<Goods
						color='Black'
						id={trade.product.Id}
						like={trade.product._count.Favorite}
						price={trade.product.price}
						title={trade.product.name}
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
		</>
	) : null;
}
