export const getEnrollmentId = (currentEnrollments, studentId) => {
  const foundEnrollment = currentEnrollments.find(
    (enrollment) => enrollment.student_id === studentId
  );
  return foundEnrollment ? foundEnrollment.id : null;
};

export const checkStudentEnrollment = (currentEnrollments, studentId) => {
    const foundEnrollment = currentEnrollments.find(
      (enrollment) => enrollment.student_id === studentId
    );
    return foundEnrollment ? foundEnrollment.status : null;
  };
