'use client';
import { Box, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface InfoFieldProps {
  title: string;
  name: string;
  icon?: ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ title, name, icon }) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        border: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        display: 'flex',
        minWidth: 150,
      }}
    >
      <Stack direction="column">
        <Typography sx={{ color: '#5a6472' }} variant="body2">
          {title}
        </Typography>
        <Typography>{name}</Typography>
      </Stack>
      {icon ? <Box marginLeft="auto">{icon}</Box> : null}
    </Box>
  );
};

export default InfoField;
