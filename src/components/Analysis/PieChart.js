import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';


const data = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
];

const COLORS = ['#F08044', '#0088FE', '#0038FE', '#00C49F', '#FFBB28', '#Fc8042', '#1038E',
    '#F08044', '#0088FE', '#0038FE', '#00C49F', '#FFBB28', '#Fc8042', '#1038E',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ value, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text className='text-xs' x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Example = ({ dataval }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
    
            return (
                <div className="custom-tooltip w-20 text-xs text-black bg-[#b9b6b6] bg-opacity-90">
                    <p className="label text-[10px]">{`${payload[0].name}:${payload[0].value}৳`}</p>
                    <p className="desc"></p>
                </div>
            );
        }
    
        return null;
    };
    const clickHandler=(d)=>{
    console.log(d);
    }
    const CustomLegend = ({ payload }) => {
        // console.log(payload[0].color);
        return (<div className=' rounded-lg scrollbar-hide overflow-y-scroll
           max-h-48 w-full   '>
            {payload.map(el => {
            
                return (
                    <div onClick={()=>{
                        clickHandler(el.value);
                    }} className='hover:bg-opacity-40 bg-[#504c4c] px-4 w-full h-6 mt-1
                     items-center flex justify-between'>
                        <div className='rounded-md w-[26px]  px-[2px] shadow-md 
                        font-semibold border-1 border-[#fff] tracking-tighter text-[#fff] text-[.7rem]'
                         style={{ backgroundColor: el.color }}
                        >{parseInt(el.payload.percent.toFixed(2) * 100)}%</div>
                        <div className='flex items-center justify-between w-[80%] text-[#fff]'>
                            <div className='text-xs' >{el.value} </div>
                            <div className='text-xs ' >{el.payload.value} ৳</div>
                        </div>
                    </div>)
            })}
        </div>)
        // return payload.map((el) => {
        //     return (<div className=' w-full bg-[#f2f2f2]' >
        //         <p>{el.type}</p>
        //     </div>);
        // })
    }
    
    return (
        <div className=' h-[100%] w-[100%] '>
            <ResponsiveContainer >
                <PieChart  >
                    <Legend wrapperStyle={{position:'fixed'}}  content={<CustomLegend />} />
                    <Tooltip  content={<CustomTooltip />} />
                    <Pie
                        data={dataval}
                        label={renderCustomizedLabel}
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

    );

}
export default Example
