import { callApi } from '../../utils/call-api/call-api';

export const getCoachCommunications = (coachId) =>
  callApi({ url: `/Communications/GetCoachCommunications/${coachId}` });

export const getStudentCommunications = (studentId) =>
  callApi({ url: `/Communications/GetStudentCommunications/${studentId}` });

/**
 * @param {{communicationId:UUID, studentId:UUID, coachId:UUID, topic:string,description:string,created:Date}} communication
 */
export const addCommunication = (communication) =>
  callApi({ url: '/Communications', data: communication, method: 'POST' });

/**
 * @param {{communicationId:UUID, studentId:UUID, coachId:UUID, topic:string,description:string,created:Date}} communication
 */
export const editCommunication = (communication) =>
  callApi({ url: '/Communications', data: communication, method: 'PUT' });

/**
 * Communications should not be deleted.
 * @param {UUID} communicationId
 * @returns
 */
export const deleteCommunication = (communicationId) =>
  callApi({
    url: '/Communications',
    params: communicationId,
    method: 'DELETE',
  });
