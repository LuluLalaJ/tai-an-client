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


export const convertToEDTISOString = (dateString) =>{
  // Convert the given string to a Date object
  var originalDate = new Date(dateString);

  // Convert the date to the Eastern Daylight Time (EDT) timezone
  var easternOffset = -4 * 60; // Offset for Eastern Daylight Time (EDT) is -4 hours
  var easternDate = new Date(
    originalDate.getTime() + easternOffset * 60 * 1000
  );

  // Format the date into the desired ISO string format with offset
  var offsetString = easternDate.toISOString().replace("Z", "-04:00");

  return offsetString;
}
