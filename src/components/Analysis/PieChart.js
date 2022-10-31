import React, { PureComponent } from 'react';
import { PieChart, Pie,Tooltip, Sector, Cell, ResponsiveContainer ,Legend} from 'recharts';


const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#F08044','#0088FE','#0038FE', '#00C49F', '#FFBB28', '#Fc8042','#1038E',
'#F08044','#0088FE','#0038FE', '#00C49F', '#FFBB28', '#Fc8042','#1038E',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({value, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Example = ({dataval}) => {


    return (
        <div className='h-[100vh] w-[100%]'>   
           <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
            <Legend/>
            <Tooltip/>
                <Pie 
                     
                    data={dataval}
                    cx="50%"
                    cy="40%"
                    
                    label={renderCustomizedLabel}
                  
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index ]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        </div>

    );

}
export default Example
