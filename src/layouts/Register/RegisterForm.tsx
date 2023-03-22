import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

interface FormData {
  name: string;
  surname: string;
  year: string;
  major: string;
  specialization: string;
  username: string;
  password: string;
  repeatPassword: string;
}

interface Specialization {
  id: number;
  name: string;
  course: string;
}

interface Major {
  id: number;
  year: number;
  specializations: Specialization[];
}


const RegisterForm = () => {
  const { register, formState: { errors } } = useForm<FormData>();

  const [page, setPage] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    year: '',
    major: '',
    specialization: '',
    username: '',
    password: '',
    repeatPassword: ''
  })

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [fetchedData, setFetchedData] = useState<Major[]>([]);
  const [majors, setMajors] = useState<string[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    setFormData({...formData, year: e.target.value});
    register('year', { required: true });
};

useEffect(() => {
    if(selectedYear !== '') {
        fetch(`http://localhost:8081/major-details?year=${selectedYear}`)
            .then(response => response.json())
            .then((data: { majors: Major[] }) => {
                setFetchedData(data.majors);
            })
            .catch(error => console.log(error));
    }
}, [selectedYear]);

useEffect(() => {
    setMajors(Array.from( new Set(fetchedData.flatMap((major: Major) => major.specializations).map((spec: Specialization) => spec.name))));
}, [fetchedData]);

const handleMajorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, major: e.target.value});
    register('major', { required: true });
};

useEffect(() => {
    setSpecializations(Array.from( new Set(fetchedData.flatMap((major: Major) => major.specializations).map((spec: Specialization) => spec.course))));
}, [majors]);

const handleSpecializationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, specialization: e.target.value});
    register('specialization', { required: true });
    console.log(formData);
};

const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(formData);
}

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const renderFirstPage = () => {
    return (
      <>
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" {...register('name', { required: true } )}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        {errors.name && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>

      <Form.Group controlId="formSurname">
        <Form.Label>Surname:</Form.Label>
        <Form.Control type="text" placeholder="Enter surname" {...register('surname', { required: true })}
        onChange={(e) => setFormData({ ...formData, surname: e.target.value })} />
        {errors.surname && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>

      <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Select value={formData.year} onChange={handleYearSelect}>
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </Form.Select>
      </Form.Group>

      <Form.Group controlId="majorSelect">
          <Form.Label>Major</Form.Label>
          <Form.Select onChange={handleMajorSelect} value={formData.major}>
              <option value="">Select Major</option>
              {majors.map((option: string) => (
                  <option key={option} value={option}>{option}</option>
              ))}
          </Form.Select>
      </Form.Group>

      <Form.Group controlId="specializationSelect">
          <Form.Label>Specialization</Form.Label>
          <Form.Select onChange={handleSpecializationSelect} value={formData.specialization}>
              <option value="">Select Specialization</option>
              {specializations.map((option: string) => (
                  <option key={option} value={option}>{option}</option>
              ))}
          </Form.Select>
      </Form.Group>

      <Button variant="primary" onClick={handleNextPage}>Next</Button>
      </>
    );
  };

  const renderSecondPage = () => {
    return (
      <>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" {...register('username', { required: true })} 
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
          {errors.username && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" {...register('password', { required: true })} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
          {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Form.Group controlId="formRepeatPassword">
          <Form.Label>Repeat Password:</Form.Label>
          <Form.Control type="password" placeholder="Repeat password" {...register('repeatPassword', { required: true })} 
          onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}/>
          {errors.repeatPassword && <Form.Text className="text-danger">This field is required</Form.Text>}
        </Form.Group>

        <Button variant="secondary" onClick={handlePrevPage}>Previous</Button>
        <Button variant="primary" type="submit">Submit</Button>
      </>
    );
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      {page === 1 && renderFirstPage()}
      {page === 2 && renderSecondPage()}
    </Form>
    );

};

export default RegisterForm;