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

// still need to understand string sorting 
export const sortByStringDesc = (array, attriKey) => {
  const newArr = [...array];
  newArr.sort((a, b) => {
    const strA = a[attriKey];
    const strB = b[attriKey];
    if (strA < strB) {
      return 1;
    } else if (strA > strB) {
      return -1;
    }
    return 0;
  });
  return newArr;
};


export const sortByStringAsc = (array, attriKey) => {
  const newArr = [...array];
  newArr.sort((a, b) => {
    const strA = a[attriKey];
    const strB = b[attriKey];
    if (strA > strB) {
      return 1;
    } else if (strA < strB) {
      return -1;
    }
    return 0;
  });
  return newArr;
};
