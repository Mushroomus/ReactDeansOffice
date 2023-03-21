import React, { useEffect, useState } from 'react';

interface Specialization {
    id: number;
    name: string;
    course: string;
}

interface Worker {
    id: number;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    room: string;
    specializations: Specialization[];
}

interface SelectBoxProps {
    onWorkerSelect: (selectedWorkerId: number) => void;
}
  

const SelectWorker = ({ onWorkerSelect }: SelectBoxProps) => {
  const [options, setOptions] = useState<Worker[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value);
    onWorkerSelect(selectedId);
  };

  useEffect(() => {
    fetch('http://localhost:8081/workers')
      .then(response => response.json())
      .then((data: Worker[]) => {
        setOptions(data);
        onWorkerSelect(data[0].id);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <select className="form-select" onChange={handleSelectChange}>
    {options.map(option => (
        <option key={option.id} value={option.id}>{option.name} {' '} {option.surname}</option>
    ))}
    </select>
  );
}

export default SelectWorker;