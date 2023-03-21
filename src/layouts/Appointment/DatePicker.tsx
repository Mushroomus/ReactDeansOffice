import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickProps {
  onDateSelect: (selectedDate: Date) => void;
}

const DatePick= ({ onDateSelect }: DatePickProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleSelectChange = (date: Date) => {
    onDateSelect(date);
  };

  return (
    <DatePicker className="form-control" placeholderText="Select date" selected={startDate} onChange={(date: Date) => { setStartDate(date);handleSelectChange(date) }} />
  );
};

export default DatePick;