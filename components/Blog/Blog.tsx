'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import FadeIn from '../FadeIn/FadeIn';
import GSAPSplitTextComponent from '../GSAPSplitTextComponent/GSAPSplitTextComponent';

import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

type Props = {};

const dummyBlogPosts = [
	{
		id: 1,
		title: 'Kako postići svoje fitness ciljeve',
		date: '05.10.2025',
		excerpt:
			'Saznajte kako postaviti realne ciljeve i ostati motivirani na svom fitness putovanju...',
	},
	{
		id: 2,
		title: 'Najbolje vježbe za cijelo tijelo',
		date: '12.10.2025',
		excerpt:
			'Otkrijte efikasne vježbe koje ciljaju sve glavne mišićne grupe...',
	},
	{
		id: 3,
		title: 'Prehrana za optimalne rezultate',
		date: '19.10.2025',
		excerpt:
			'Naučite kako pravilna prehrana može poboljšati vaše performanse i oporavak...',
	},
];

const Blog = (props: Props) => {
	const blogRef = React.useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!blogRef.current) return;

			gsap.set(blogRef.current, {
				width: '80%',
				margin: '0 auto',
				transformOrigin: 'center',
			});

			gsap.fromTo(
				blogRef.current,
				{
					width: '80%',
				},
				{
					width: '100%',
					duration: 1,
					scrollTrigger: {
						trigger: blogRef.current,
						start: 'top bottom',
						end: 'top 40%',
						scrub: 1,
						invalidateOnRefresh: true,
					},
				}
			);
		},
		{ scope: blogRef }
	);

	return (
		<div
			ref={blogRef}
			className='bg-[#9d9d9d] min-h-screen w-full p-[5vw] text-black flex flex-col gap-8'>
			{' '}
			<GSAPSplitTextComponent ease={'power2'}>
				<h4 className='text-2xl tracking-tighter uppercase font-semibold text-black'>
					Fitness Blog by Elvis Agović
				</h4>
			</GSAPSplitTextComponent>
			<div className='flex w-full '>
				<FadeIn className='w-full grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4'>
					{dummyBlogPosts.map((post) => (
						<Link
							href={`/blog/${post.id}`}
							key={post.id}
							className='blog-post w-full border border-black border-dashed p-4 rounded-lg aspect-square flex flex-col'>
							<h5
								style={{ fontFamily: 'Anton, sans-serif' }}
								className='text-4xl tracking-tight mb-4 text-black'>
								{post.title}
							</h5>
							<p className='text-black'>{post.excerpt}</p>
							<div className='post-footer flex mt-auto justify-between items-center'>
								<p className='date bg-black p-4 rounded-sm text-gray-100 max-w-max mt-auto h-12 flex items-center text-xs'>
									{post.date}
								</p>
								<span className='text-black w-12 h-12 flex items-center justify-center border border-black border-dashed hover:underline'>
									<ArrowRight />
								</span>
							</div>
						</Link>
					))}
				</FadeIn>
			</div>
			<div className='pagination flex items-start mt-auto flex-col gap-4'>
				<span className='text-black'>
					Ukupno {dummyBlogPosts.length}
					{dummyBlogPosts.length === 1
						? ' post'
						: dummyBlogPosts.length === 2 ||
						  dummyBlogPosts.length === 3 ||
						  dummyBlogPosts.length === 4
						? ' posta'
						: ' postova'}
					.
				</span>

				{dummyBlogPosts.length > 0 && (
					<button className='text-black w-12 h-12 flex items-center justify-center border border-black border-dashed hover:underline'>
						<ArrowRight />
					</button>
				)}
			</div>
		</div>
	);
};

export default Blog;
