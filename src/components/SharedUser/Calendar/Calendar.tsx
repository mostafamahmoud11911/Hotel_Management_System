import { Box, Button, Popover, TextField } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

function Calendar({ selectDate, setSelectDate }: { selectDate: DateRange<Dayjs>, setSelectDate: React.Dispatch<React.SetStateAction<DateRange<dayjs.Dayjs>>> }) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleCalendarChange = (newDateRange: DateRange<Dayjs>) => {
        setSelectDate(newDateRange)
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);


    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
            maxWidth: 400
        }}>
            <Button
                variant="outlined"
                onClick={handleButtonClick}
                aria-labelledby="calendar-button-label"
                aria-label="Open calendar"
                sx={{
                    width: "20px",
                    height: "55px",
                    backgroundColor: "#152C5B",
                    color: "white",
                    borderColor: "#152C5B"
                }}
            >
                <CalendarMonthIcon />
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                sx={{
                    '& .MuiPopover-paper': {
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: "hidden"
                    }
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateRangeCalendar']}>
                        <DateRangeCalendar
                            value={selectDate}
                            onChange={handleCalendarChange}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Popover>

            <TextField
                fullWidth
                aria-labelledby="date-range-label"
                label="Date range"
                value={`${dayjs(selectDate[0])?.format("MMM D, YYYY")} - ${dayjs(
                    selectDate[1]
                )?.format("MMM D, YYYY")}`}
                sx={{ textAlign: "center", width: "100%" }}
            />
        </Box>
    )
}


export default React.memo(Calendar);