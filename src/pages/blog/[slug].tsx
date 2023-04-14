import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse/lib';
import remarkHtml from 'remark-html';

const Post: NextPage<{ post: string }> = ({ post }) => {
	return <div>{post}</div>;
};

/**정적파일을 뿌려주는 기계라고 보는 것이 나을지도 함수 자체도 bulid시에 호출됨.
 * 개인 블로그를 만든다손 치면 결국 모든 포스트를 가져와서 마크업을 하거나 통일된 양식을 만들어낼 수 없으니
 * 마크다운을 통해서든 어떻게 해서든 작성된 글을 정적페이지로 소화할 수 있어야함
 * */
export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { content } = matter.read(`./src/posts/${ctx.params?.slug}.md`);
	const { value } = await unified()
		.use(remarkParse)
		.use(remarkHtml)
		.process(content);

	return {
		props: { post: value },
	};
};

export default Post;
