import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import { Grid } from '@mui/material';
import CommunicationBox from './communication-box';

export function CommunicationLog(props) {
  const { data } = props;

  const renderCommunicationBox = ({ index, style }) => {
    const dat = data[index];

    // try not using ths 2d array
    return (
      <div style={style}>
        <CommunicationBox
          coach={dat[0]}
          key={dat[1]}
          date={dat[2]}
          notes={dat[3]}
          topic={dat[5]}
        />
      </div>
    );
  };

  //  using 1d array here, i hope
//   return (
//     <React.Fragment>
//       {data.map((datas) => (
//         <div key={datas.id} style={style}>
//           <CommunicationBox
//             coach={datas.coachId}
//             date={datas.created}
//             notes={datas.description}
//             topic={datas.topic}
//           />
//         </div>
//       ))}
//     </React.Fragment>
//   );
// };

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
