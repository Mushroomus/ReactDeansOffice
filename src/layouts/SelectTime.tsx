import React, { useEffect, useState } from 'react';

interface SelectTime {
    onTimeSelect: (selectedTime: string) => void;
  }

  useEffect(() => {
    fetch('http://localhost:8081/workers')
      .then(response => response.json())
      .then((data: Worker[]) => {
        //setOptions(data);
      })
      .catch(error => console.log(error));
  }, []);


const SelectTime = ({ onTimeSelect }: SelectTime) => {
    const timeOptions = ['9:00', '9:15', '9:30', '9:45', '10:00'];
  
    return (
      <select className="form-select">
        {timeOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

export default SelectTime;