import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { pink } from '@mui/material/colors';
import PropTypes from 'prop-types';

export function TextFieldWithErrorMessage(props) {
  const { value, error, label, onChange, errorMessage } = props;

  return (
    <Grid item align="center">
      <TextField
        error={error}
        size="small"
        id="filled-basic"
        variant="outlined"
        label={label}
        value={value}
        sx={{ color: 'white', my: 1 }}
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
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
};

TextFieldWithErrorMessage.defaultProps = {
  error: false,
  label: '',
  value: '',
  onChange: () => {},
  errorMessage: '',
};
