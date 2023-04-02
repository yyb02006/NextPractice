import Layout from '@/components/layout';
import type { NextPage } from 'next';
import Button from '@/components/button';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { Product, User } from '@prisma/client';

interface ProductIncludeUser extends Product {
	user: User;
}

interface DetailProductProps {
	success: boolean;
	product: ProductIncludeUser;
	relatedProducts: Product[];
}

const Detail: NextPage = () => {
	const router = useRouter();

	//이거 콘솔하면 서버에는 {}, 브라우저에는 {id:value}가 뜬다. 즉, router는 서버에서 js를 읽는 시점에서는 마운트되지 않고,
	//브라우저에서 읽을 때 마운트된다는 것.
	// console.log(router.query);

	//optional query를 이렇게 구현하는 이유는, 옵셔널체이닝으로 router?.query.id를 쓰면 useRouter가 마운트되기 전에 undefined를 뱉게되고
	///api/products/undefined라는 주소를 불러오게 되기 때문.
	const { data, error, isLoading } = useSWR<DetailProductProps>(
		router.query.id ? `/api/products/${router.query.id}` : null
	);
	console.log(data?.relatedProducts);

	return (
		<Layout title='상세정보' canGoBack={true} hasTabBar={true}>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12'>
				<div>
					<div className='bg-indigo-600 w-full aspect-square rounded-md' />
					<div className='flex items-center gap-2 mt-4'>
						<div className='bg-pink-400 w-12 aspect-square rounded-md' />
						<div>
							<p className='font-medium text-lg'>{data?.product.user?.name}</p>
							<Link href={`/users/profiles/${data?.product.user?.name}`}>
								<p className='font-normal text-xs text-gray-400 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
									자세히 알아보기 &rarr;
								</p>
							</Link>
						</div>
					</div>
					<div className='mt-8'>
						<h1 className='font-bold text-right text-3xl'>
							{data?.product.name.slice(0, data.product.name.length - 1)}
							<span className='text-green-500'>
								{data?.product.name.slice(-1)}
							</span>
						</h1>
						<p className='font-medium text-gray-400 text-right text-base mr-[2px] mt-2'>
							￦{data?.product.price}
						</p>
						<p className='mt-6 font-light leading-[32px] text-sm text-gray-200'>
							{data?.product.desc}
						</p>
						<div className='mt-10 flex justify-start h-10'>
							<div className='z-[1] w-full'>
								<Button name='판매자와 한 판 승부'></Button>
							</div>
							<button className='pl-5 pr-3 group bg-indigo-600 hover:bg-pink-400 -ml-2 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-[#101010]'>
								{/* <div className='right-0 top-0 w-20 h-10 absolute bg-indigo-600 rounded-md group-hover:bg-pink-500 transition-colors '></div> */}
								<svg
									className='relative h-6 w-6 '
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
										d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
				{data?.relatedProducts.length ? (
					<h2 className='font-GmarketSans font-semibold text-3xl mt-24'>
						<span className='text-green-500'>더! 더!</span> 많~은{' '}
						{data?.product.name.slice(0, data.product.name.length - 1)}
						<span className='text-green-500'>
							{data?.product.name.slice(-1)}
						</span>
					</h2>
				) : null}
				<div className='mt-2 grid grid-cols-2 gap-x-2 gap-y-2'>
					{data?.relatedProducts.map((product) => (
						<div key={product.Id}>
							<Link href={`/details/${product.Id}`}>
								<div className='bg-indigo-500 hover:bg-pink-500 w-full aspect-square rounded-md transition-colors' />
							</Link>
							<h3 className='font-medium mt-1'>{product.name}</h3>
							<p className='font-light text-gray-400 text-sm'>
								￦{product.price}
							</p>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Detail;
