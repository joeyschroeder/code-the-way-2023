import {
  addGoal,
  deleteGoal,
  editGoal,
  getGoals,
  getStudentGoals,
} from '../../services/goals/goals';

export function getGoalsHandler() {
  getGoals();
}

export function getStudentGoalsHandler(studentId) {
  getStudentGoals(studentId);
}
export function altGetStudentGoalsHandler(studentId, callback) {
  getStudentGoals(studentId)
    .then((goals) => {
      callback(goals, null); // Invoke the callback with goals and no error
    })
    .catch((error) => {
      callback(null, error); // Invoke the callback with null goals and the error
    });
}

export function addGoalHandler(
  id,
  studentId,
  goalSet,
  dateGoalSet,
  sel,
  goalReviewDate,
  wasItAccomplished,
  explanation
) {
  const data = {
    id,
    studentId,
    goalSet,
    dateGoalSet,
    sel,
    goalReviewDate,
    wasItAccomplished,
    explanation,
  };
  addGoal(data);
}

export function editGoalHandler(
  id,
  studentId,
  goalSet,
  dateGoalSet,
  sel,
  goalReviewDate,
  wasItAccomplished,
  explanation
) {
  const data = {
    id,
    studentId,
    goalSet,
    dateGoalSet,
    sel,
    goalReviewDate,
    wasItAccomplished,
    explanation,
  };
  editGoal(data);
}

export function deleteGoalHandler(id) {
  deleteGoal(id);
}
