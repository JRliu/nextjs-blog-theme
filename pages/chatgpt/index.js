import axios from "axios";
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
	a: CustomLink,
	// It also works with dynamically-imported components, which is especially
	// useful for conditionally loading components for certain routes.
	// See the notes in README.md for more details.
	Head,
};

export default function ChatGPT({

}) {

	const onSubmit = async ({ ask }) => {
		const res = await axios.get(`https://kang.deno.dev/?ask=${ask}`)


		console.log(res, '===res');
	}

	return (
		<Layout>
			<p>ChatGPT</p>

			<form action="" onSubmit={(e) => {
				e.preventDefault()
				const ask = e.target.querySelector('textarea')?.value
				onSubmit({ ask })
				// 
			}}>
				<textarea className="textarea textarea-primary" placeholder="Bio" name="askStr"></textarea>

				<button className="btn btn-primary" type="submit" onClick={() => {

				}}>Button</button>
			</form>
			<GradientBackground
				variant="large"
				className="absolute -top-32 opacity-30 dark:opacity-50"
			/>
			<GradientBackground
				variant="small"
				className="absolute bottom-0 opacity-20 dark:opacity-10"
			/>
		</Layout>
	);
}

