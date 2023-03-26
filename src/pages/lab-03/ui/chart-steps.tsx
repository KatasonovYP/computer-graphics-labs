import { type FC } from 'react';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Stack, Text } from '@chakra-ui/react';

import { type EMethod } from '../model';

import { getStepsData } from './get-steps-data';

interface Properties {
	method: EMethod;
}

export const ChartSteps: FC<Properties> = ({ method }) => {
	const data = getStepsData(method);
	return (
		<Stack>
			<Text
				as={'b'}
				textAlign={'center'}
			>
				{method}
			</Text>
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
					<XAxis dataKey='angle' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						r={0}
						type='monotone'
						dataKey='steps'
						stroke='#8884d8'
					/>
				</LineChart>
			</ResponsiveContainer>
		</Stack>
	);
};
