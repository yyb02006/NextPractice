import Layout from '@/components/layout';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

interface BlogPosts {
	title: String;
	date: String;
	category: String;
	slug: String;
}

const Blog: NextPage<{ posts: BlogPosts[] }> = ({ posts }) => {
	return (
		<Layout seoTitle='Blog'>
			<h1>hello</h1>
			<div className='text-gray-200 space-y-10'>
				{posts.map((post, idx) => (
					<div key={idx}>
						<div className='flex justify-between items-end'>
							<Link href={`/blog/${post.slug}`} className='text-base'>
								<div className='font-GmarketSans font-semibold'>
									오늘의 <span className='text-green-500'>G</span>리는 일
								</div>{' '}
								<span className='text-3xl font-Roboto font-semibold'>
									{post.title}
								</span>
							</Link>
							<span className='mt-6 space-x-2 text-xs font-light text-gray-400'>
								<span>{post.category}</span>
								<span>{post.date}</span>
							</span>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = () => {
	const posts = readdirSync('./src/posts').map((file) => {
		const [slug, _] = file.split('.');
		return {
			...matter(readFileSync(`./src/posts/${file}`, 'utf-8')).data,
			slug: slug,
		};
	});

	return { props: { posts } };
};

export default Blog;
