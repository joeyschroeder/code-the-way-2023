import React from 'react';
import { Box, Grid, Button, Link } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { NavLink } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { EntitlementRestricted } from '../entitlement-restricted/entitlement-restricted';
import { getActiveCoaches } from '../../services/coaches/coaches';
import { DynamicTableWithRequest } from '../table-layout/dynamicTableWithRequest';
import { DeactivateCoachModal } from './de-activate-coach-modal';
import { GenericViewModal } from '../shared/generic-view-modal';
import { getStudentsByCoachId } from '../../services/students/students';
import { AddCoachModal } from './add-coach-modal';
import { EditCoachModal } from './edit-coach-modal';

const STUDENTCOLUMNS = [
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
    render: (value, row) => (
      <NavLink to="/student-info" state={{ studentId: row.id }}>
        {value}
      </NavLink>
    ),
  },
  {
    id: 'lastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
    active: false,
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    render: (value) => <Link href={`mailto:${value}`}>{value}</Link>,
    active: false,
  },
  {
    id: 'studentCellPhone',
    disablePadding: false,
    label: 'Student Cell',
    align: 'left',
    active: false,
  },
];
const studentTableMaxHeight = 440;

const COLUMNS = [
  {
    id: 'coachFirstName',
    disablePadding: false,
    label: 'First Name',
    align: 'left',
    active: false,
  },
  {
    id: 'coachLastName',
    disablePadding: false,
    label: 'Last Name',
    align: 'left',
    active: false,
  },
  {
    id: 'coachEmail',
    disablePadding: false,
    label: 'Email',
    align: 'left',
    active: false,
  },
  {
    id: 'coachPhoneNumber',
    disablePadding: false,
    label: 'Phone',
    align: 'left',
    active: false,
  },
  {
    id: 'id',
    active: false,
    render: (id) => {
      return (
        <GenericViewModal
          openButtonIcon={<InfoOutlinedIcon />}
          modalHeadingTitle="View Students"
          viewModalWidth={900}
        >
          <DynamicTableWithRequest
            columns={STUDENTCOLUMNS}
            requestFunc={getStudentsByCoachId}
            filterBy={['firstName', 'lastName', 'email', 'studentCellPhone']}
            customTableMaxHeight={studentTableMaxHeight}
            requestData={id}
          />
        </GenericViewModal>
      );
    },
  },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    render: (value, row, refreshTable) => {
      return (
        <EditCoachModal
          coachId={value}
          coach={row}
          onCoachEdit={refreshTable}
        />
      );
    },
  },
  {
    id: 'id',
    disablePadding: false,
    label: '',
    align: 'left',
    render: (value, row, refreshTable) => {
      return (
        <DeactivateCoachModal
          coachId={value}
          coachEmail={row[2]}
          onCoachDeactivate={refreshTable}
        />
      );
    },
  },
];

export function Coaches() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <EntitlementRestricted>
          <Layout title="Coaches">
            <Box sx={{ width: '100%' }}>
              <DynamicTableWithRequest
                columns={COLUMNS}
                requestFunc={getActiveCoaches}
                filterBy={[
                  'coachFirstName',
                  'coachLastName',
                  'coachEmail',
                  'coachPhoneNumber',
                ]}
                customTableMaxHeight={520}
              >
                <AddCoachModal />
              </DynamicTableWithRequest>
            </Box>
          </Layout>
        </EntitlementRestricted>
      </Grid>
    </Grid>
  );
}
