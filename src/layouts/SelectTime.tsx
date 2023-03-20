import React, { useEffect, useState } from 'react';

interface Intervals {
  intervals: string[]
}

  interface SelectTimeProps {
    selectedWorkerId: number | null;
    selectedDate: Date | null;
    onTimeSelect: (selectedTime: string) => void;
}
  

  const SelectTime = ({ selectedWorkerId, selectedDate, onTimeSelect }: SelectTimeProps) => {
    const [options, setOptions] = useState<string[]>([]);
  
    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedTime = event.target.value;
      onTimeSelect(selectedTime);
    };
  
  useEffect(() => {
    if(selectedWorkerId != null && selectedDate != null) {
      const timestamp = selectedDate.getTime();

      fetch(`http://localhost:8081/workers/${selectedWorkerId}/workdays/${timestamp}/intervals`)
        .then(response => response.json())
        .then((data: Intervals) => {
        setOptions(data.intervals);
        onTimeSelect(data.intervals[0]);
        })
        .catch(error => console.log(error));
    }
  }, [selectedWorkerId, selectedDate]);

    return (
      <select className="form-select" onChange={handleTimeChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

export default SelectTime;