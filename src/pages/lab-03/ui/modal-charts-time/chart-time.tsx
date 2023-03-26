import { type FC } from 'react';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { getAllMethodsTime } from './get-time-data';

export const ChartTime: FC = () => {
	const data = getAllMethodsTime();
	return (
		<ResponsiveContainer
			width='100%'
			height='100%'
			minWidth={300}
			minHeight={200}
		>
			<BarChart
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='method' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar
					dataKey='time'
					fill='#8884d8'
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};
