export const getAge = (timeStamp: number): number => {
  const currentYear = new Date();
  const dob = new Date(timeStamp);
  let age = currentYear.getFullYear() - dob.getFullYear();
  const monthDiff = currentYear.getMonth() - dob.getMonth();
  const dayDiff = currentYear.getDate() - dob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};
