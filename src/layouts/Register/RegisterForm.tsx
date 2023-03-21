import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data); // Do something with the form data here
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" {...register('name', { required: true })} />
        {errors.name && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register('email', { required: true })} />
        {errors.email && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter password" {...register('password', { required: true })} />
        {errors.password && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>
      <Form.Group controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" {...register('confirmPassword', { required: true })} />
        {errors.confirmPassword && <Form.Text className="text-danger">This field is required</Form.Text>}
      </Form.Group>
      <Button variant="primary" type="submit">Register</Button>
    </Form>
  );
};

export default RegisterForm;