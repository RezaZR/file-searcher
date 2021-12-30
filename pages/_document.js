import React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';

import renderStatic from '../utils/react-emotion/renderer'

export const getStaticProps = async ctx => {
	const page = await ctx.renderPage();
	const { css, ids } = await renderStatic(page.html);
	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		styles: (
			<>
				{initialProps.styles}
				<style
					data-emotion={`css ${ids.join(' ')}`}
					dangerouslySetInnerHTML={{ __html: css }}
				/>
			</>
		),
	}
}
const AppDocument = () => {
	return (
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default AppDocument;
