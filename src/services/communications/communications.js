import { callApi } from '../../utils/call-api/call-api';

export const getCoachCommunications = async (coachId) =>
  callApi({ url: `/Communications/GetCoachCommunications/${coachId}` });

export const getStudentCommunications = async (studentId) =>
  callApi({ url: `/Communications/GetStudentCommunications/${studentId}` });

/**
 * @param {{communicationId:UUID, studentId:UUID, coachId:UUID, topic:string,description:string,created:Date}} communication
 */
export const addCommunication = async (communication) =>
  callApi({ url: '/Communications', data: communication, method: 'POST' });

/**
 * @param {{communicationId:UUID, studentId:UUID, coachId:UUID, topic:string,description:string,created:Date}} communication
 */
export const editCommunication = async (communication) =>
  callApi({ url: '/Communications', data: communication, method: 'PUT' });

/**
 * Communications should not be deleted.
 * @param {UUID} communicationId
 * @returns
 */
export const deleteCommunication = async (communicationId) =>
  callApi({
    url: '/Communications',
    params: communicationId,
    method: 'DELETE',
  });
