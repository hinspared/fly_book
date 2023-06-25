'use client';
import React from 'react';
import { z } from 'zod';
import { useFormik, FormikErrors } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO } from 'date-fns';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import { useSearchParams } from '@/app/utils/hooks/useSearchParams';

interface SearchBarProps {
  options: {
    from: string[];
    to: string[];
  };
  onChange: (value: string | null) => void;
  mobile: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ options, onChange, mobile }) => {
  const MAX_NUMBER_OF_PASSENGERS = 4;
  const passengers = Array.from(
    { length: MAX_NUMBER_OF_PASSENGERS },
    (_, index) => index + 1
  );

  const { setParams } = useSearchParams();
  // formik
  const Schema = z.object({
    from: z.string().nonempty(),
    to: z.string().nonempty(),
    departure: z.string().nonempty(),
    passengers: z.number(),
  });
  const initialValues = {
    from: '',
    to: '',
    departure: '2023-06-10',
    passengers: 1,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: toFormikValidationSchema(Schema),
    onSubmit: (values) => {
      // error handling simulation
      const randomNumber = Math.floor(Math.random() * 11);
      randomNumber > 3
        ? (setParams(values), toast.success('Found some tickets'))
        : toast.error('Error: Failed to load flights. Please try again');
    },
  });

  return (
    <Grid container spacing={1} mt={10} justifyContent="center">
      {React.Children.toArray(
        Object.keys(formik.values).map((fieldName) => {
          const value = formik.values[fieldName as keyof typeof formik.values];
          const touched =
            formik.touched[fieldName as keyof typeof formik.values];
          const error =
            formik.errors[
              fieldName as keyof FormikErrors<typeof formik.values>
            ];

          return (
            <Grid
              xs={
                mobile
                  ? fieldName === 'departure' || fieldName === 'passengers'
                    ? 6
                    : 12
                  : undefined
              }
            >
              {fieldName === 'departure' ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    value={parseISO(value as string)}
                    onChange={(date) => {
                      console.log(date);
                      formik.setFieldValue(
                        fieldName,
                        date
                          ? new Date(
                              date.getTime() - date.getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .split('T')[0]
                          : ''
                      );
                    }}
                    minDate={new Date('2023-06-10')}
                    maxDate={new Date('2023-06-11')}
                    format="dd/MM/yyyy"
                  />
                </LocalizationProvider>
              ) : fieldName === 'passengers' ? (
                <FormControl sx={{ minWidth: 140, width: '100%' }}>
                  <InputLabel id="passengers">passengers</InputLabel>
                  <Select
                    labelId="passengers"
                    id="passengers"
                    label="passengers"
                    value={value}
                    onChange={(event) => {
                      formik.setFieldValue(fieldName, event.target.value);
                    }}
                  >
                    {React.Children.toArray(
                      passengers.map((_, i) => (
                        <MenuItem value={i + 1}>{i + 1}</MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              ) : (
                <Autocomplete
                  fullWidth={mobile ? true : false}
                  options={options[fieldName as keyof typeof options]}
                  sx={{
                    minWidth: 200,
                  }}
                  value={value as string}
                  onChange={(_, newValue) => {
                    formik.setFieldValue(fieldName, newValue);
                    fieldName === 'from' ? onChange(newValue) : null;
                  }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      name={fieldName}
                      label={fieldName[0].toUpperCase() + fieldName.slice(1)}
                      error={touched && Boolean(error)}
                      helperText={touched && error ? error : ''}
                    />
                  )}
                />
              )}
            </Grid>
          );
        })
      )}
      <Grid>
        <Button
          onClick={() => formik.handleSubmit()}
          variant="contained"
          sx={{
            paddingY: '16px',
          }}
        >
          Search fligths
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
