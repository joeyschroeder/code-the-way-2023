import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import StudentDetails from './student-details-page';
import { getStudentById } from '../../services/students/students';
import { CircularProgressOverlay } from '../circular-progress-overlay/circular-progress-overlay';
import { getStudentInterviews } from '../../services/interviews/interviews';
import { LayoutError } from '../layout/layout-error/layout-error';
import { getStudentCommunicationsHandler } from '../communications/communicationsHandler';
import { getStudentGoalsHandler } from './goalsHandler';
import { getStudentGoals } from '../../services/goals/goals';
import { getStudentCareersHandler } from './careersHandler';

export function StudentInfo() {
  const [student, setStudent] = useState({});
  const [goals, setGoals] = useState({});
  const [careers, setCareers] = useState({});
  const [interviews, setInterviews] = useState({});
  const [communications, setCommunications] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const location = useLocation();
  const { studentId } = location.state;

  const requestStudent = async (id) => {
    try {
      console.log('testing!');
      setHasError(false);
      setIsLoading(true);
      const response = await getStudentById(id);
      const { data } = response;
      setStudent(data.student);
      const goalsResponse = await getStudentGoalsHandler(id);
      setGoals(goalsResponse);
      console.log(goalsResponse);
      // const careerData = {
      //   studentCareerPath: data.student.studentCareerPath,
      //   studentCareerInterest: data.student.studentCareerInterest,
      //   careerPathList: data.student.careerPathList,
      //   careerDeclaration: data.student.careerDeclaration,
      // };
      const careersResponse = await getStudentCareersHandler(id);
      setCareers(careersResponse);
      console.log(getStudentCareersHandler(id));
      const interviewResponse = await getStudentInterviews(id);
      const { interviewData } = interviewResponse;
      setInterviews(interviewData);
      const communicationResponse = await getStudentCommunicationsHandler(
        data.student.id
      );
      const { communicationData } = communicationResponse;
      setCommunications(communicationData);
      console.log(communicationData);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    requestStudent(studentId);
  }, [studentId]);

  // Memoize the student details component to prevent unnecessary re-renders
  const memoizedStudentDetails = useMemo(
    () => (
      <StudentDetails
        student={student}
        goals={goals}
        careers={careers}
        interviews={interviews}
        communications={communications}
        onReload={() => requestStudent(studentId)}
      />
    ),
    [student, goals, careers, interviews, communications, studentId]
  );

  if (isLoading) return <CircularProgressOverlay />;
  if (hasError) return <LayoutError />;

  return <div>{memoizedStudentDetails}</div>;
}
