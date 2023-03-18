import React, { useEffect, useState } from 'react';
import SelectBox from './SelectWorker';
import DatePick from './DatePicker';
import SelectTime from './SelectTime';

const AppointmentForm = () => {
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Use selectedWorkerId and selectedDate here to create a new appointment
    // ...
  };

  useEffect(() => {
    console.log(selectedWorkerId);
  }, [selectedWorkerId]);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);


  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="workerSelect" className="form-label">
          Select a worker:
        </label>
        <SelectBox onWorkerSelect={setSelectedWorkerId} />
      </div>
      <div className="mb-3">
        <label htmlFor="dateSelect" className="form-label">
          Select a date:
        </label>
        <DatePick onDateSelect={setSelectedDate} />
      </div>
        <div className="mb-3">
          <label htmlFor="timeSelect" className="form-label">
            Select a time:
          </label>
          <SelectTime onTimeSelect={setSelectedTime} />
        </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;