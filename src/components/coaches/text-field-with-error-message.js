import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { pink } from '@mui/material/colors';
import PropTypes from 'prop-types';

export function TextFieldWithErrorMessage(props) {
  const { value, error, label, onChange, select, errorMessage } = props;

  return (
    <Grid item align="center">
      <TextField
        error={error}
        select={select}
        size="small"
        id="filled-basic"
        variant="outlined"
        label={label}
        value={value}
        sx={{ color: 'white' }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {error && (
        <Grid item align="center" sx={{ pt: 2 }}>
          <Typography sx={{ color: pink[500] }}>{errorMessage}</Typography>
        </Grid>
      )}
    </Grid>
  );
}

TextFieldWithErrorMessage.propTypes = {
  error: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  select: PropTypes.bool,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
};

TextFieldWithErrorMessage.defaultProps = {
  error: false,
  label: '',
  value: '',
  select: false,
  onChange: () => {},
  errorMessage: '',
};
