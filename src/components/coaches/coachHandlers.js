import {
  activateCoach,
  addCoach,
  deactivateCoach,
  deleteCoach,
  editCoach,
  getActiveCoaches,
  getCoachById,
  getInactiveCoaches,
} from '../../services/coaches/coaches';

export function getActiveCoachesHandler() {
  return getActiveCoaches();
}

export function getInactiveCoachesHandler() {
  return getInactiveCoaches();
}

/**
 * Gets all info from the DB.
 *
 * @param {uuid} coachId Coach to get info on.
 * @returns {{id:uuid, userId:string, coachFirstName: string, coachLastName:string, coachEmail: string, coachPhoneNumber:string, active:boolean}}
 * @author Adam Miller
 */
export function getCoachByIdHandler(coachId) {
  return getCoachById(coachId);
}

/**
 * Adds a Coach to the DB
 *
 * @param {string} firstName
 * @param {string} lastName
 * @param {email} email
 * @param {string} phone
 * @param {string} password
 * @param {string} confirmPassword
 *
 * @author Adam Miller
 */
export function addCoachHandler(
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword
) {
  const data = { firstName, lastName, email, phone, password, confirmPassword };
  addCoach(data);
}

/**
 *
 * @param {uuid} id
 * @param {uuid} userId
 * @param {string} coachFirstName
 * @param {string} coachLastName
 * @param {string} coachEmail
 * @param {string} coachPhoneNumber
 * @param {boolean} active  TODO Likely to change to string
 */
export async function editCoachHandler(
  id,
  userId,
  coachFirstName,
  coachLastName,
  coachEmail,
  coachPhoneNumber,
  active
) {
  const coach = {
    id,
    userId,
    coachFirstName,
    coachLastName,
    coachEmail,
    coachPhoneNumber,
    active,
  };
  await editCoach(coach);
}

/**
 * Deletes a coach from the DB. THIS SHOULD NOT BE USED.
 *
 * @param {uuid} coachId
 * @author Adam Miller
 */
export function deleteCoachHandler(coachId) {
  deleteCoach(coachId);
}

/**
 * Activates a Coach in the DB
 *
 * @param {uuid} id
 * @param {string} userName
 * @param {email} email
 * @author Adam Miller
 */
export function activateCoachHandler(id, userName, email) {
  const data = { id, userName, email, status: 'active' };
  activateCoach(data);
}

/**
 * Deactivates a Coach in the DB
 *
 * @param {uuid} id
 * @param {string} userName Should be same as email, but might be different.
 * @param {email} email
 * @author Adam Miller
 */
export function deactivateCoachHandler(id, userName, email) {
  const data = { id, userName, email, status: 'inactive' };
  deactivateCoach(data);
}
