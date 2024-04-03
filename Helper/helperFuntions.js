// Helper function to calculate age based on date of birth
export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const dob = new Date(dateOfBirth);
  const ageDiff = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const age =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())
      ? ageDiff - 1
      : ageDiff;
  return age;
};
