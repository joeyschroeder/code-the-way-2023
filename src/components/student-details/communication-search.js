import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { getStudentCommunicationsHandler } from '../communications/communicationsHandler';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export function CommuinicationSearchBar(props) {
  const { student } = props;
  // Stage 1
  const filterBy = [
    'communicationId',
    'studentId',
    'coachId',
    'topic',
    'description',
    'created',
  ];
  // requestFunc={getStudentCommunications()} get the id of the current student
  // Stage 2 - use row
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  const request = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await getStudentCommunicationsHandler(student);
      const { data } = response;
      setRows(data);
    } catch (error) {
      setRows([]);
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    request();
  }, []);

  // if (isLoading) {
  //     return (<LayoutPreloader />)
  // } else if{(hasError) return( <LayoutError />)}
  // Stage 3
  const [logRows, setLogRows] = useState(rows);

  /**
   * The function `requestSearch` filters an array of log rows based on a searched value and updates
   * the log rows with the filtered results.
   * @param searchedVal - The searchedVal parameter is the value that is being searched for in the
   * logRows array. It is the input value that the user wants to filter the logRows by.
   */
  const requestSearch = (searchedVal) => {
    const lowerFilterInput = String(searchedVal).toLowerCase();

    const filteredRows = logRows.filter((row) => {
      return filterBy.some((key) => {
        const value = row[key];
        const lowerValue = String(value).toLowerCase();
        return lowerValue.includes(lowerFilterInput);
      });
    });
    setLogRows(filteredRows);
  };
  // last State - get report styling stuff
  return (
    <Search sx={{ border: 1.5 }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        onChange={(event) => {
          requestSearch(event.target.value);
        }}
      />
    </Search>
  );
}
CommuinicationSearchBar.propTypes = {
  student: PropTypes.string,
};

CommuinicationSearchBar.defaultProps = {
  student: '',
};
