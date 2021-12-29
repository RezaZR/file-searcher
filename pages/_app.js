import React from 'react';

import 'antd/dist/antd.min.css';

import { Layout } from 'antd';

import { container } from "../styles/";

const App = ({ Component, pageProps }) => (
	<Layout className={container}>
		<Component {...pageProps} />
	</Layout>
);

export default App;
