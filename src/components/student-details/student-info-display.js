import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import dayjs from 'dayjs';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import EditStudentInfoModal, {
  EditParentModal,
} from './edit-student-info-modal';
import Goal from './goals/goal';
import { altGetStudentGoalsHandler } from './goals/goalHandlers';
import { LayoutPreloader } from '../layout/layout-preloader/layout-preloader';
import { LayoutError } from '../layout/layout-error/layout-error';
import { AddGoalModal } from './goals/goal-modals';
import { Career } from './careers/career';
import { getStudentCareersHandler } from './careers/careerHandlers';
import { AddCareerModal } from './careers/career-modals';

/**
 * StudentInfoBox (student-info-display.js) is in the smaller, left-most box of student info.
 * It displays the basic student information and is the first box shown when student details are viewed.
 */
export function StudentInfoBox(props) {
  const { student, onReload, isParent } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredPhone, setPreferredPhone] = useState('');
  const [email, setEmail] = useState('');
  // Student-specific information:
  const [studentDateOfBirth, setStudentDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(''); // check if creating state var causes error
  const [zipCode, setZipCode] = useState('');

  // useEffect gets names again when the student is updated
  useEffect(() => {
    if (isParent) {
      student.parentFirstName !== null
        ? setFirstName(student.parentFirstName)
        : setFirstName(' ');
      student.parentLastName !== null
        ? setLastName(student.parentLastName)
        : setLastName(' ');
      setAddress(student.address);
      setApartmentNumber(student.parentApartmentNumber);
      setCity(student.parentCity);
      setState(student.parentState);
      setZipCode(student.parentZipCode);
      setEmail(student.parentEmail);
      setPreferredPhone(student.parentCellPhone);
    } else {
      setFirstName(student.studentFirstName);
      setLastName(student.studentLastName);
      setStudentDateOfBirth(student.studentDateOfBirth);
      setAddress(student.studentAddress);
      setApartmentNumber(student.studentApartmentNumber);
      setCity(student.studentCity);
      setState(student.studentState);
      setZipCode(student.studentZipCode);
      setPreferredPhone(student.studentCellPhone);
      setEmail(student.studentEmail);
    }
  }, [isParent, student]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  return (
    <Grid>
      <Grid container direction="column" width={{ xs: '85vw', md: '45vw' }}>
        <Grid item>
          {!isParent && (
            <Grid item>
              <Typography fontSize="2vw">
                {`${firstName} ${lastName}`}&#39;s Details{' '}
                <EditStudentInfoModal
                  student={student}
                  onSaveSuccess={() => onReload()}
                />
              </Typography>
              <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
            </Grid>
          )}
        </Grid>
        <Grid item>
          {isParent && (
            <Grid item>
              <Divider variant="middle" sx={{ borderBottomWidth: '2px' }} />
              <Typography component="span" fontSize="2vw">
                Parent Information{' '}
                <EditParentModal
                  student={student}
                  onSaveSuccess={() => onReload()}
                />
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid container m="1vw">
          <Grid item xs={5}>
            {!isParent ? (
              <Typography component="span">
                Date of Birth:{' '}
                <Typography color="#959595">
                  {dayjs(studentDateOfBirth).format('MMM DD, YYYY')}
                </Typography>
                <Typography color="#959595">
                  Age: {calculateAge(studentDateOfBirth)}
                </Typography>
              </Typography>
            ) : (
              <Typography component="span" fontSize="16px">
                Parent Name:
                <Typography color="#959595">{`${firstName} ${lastName}`}</Typography>
              </Typography>
            )}
          </Grid>
          <Grid item xs={7}>
            <Typography component="span">Email:</Typography>
            <Typography color="#959595">{email}</Typography>
          </Grid>
        </Grid>

        <Grid container m="1vw">
          <Grid item xs={5}>
            <Typography>Address:</Typography>
            <Typography color="#959595">
              {address}{' '}
              {apartmentNumber !== '' && apartmentNumber !== null && (
                <React.Fragment>Apt. {apartmentNumber}</React.Fragment>
              )}
            </Typography>
            <Typography color="#959595">
              {city == null && state == null && zipCode == null
                ? ''
                : `${city}, ${state} ${zipCode}`}
            </Typography>
          </Grid>

          <Grid item xs={7}>
            <Typography component="span">
              Preferred Phone Number:
              <Typography color="#959595">{preferredPhone}</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

/**
 * GoalsBox (student-info-display.js) is in the smaller, left-most box of student info.
 * It displays goals in the student details page.
 */
export function GoalsBox(props) {
  const { student } = props;

  const [allGoals, setAllGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fetchGoals = () => {
    console.log('fetchGoals triggered');
    setIsLoading(true);
    setHasError(false);
    setAllGoals([]);

    // altGetStudentGoalsHandler uses callbacks
    // I have no clue why it didn't work with the regular one.
    altGetStudentGoalsHandler(student.id, (goals, error) => {
      if (error) {
        setHasError(true);
      } else {
        setAllGoals(goals.data);
      }

      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchGoals();
  }, [student.id]);
  if (isLoading)
    return (
      <Grid width={{ xs: '85vw', md: '45vw' }}>
        <LayoutPreloader />
      </Grid>
    );
  if (hasError) return <LayoutError />;

  const goalsDate = allGoals.map((goal) => goal.goalReviewDate);
  const sortedGoalsDate = goalsDate.sort();

  const compareDates = (a, b) => {
    const aIndex = sortedGoalsDate.indexOf(a.goalReviewDate);
    const bIndex = sortedGoalsDate.indexOf(b.goalReviewDate);

    return aIndex - bIndex;
  };

  const reorderedArray = allGoals.sort(compareDates);

  const goalData = reorderedArray.map((goalContent) => (
    <Goal
      key={goalContent.id}
      goal={goalContent}
      onSaveSuccess={() => fetchGoals()}
    />
  ));

  // FIXME Item size must change whenever the size of the goals themselves change.

  if (allGoals.length === 0) {
    return (
      <Grid>
        <Grid container width={{ xs: '85vw', md: '45vw' }}>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              <Typography fontSize="2vw">
                {student.studentFirstName} {student.studentLastName}&apos;s
                Goals
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <AddGoalModal
                student={student}
                onSaveSuccess={() => fetchGoals()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography>No goals found</Typography>
      </Grid>
    );
  }

  return (
    <Box>
      <Grid container width={{ xs: '85vw', md: '45vw' }}>
        <Grid item container xs={12}>
          <Grid item xs={11}>
            <Typography fontSize="2vw">
              {student.studentFirstName} {student.studentLastName}&apos;s Goals
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <AddGoalModal
              student={student}
              onSaveSuccess={() => fetchGoals()}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxHeight: '54vh',
          overflowY: 'auto',
        }}
      >
        {goalData}
      </Box>
    </Box>
  );
}

/**
 * CareerBox (student-info-display.js) is in the smaller, left-most box of student info.
 * It displays careers in the student details page.
 */
export function CareerBox(props) {
  const { student } = props;

  const [allCareers, setAllCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchCareer = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await getStudentCareersHandler(student.id);
      const { data } = response;
      setAllCareers(data);
    } catch (error) {
      setHasError(true);
      console.log('error in CareersBox', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCareer();
  }, [student.id]);

  if (isLoading)
    return (
      <Grid width={{ xs: '85vw', md: '45vw' }}>
        <LayoutPreloader />
      </Grid>
    );
  if (hasError) return <LayoutError />;

  const careerContent = allCareers.map((career) => (
    <Career
      key={career.id}
      career={career}
      onSaveSuccess={() => fetchCareer()}
    />
  ));

  if (allCareers.length === 0) {
    return (
      <Grid>
        <Grid container width={{ xs: '85vw', md: '45vw' }}>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              <Typography fontSize="2vw">
                {student.studentFirstName} {student.studentLastName}&apos;s
                Careers
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <AddCareerModal
                student={student}
                onSaveSuccess={() => fetchCareer()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography>No careers found</Typography>
      </Grid>
    );
  }

  return (
    <Box>
      <Grid container width={{ xs: '85vw', md: '45vw' }}>
        <Grid item container xs={12}>
          <Grid item xs={11}>
            <Typography fontSize="2vw">
              {student.studentFirstName} {student.studentLastName}&apos;s
              Careers
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <AddCareerModal
              student={student}
              onSaveSuccess={() => fetchCareer()}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxHeight: '53vh',
          overflowY: 'auto',
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            {careerContent}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

StudentInfoBox.propTypes = {
  student: propTypes.object,
  onReload: propTypes.func,
  isParent: propTypes.bool,
};
StudentInfoBox.defaultProps = {
  student: undefined,
  onReload: undefined,
  isParent: false,
};

CareerBox.propTypes = {
  student: propTypes.object,
  onReload: propTypes.func,
};
CareerBox.defaultProps = {
  student: undefined,
  onReload: undefined,
};

GoalsBox.propTypes = {
  student: propTypes.object,
  onReload: propTypes.func,
};
GoalsBox.defaultProps = {
  student: undefined,
  onReload: undefined,
};
