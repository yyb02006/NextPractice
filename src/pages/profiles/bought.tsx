import type { NextPage } from 'next';
import Layout from '@/components/layout';
import TradeList from '@/components/trade-list';

const Bought: NextPage = () => {
	return (
		<Layout canGoBack={true} hasTabBar={true} seoTitle='구매목록'>
			<div className='bg-[#101010] text-[#fafafa] font-Roboto pt-12 px-4 space-y-4'>
				<TradeList kind='purchases' />
			</div>
		</Layout>
	);
};

export default Bought;
