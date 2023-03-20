import React, { useEffect, useState } from 'react';
import SelectBox from './SelectWorker';
import DatePick from './DatePicker';
import SelectTime from './SelectTime';
import SetDescription from './SetDescription';

const AppointmentForm = () => {
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log(selectedWorkerId);
    console.log(selectedDate);
    console.log(selectedTime);
    if(selectedWorkerId != null && selectedDate != null && selectedTime != null) {

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: description })
      };

      fetch(`http://localhost:8081/workers/${selectedWorkerId}/workdays/${selectedDate.getTime()}/interval/${selectedTime.split(" ")[0]}/student/1`, requestOptions)
          .then(response => response.json())
          .then(() => {
            console.log("success");
          })
          .catch(error => console.log(error));
      }
    }

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
          <SelectTime selectedWorkerId={selectedWorkerId} selectedDate={selectedDate} onTimeSelect={setSelectedTime} />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionSet" className="form-label">
            Description:
          </label>
          <SetDescription onDescriptionChange={setDescription} />
        </div>
      <button type="submit" className="btn btn-primary">
        Make an appointment
      </button>
    </form>
  );
};

export default AppointmentForm;