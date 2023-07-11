import React, { useEffect } from 'react';
import { Box, Grid, Link } from '@mui/material';

import { NavLink } from 'react-router-dom';
import {
  getActiveStudents,
  getAppliedStudents,
} from '../../services/students/students';
import {
  ActivateStudentModal,
  RejectStudentModal,
} from './accept-reject-student-modal';
import { ArchiveStudentModal } from './archive-student-modal';
import { AddStudentModal } from './add-student-modal';
import { ChooseCoachModal } from './choose-coach-modal';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import DynamicTabs from '../table-layout/dynamicTabs';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { getActiveCoachesHandler } from '../coaches/coachHandlers';

const OPTIONS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    render: (value, refreshTable, row) => {
      const { id } = row;
      return (
        <React.Fragment>
          <ArchiveStudentModal
            studentId={id}
            onStudentDeactivate={refreshTable}
          />{' '}
          <NavLink to="/student-info" state={{ studentId: id }}>
            {value}
          </NavLink>
        </React.Fragment>
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
    id: 'options',
    disablePadding: false,
    align: 'left',
    render: (value, row, refreshTable) => {
      const { id } = row;
      return (
        <React.Fragment>
          <ActivateStudentModal
            studentId={id}
            onStudentActivate={refreshTable}
          />
          <RejectStudentModal studentId={id} onStudentReject={refreshTable} />
        </React.Fragment>
      );
    },
  },
];

export function Students() {
  const [tabValue, setTabValue] = React.useState(0);
  const [activeCoaches, setActiveCoaches] = React.useState([]);

  const requestActiveStudentsFunc = async () => {
    const activeStudents = await getActiveStudents();
    return { data: [...activeStudents.data] };
  };

  const requestActiveCoaches = async () => {
    const response = await getActiveCoachesHandler();
    const { data } = response;
    setActiveCoaches(data);
  };

  useEffect(() => {
    requestActiveCoaches();
  }, []);

  const COLUMNS = [
    {
      id: 'firstName',
      disablePadding: false,
      label: 'First Name',
      align: 'left',
      render: (value, row, refreshTable) => {
        const { id } = row;
        return (
          <React.Fragment>
            <ArchiveStudentModal
              studentId={id}
              onStudentDeactivate={refreshTable}
            />{' '}
            <NavLink to="/student-info" state={{ studentId: id }}>
              {value}
            </NavLink>
          </React.Fragment>
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
      id: 'id',
      disablePadding: false,
      label: 'Coach',
      align: 'left',
      render: (value, row, refreshTable) => (
        <React.Fragment>
          {row.coachFirstName}
          <ChooseCoachModal
            coaches={activeCoaches}
            studentId={value}
            refreshTable={refreshTable}
          />
        </React.Fragment>
      ),
    },
    // {
    //   id: 'options',
    //   disablePadding: false,
    //   label: '',
    //   align: 'left',
    //   render: (value) => <ChooseCoachModal coachName={value} />,
    // },
  ];

  console.log('activeCoaches', activeCoaches);

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
                  requestFunc={requestActiveStudentsFunc}
                  customTableMaxHeight={520}
                >
                  <AddStudentModal />
                </DynamicTableWithRequest>
              )}
              {tabValue === 1 && (
                <DynamicTableWithRequest
                  columns={OPTIONS}
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
