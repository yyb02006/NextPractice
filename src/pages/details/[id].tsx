import Layout from '@/components/layout';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Button from '@/components/button';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { Product, User } from '@prisma/client';
import useMutation from '@/libs/client/useMutation';
import { clsNm, imageUrl } from '@/libs/client/utils';
import Image from 'next/image';
import client from '@/libs/server/client';

interface ProductWithUser extends Product {
	user: User;
}

interface DetailProps {
	product: ProductWithUser;
	relatedProducts: Product[];
}

interface DetailProductProps extends DetailProps {
	success: boolean;
	isLiked: boolean;
}

interface useMutationResult {
	success: boolean;
}

const Detail: NextPage<DetailProps> = ({ product, relatedProducts }) => {
	const router = useRouter();

	/**
	 * 이거 콘솔하면 서버에는 {}, 브라우저에는 {id:value}가 뜬다. 즉, router는 서버에서 js를 읽는 시점에서는 마운트되지 않고,
	 * 브라우저에서 읽을 때 마운트된다는 것.
	 * console.log(router.query);
	 */

	/**
	 * optional query를 이렇게 구현하는 이유는, 옵셔널체이닝으로 router?.query.id를 쓰면 useRouter가 마운트되기 전에 undefined를 뱉게되고
	 * /api/products/undefined라는 주소를 불러오게 되기 때문.
	 * +훅에서는 data에서 뭔 값이 들어올 지 유추할 수 없기 때문에 직접 인터페이스를 만들어야함
	 */
	const { data, mutate } = useSWR<DetailProductProps>(
		router.query.id && `/api/products/${router.query.id}`
	);
	/**
	 * useMutation에 제네릭이 붙어있어서 쥰내 헷갈리지만, userMutation파일을 열어보면 useMutation은<UseMutationState>인터페이스를 붙여줬고,
	 * 제네릭으로<T>까지 얹어준 걸 알 수 있다. 이 <T>가 아래에서 쓰고 있는 useMutation<useMutationResult>인 것이고, 제네릭은 data의
	 * 타입까지 영향을 준다고 작성했기 때문에 favResponse의 타입이 success:boolean으로 정해지는 것
	 * +useState에 붙는 타입도 제네릭으로 붙이는 거라 결국 제네릭의 제네릭임
	 * +사실 favResponse 기본값 unknown이라 지금은 제네릭 필요없음
	 */
	const [toggleFav, { loading, data: favResponse, error: favError }] =
		useMutation<useMutationResult>(`/api/products/${router.query.id}/fav`);

	const onFavClick = () => {
		toggleFav({});
		/**
		 * if (!data) return;는 data가 존재한다는 것을 알리기 위해 필요 prev를 사용하면 필요 x
		 * (bound) mutate의 첫번째 인자는 가짜로 교체될 데이터, 두번째 인자는 mutate를 실행한 후에 refetch를 할지, 말지 정함
		 * 인자가 없으면 just refresh
		 */
		mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
	};

	return (
		<Layout
			title='상세정보'
			canGoBack={true}
			hasTabBar={true}
			seoTitle='G리는 상품 상세정보'
		>
			<div className='bg-[#101010] text-[#fafafa] font-SCoreDream px-4 py-12'>
				<div>
					{product.image && product.image !== 'none' ? (
						<img
							src={imageUrl(product.image, 'public')}
							className='object-contain w-full rounded-sm'
						/>
					) : null}
					<div className='flex items-center gap-2 mt-4'>
						{product.user.avatar ? (
							<Image
								width={48}
								height={48}
								src={imageUrl(product.user.avatar, 'avatar')}
								className='object-cover w-12 aspect-square rounded-sm'
								alt='avatar'
							/>
						) : (
							<div className='bg-pink-400 w-12 aspect-square rounded-sm' />
						)}
						<div>
							<p className='font-medium text-lg'>{product.user?.name}</p>
							<Link href={`/users/profiles/${product.user?.name}`}>
								<p className='font-normal text-xs text-gray-400 cursor-pointer hover:text-gray-300 hover:translate-x-1 transition'>
									자세히 알아보기 &rarr;
								</p>
							</Link>
						</div>
					</div>
					<div className='mt-8'>
						<h1 className='font-bold text-right text-3xl'>
							<span className='text-green-500'>{product.name.slice(0, 1)}</span>
							{product.name.slice(1, product.name.length)}
						</h1>
						<p className='font-medium text-gray-400 text-right text-base mr-[2px] mt-2'>
							￦{product.price}
						</p>
						<p className='mt-6 font-light leading-[32px] text-sm text-gray-200'>
							{product.desc}
						</p>
						{/**z-index의 함정을 잘 기억해두자 https://dev.epiloum.net/904*/}
						<div className='relative z-[0] mt-10 flex justify-start h-10'>
							<div className='relative z-[1] w-full'>
								<Button name='판매자와 한 판 승부'></Button>
							</div>
							<button
								onClick={onFavClick}
								className={clsNm(
									data?.isLiked
										? 'bg-pink-400 hover:bg-indigo-600 '
										: 'bg-indigo-600 hover:bg-pink-400 ',
									'pl-5 pr-3 group  -ml-2 rounded-sm transition-all focus:outline-none'
								)}
							>
								{/* <div className='right-0 top-0 w-20 h-10 absolute bg-indigo-600 rounded-md group-hover:bg-pink-500 transition-colors '></div> */}
								<svg
									className='relative h-6 w-6 '
									xmlns='http://www.w3.org/2000/svg'
									fill={clsNm(data?.isLiked ? '#fafafa' : 'none')}
									viewBox='0 0 24 24'
									stroke={clsNm(data?.isLiked ? 'none' : 'currentColor')}
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
				{relatedProducts.length ? (
					<h2 className='font-GmarketSans font-semibold text-3xl mt-24'>
						<span className='text-green-500'>더! 더!</span> 많~은{' '}
						{product.name.slice(0, product.name.length - 1)}
						<span className='text-green-500'>{product.name.slice(-1)}</span>
					</h2>
				) : null}
				<div className='mt-2 grid grid-cols-2 gap-x-2 gap-y-2'>
					{relatedProducts.map((product) => (
						<div key={product.Id}>
							<Link href={`/details/${product.Id}`}>
								{product.image !== 'none' ? (
									<img
										src={imageUrl(product.image, 'public')}
										className='w-full rounded-sm'
									/>
								) : (
									<div className='bg-indigo-500 hover:bg-pink-500 w-full aspect-square rounded-sm transition-colors' />
								)}
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

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	if (!ctx.params?.id) return { props: {} };
	const strProductId = ctx.params.id.toString();
	const product = await client.product.findUnique({
		where: {
			Id: +strProductId,
		},
		include: { user: { select: { name: true, id: true, avatar: true } } },
	});
	const term = product?.name
		.split(' ')
		.map((word) => ({ name: { contains: word } }));
	const relatedProducts = await client.product.findMany({
		where: {
			OR: term,
			AND: {
				Id: { not: +strProductId },
			},
		},
	});
	return {
		props: {
			product: JSON.parse(JSON.stringify(product)),
			relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
		},
	};
};

export default Detail;
