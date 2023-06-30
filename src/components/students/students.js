import React from 'react';
import { Box, Button, Grid, Link } from '@mui/material';

import { NavLink } from 'react-router-dom';
import {
  getActiveStudents,
  getAppliedStudents,
} from '../../services/students/students';
import { ChooseCoachModal } from './choose-coach-modal';
import { AddStudentModal } from './add-student-modal';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import DynamicTabs from '../table-layout/dynamicTabs';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { DeactivateStudentModal } from '../inactive-rejected/student-activate-button/student-activate-button';

const COLUMNS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    render: (value, row, refreshTable) => {
      const { id } = row;
      return (
        <NavLink to="/student-info" state={{ studentId: id }}>
          {value}
        </NavLink>
      );
    },
  },
  {
    id: 'lastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
  },
  {
    id: 'studentCellPhone',
    disablePadding: false,
    label: 'Student Cell',
    align: 'left',
  },
  {
    id: 'coachFirstName',
    disablePadding: false,
    label: 'Coach',
    align: 'left',
    // render: (value) => <ChooseCoachModal coachName={value} />,
  },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    render: (value, row, refreshTable) => (
      <DeactivateStudentModal
        studentId={value}
        onStudentDeactivate={refreshTable}
      />
    ),
  },
  {
    id: 'Choose Coach',
    disablePadding: false,
    label: '',
    align: 'left',
    render: () => <ChooseCoachModal />,
    active: false,
  },
];

export function Students() {
  const [tabValue, setTabValue] = React.useState(0);

  const requestFunc = async () => {
    const activeStudents = await getActiveStudents();

    return { data: [...activeStudents.data] };
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Students">
            <DynamicTabs
              tabNames={['Active', 'Applicant']}
              tabValue={tabValue}
              handleTabChange={setTabValue}
            />
            <Box sx={{ width: '100%' }}>
              {tabValue === 0 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  filterBy={[
                    'firstName',
                    'lastName',
                    'email',
                    'studentCellPhone',
                    'coach',
                  ]}
                  requestFunc={requestFunc}
                  customTableMaxHeight={520}
                >
                  <AddStudentModal />
                </DynamicTableWithRequest>
              )}
              {tabValue === 1 && (
                <DynamicTableWithRequest
                  columns={COLUMNS}
                  filterBy={[
                    'firstName',
                    'lastName',
                    'email',
                    'studentCellPhone',
                    'coach',
                  ]}
                  requestFunc={getAppliedStudents}
                  customTableMaxHeight={520}
                >
                  <AddStudentModal />
                </DynamicTableWithRequest>
              )}
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
