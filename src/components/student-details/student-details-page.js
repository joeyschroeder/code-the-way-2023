import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import propTypes from 'prop-types';
import { Box, Tab } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { CommunicationLog } from './communication-log';
import { CommuinicationSearchBar } from './communication-search';
import { GoalsBox, StudentInfoBox } from './student-info-box';
import AddCommunicationsModal from './addCommunicationModal';
import { getStudentCommunicationsHandler } from '../communications/communicationsHandler';
// import DynamicTabs from '../table-layout/dynamicTabs';
// import Goal from './goal';
// import AddGoalModal from './addGoalMoal';

// StudentDetails is meant to be a 'skeleton' that controls page layout
// Nothing in here should be hard-coded, should be passed via props
export default function StudentDetails(props) {
  const { student, goals, careers, interviews, communications, onReload } =
    props;
  const [tabValue, setTabValue] = React.useState(0);
  const studentID = student.id;

  let communicationList = [];
  let communicationData = [];

  const handleChange = React.useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const [commsLog, setCommsLog] = React.useState({});
  const requestCommsLog = async (id) => {
    const response = await getStudentCommunicationsHandler(id);
    const { data } = response;
    setCommsLog(data);
  };

  useEffect(() => {
    requestCommsLog(studentID);
  }, [studentID]);

  console.log('communication loging description---------------', commsLog);

  communicationList = [];
  Object.entries(commsLog).forEach((comm) => {
    communicationData = [];

    if (student.coach != null) {
      communicationData.push(
        `${student.coach.coachFirstName} ${student.coach.coachLastName}`
      ); // 0
    }

    communicationData.push(comm[1].communicationId); // 1
    const date = new Date(comm[1].created);
    communicationData.push(date.toLocaleDateString('en-US')); // 2

    communicationData.push(comm[1].description); // 3
    communicationData.push(comm[1].studentId); // 4
    communicationData.push(comm[1].topic); // 5
    communicationList.push(communicationData);
  });

  console.log('communicationList', communicationList);

  const boxStyle = React.useMemo(
    () => ({
      bgcolor: '#dddddd',
      minWidth: '100%',
      color: '#000000',
      position: 'relative',
      minHeight: '70vh',
      borderRadius: '10px',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
    }),
    []
  );

  const tabStyle = React.useMemo(
    () => ({
      bgcolor: '#3E4C61',
      color: '#ffffff',
      position: 'relative',
      display: 'flex',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      minWidth: '10vw',
      margin: '0 10px',
      '&.Mui-selected': {
        color: '#0000000',
        bgcolor: '#ffffff',
      },
    }),
    []
  );

  const iconStyle = React.useMemo(
    () => ({
      bgcolor: '#3E4C61',
      color: '#ffffff',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 40,
      minHeight: 40,
      borderRadius: '5px',
    }),
    []
  );

  return (
    <Grid
      container
      direction="row"
      display="flex"
      sx={{ flexWrap: 'nowrap', mt: '50px' }}
    >
      <Grid item xs={6} direction="row">
        <Grid container justifyContent="center">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            <Tab sx={tabStyle} value={0} label="Student Info" />
            <Tab sx={tabStyle} value={1} label="Goals and Careers" />
            <Tab sx={tabStyle} value={2} label="Interview Info" />
          </Tabs>
        </Grid>

        {/* <DynamicTabs
          tabNames={['Student Info', 'Goals and Careers', 'Interview Info']}
          tabValue={tabValue}
          handleTabChange={setTabValue}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        /> */}

        <Grid item justifyContent="center">
          <Box sx={boxStyle} padding="4vh">
            {tabValue === 0 && (
              <Grid>
                <StudentInfoBox student={student} onReload={() => onReload()} />
                <StudentInfoBox
                  student={student}
                  onReload={() => onReload()}
                  isParent
                />
              </Grid>
            )}

            {tabValue === 1 && (
              <GoalsBox student={student} onReload={() => onReload()} />
            )}

            {tabValue === 2 && (
              <Box> Placeholder </Box>
              // TO BE DEPRECATED
              // Should be part of its own component

              // <React.Fragment>
              //   <h1>Interviews</h1>
              //   <Grid>
              //     {(interviews === null ||
              //       interviews === undefined ||
              //       interviews === {}) && <h6>No Interviews</h6>}
              //     {interviews !== null &&
              //       interviews !== undefined &&
              //       [interviews].map((interview) => {
              //         return (
              //           <h6 key={interview.id}>
              //             Interview: {interview.goalSet}
              //           </h6>
              //         );
              //       })}
              //   </Grid>
              // </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container xs={1}>
        <Grid item alignItems="flex-front" sx={{ pl: '510%' }}>
          <CommuinicationSearchBar student={student.id} />
        </Grid>
        <Grid item alignItems="flex-end" sx={{ pl: '510%' }}>
          <AddCommunicationsModal student={student} />
        </Grid>

        <Grid item sx={{ ml: '10%' }}>
          {console.log(communications)}
          <CommunicationLog data={communicationList} />
        </Grid>
      </Grid>
    </Grid>
  );
}

StudentDetails.propTypes = {
  student: propTypes.object,
  goals: propTypes.object,
  careers: propTypes.object,
  interviews: propTypes.object,
  communications: propTypes.object,
  onReload: propTypes.func,
};
StudentDetails.defaultProps = {
  student: undefined,
  goals: undefined,
  careers: undefined,
  interviews: undefined,
  communications: undefined,
  onReload: undefined,
};
