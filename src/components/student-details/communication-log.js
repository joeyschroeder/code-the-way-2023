import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import { Grid } from '@mui/material';
import CommunicationBox from './communication-box';

export function CommunicationLog(props) {
  const { data } = props;

  const renderCommunicationBox = ({ index, style }) => {
    const dat = data[index];

    return (
      <div style={style}>
        <CommunicationBox
          key={dat[0]}
          date={dat[0]}
          coach={dat[0]}
          topic={dat[0]}
          notes={dat[0]}
        />
      </div>
    );
  };

  return (
    <Grid
      container
      item
      sx={{
        position: 'relative',

        // mr: '0.1%',
        ml: '0.1%',
      }}
    >
      <List
        height={850} // Adjust the height as per your requirements
        itemCount={data.length}
        itemSize={300} // Adjust the item size as per your requirements
        style={{ width: '1090px' }}
      >
        {renderCommunicationBox}
      </List>
    </Grid>
  );
}

CommunicationLog.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};
