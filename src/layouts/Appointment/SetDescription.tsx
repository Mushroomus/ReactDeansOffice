import React, { useState } from 'react';

interface SelectBoxProps {
    onDescriptionChange: (description: string) => void;
}
  

const SetDescription = ({ onDescriptionChange }: SelectBoxProps) => {
  const [description, setDescription] = useState<string>("");

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    onDescriptionChange(event.target.value);
  };

  return (
    <input type="text" className="form-control" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
  );
}

export default SetDescription;