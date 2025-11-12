import React from 'react';

type Props = {
	params: Promise<{ id: string }>;
};

const BlogPage = async ({ params }: Props) => {
	const { id } = await params;
	return (
		<div className='w-full min-h-screen p-[5vw] bg-[#dddddd] text-gray-950'>
			Blog page {id}
		</div>
	);
};

export default BlogPage;
