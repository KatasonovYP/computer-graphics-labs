import { type FC } from 'react';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { getAllMethodsTime } from './get-time-data';
import { EMethod } from '../../model';

export const ChartTime: FC = () => {
	const data = getAllMethodsTime();
	return (
		<ResponsiveContainer
			width='100%'
			height='100%'
			minWidth={300}
			minHeight={200}
		>
			<LineChart
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='time' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type='monotone'
					dataKey={EMethod.Bresenham}
					stroke='#008'
				/>
				<Line
					type='monotone'
					dataKey={EMethod.Midpoint}
					stroke='#080'
				/>
				<Line
					type='monotone'
					dataKey={EMethod.Canonical}
					stroke='#088'
				/>
				<Line
					type='monotone'
					dataKey={EMethod.Parametric}
					stroke='#800'
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
