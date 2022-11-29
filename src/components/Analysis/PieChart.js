import React, { PureComponent, useEffect, useState } from 'react';
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

// const COLORS = ['#F08044', '#0088FE', '#0038FE', '#00C49F', '#FFBB28', '#Fc8042', '#1038E',
//     '#F08044', '#0088FE', '#0038FE', '#00C49F', '#FFBB28', '#Fc8042', '#1038E',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ value, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text className='text-xs' x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Example = ({ dataval }) => {
    const [COLORS, setColors] = useState(['#F08044', '#0088FE', '#0038FE', '#00C49F', '#FFBB28', '#Fc8042', '#1038E',
        '#F08044', '#0088FE', '#0038FE', '#00C49F', '#FFBB28', '#Fc8042', '#1038E'])
    const [dataItems, setDataItems] = useState()
    useEffect(() => {
        setDataItems(dataval.sort((a,b)=>{
            return b.value-a.value;
        }))
    }, [dataval])
    useEffect(() => {
        if (dataItems && dataItems.length) {
            fetch(`https://www.colr.org/json/colors/random/${dataItems.length}`)
                .then(data => data.json())
                .then(d => { setColors(d.matching_colors.map(el => `#${el}`)) })
                .catch(e => {console.log(e)})
        }
    }, [dataItems])

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
    const clickHandler = (dataItems) => {

    }
    const handleCheck = (e) => {
        setDataItems(dataItems.filter((dt) => dt.name !== e.target.name))

    }
    const CustomLegend = ({ payload }) => {

        return (<div className=' rounded-lg scrollbar-hide overflow-y-scroll
            max-h-96 w-full   '>
            {dataItems.length && payload.map(el => {

                return (
                    <div key={el.value} onClick={() => {
                        clickHandler(el.value);
                    }} className='hover:bg-opacity-40 bg-[#504c4c] px-4 w-full h-6 mt-1
                     items-center flex justify-between'>
                        <input type={'checkbox'} name={el.value} defaultChecked onChange={handleCheck}></input>
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
        <div className='h-[85%] w-[100%] '>
            {dataItems && <ResponsiveContainer >
                <PieChart>

                    <Legend wrapperStyle={{ position: 'fixed', bottom: 50,  }} content={<CustomLegend />} />
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                        animationDuration={600}
                        data={dataItems}
                        label={renderCustomizedLabel}
                        labelLine={false}
                        outerRadius={'85%'}
                        fill="#8884d8"
                        dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>}
        </div>
    )
    // else return ()

}
export default Example
