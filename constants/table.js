export const COLUMNS = [
	{
		title: 'No.',
		key: 'no',
		render: (_, __, index) => index + 1,
	},
	{
		title: 'Result',
		key: 'result',
		render: value => value,
	},
];