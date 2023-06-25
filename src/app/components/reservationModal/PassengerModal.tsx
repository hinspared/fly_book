'use client';
import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Passenger } from '@/app/utils/types/types';

interface PassengerModalProps {
  open: boolean;
  numPassengers: number;
  onClose: () => void;
  onSubmit: () => void;
}

const PassengerModal: React.FC<PassengerModalProps> = ({
  open,
  numPassengers,
  onClose,
  onSubmit,
}) => {
  const Schema = z.object({
    passengers: z.array(
      z.object({
        firstName: z.string().nonempty(),
        lastName: z.string().nonempty(),
        passport: z.string().nonempty(),
        phoneNumber: z.string().nonempty(),
        email: z.string().email().nonempty(),
      })
    ),
  });

  const initialValues: { passengers: Passenger[] } = {
    passengers: Array(numPassengers).fill({
      firstName: '',
      lastName: '',
      passport: '',
      phoneNumber: '',
      email: '',
    }),
  };

  const validationSchema = toFormikValidationSchema(Schema);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const getFieldTouched = (fieldName: keyof Passenger, index: number) => {
    return formik.touched.passengers?.[index]?.[fieldName] || false;
  };

  const getFieldError = (fieldName: keyof Passenger, index: number) => {
    return (
      (formik.errors.passengers as FormikErrors<Passenger>[])?.[index]?.[
        fieldName
      ] || ''
    );
  };

  const handleChange =
    (fieldName: keyof Passenger, index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      formik.setFieldValue(`passengers[${index}].${fieldName}`, value);
    };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Passenger Information</DialogTitle>
      <DialogContent>
        {formik.values.passengers.map((passenger: Passenger, index: number) => (
          <React.Fragment key={index}>
            <Typography variant="subtitle1">Passenger {index + 1}</Typography>
            {Object.keys(passenger).map((fieldName) => {
              const value =
                formik.values.passengers[index][fieldName as keyof Passenger];
              const touched = getFieldTouched(
                fieldName as keyof Passenger,
                index
              );
              const error = getFieldError(
                fieldName as keyof FormikErrors<Passenger>,
                index
              );

              return (
                <TextField
                  key={fieldName}
                  name={`passengers[${index}].${fieldName}`}
                  label={fieldName}
                  value={value}
                  onChange={handleChange(fieldName as keyof Passenger, index)}
                  fullWidth
                  margin="normal"
                  error={touched && Boolean(error)}
                  helperText={touched && error ? error : ''}
                />
              );
            })}
          </React.Fragment>
        ))}
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default PassengerModal;
