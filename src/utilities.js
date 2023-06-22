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


export const sortByDateDesc= (array, dateKey) => {
  const newArr = [...array]
  newArr.sort((a, b) => {
    const dateA = new Date(a[dateKey]);
    const dateB = new Date(b[dateKey]);
    return dateB - dateA;
  });
  return newArr
}

export const sortByDateAsc = (array, dateKey) => {
  const newArr = [...array];
  newArr.sort((a, b) => {
    const dateA = new Date(a[dateKey]);
    const dateB = new Date(b[dateKey]);
    return dateA - dateB;
  });
  return newArr;
};
