import { CalendarMonth } from "@mui/icons-material";
import { Box, Button, Popover, TextField } from "@mui/material";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs, Range } from "dayjs";
import { useState } from "react";
import "./Calendar.module.scss";

interface IProps {
  selectedDateRange?: any;
  setSelectedDateRange?: any;
}

const Calendar = ({ selectedDateRange, setSelectedDateRange }: IProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCalendarChange = (newDateRange: Range<Dayjs>) => {
    setSelectedDateRange(newDateRange);
  };

  const handleButtonClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelected = () => {
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);
  return (
    <>
    <Box className="calendarContainer">
    <Button
        sx={{
          fontSize: { xs: "1px", sm: "1px", md: "1px" },
          padding: {
            xs: "8px 16px",
            sm: "10px 20px",
            md: "12px 24px",
          },

          width: { xs: "15rem", sm: "50px" },
          height: { xs: "40px", sm: "50px" },
          borderRadius: "12px",
          p: "8px",
          mr: { xs: "5px", sm: "10px" },
          ml: "5px",
        }}
        className="caleBtn"
        onClick={handleButtonClick}
        variant="contained"
        color="primary"
      >
        <CalendarMonth />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangeCalendar"]}>
            <DateRangeCalendar
              value={selectedDateRange}
              onChange={handleCalendarChange}
              onAccept={handleDateSelected}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Popover>

      <TextField
        className="calendarField"
        label="Selected Date Range"
        value={`${dayjs(selectedDateRange[0])?.format("YYYY-MM-DD")} - ${dayjs(
          selectedDateRange[1]
        )?.format("YYYY-MM-DD")}`}
      />
    </Box>

    </>
  );
};

export default Calendar;
