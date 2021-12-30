import React from 'react';

import 'antd/dist/antd.min.css';

import { Layout } from 'antd';

import { container } from "../styles/";

const { Content } = Layout;

const App = ({ Component, pageProps }) => (
	<Layout>
		<Content className={container}>
			<Component {...pageProps} />
		</Content>
	</Layout>
);

export default App;
