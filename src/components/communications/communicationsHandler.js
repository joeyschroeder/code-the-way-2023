import { v4 as uuidv4 } from 'uuid';
import {
  addCommunication,
  getCoachCommunications,
  getStudentCommunications,
} from '../../services/communications/communications';

export function getCoachCommunicationsHandler(coachId) {
  return getCoachCommunications(coachId);
}

export function getStudentCommunicationsHandler(studentId) {
  return getStudentCommunications(studentId);
}

export function addCommunicationHandler(
  studentId,
  coachId,
  topic,
  description,
  created
) {
  const communication = {
    communicationId: uuidv4(),
    studentId,
    coachId,
    topic,
    description,
    created,
  };
  return addCommunication(communication);
}

export function editCommunicationHandler(
  communicationId,
  studentId,
  coachId,
  topic,
  description,
  created
) {
  const communication = {
    communicationId,
    studentId,
    coachId,
    topic,
    description,
    created,
  };
  return addCommunication(communication);
}
