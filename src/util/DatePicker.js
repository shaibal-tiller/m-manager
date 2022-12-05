import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FormControl } from '@mui/material';
import { Box } from '@mui/material';


const DatePicker = ({ label, name, formatter }) => {



    const [value, setValue] = useState()
    const handleChange = (newValue) => {
        
        setValue(newValue)
        const x = new Date(newValue)
        const month =x.getMonth()+1
        // console.log({ pathKey: x.getFullYear()+ "-" + month, 'date': x.getDate() + "-" + (x.getMonth() + 1) + "-" + x.getFullYear(), 'time': x.getTime() });
        formatter({ pathKey: x.getFullYear()+ "-" + month, 'date': x.getDate() + "-" + (x.getMonth() + 1) + "-" + x.getFullYear(), 'time': x.getTime() })
  }

    useEffect(() => {
        const x = new Date();
        const month = x.getMonth()+1
        // console.log({ pathKey: x.getFullYear()+ "-" + month, 'date': x.getDate() + "-" + (x.getMonth() + 1) + "-" + x.getFullYear(), 'time': x.getTime() });
        formatter({ pathKey: x.getFullYear()+ "-" + month, 'date': x.getDate() + "-" + (x.getMonth() + 1) + "-" + x.getFullYear(), 'time': x.getTime() })
    }, [])
    return (
        <div className='flex flex-col w-full'>
            <LocalizationProvider dateAdapter={AdapterDayjs} className='bg-[#fff]'>

                <Box size='small'
                    className='bg-[#fff]'
                    noValidate
                    autoComplete="off"
                >
                    <FormControl sx={{ minWidth: "100%" }} className='bg-[#fff]'>

                        <MobileDateTimePicker
                            className='bg-[#fff]'
                            name={name || label || "date"}
                            inputFormat="DD/MM/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField size='small' {...params} />}
                        />
                    </FormControl>
                </Box>
            </LocalizationProvider>
        </div>
    )
}

export default DatePicker