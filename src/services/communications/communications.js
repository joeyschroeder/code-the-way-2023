import { callApi } from '../../utils/call-api/call-api';

export const getCommunicationsByStudentId = (studentId) =>
  callApi({ url: `/Communications/GetStudentCommunications/${studentId}` });

export const addCommunications = (communication) =>
  callApi({
    url: '/Communications',
    data: communication,
    method: 'POST',
  });
