export const ErrorMessage = ({ message, classes }) => {
  const baseClasses = "text-xs text-red-600";

  const combinedClasses = `${baseClasses} ${classes}`;

  return <p className={combinedClasses}>{message}</p>;
};

export const SuccessMessage = ({ message, classes }) => {
  const baseClasses = "text-xs text-green-600";

  const combinedClasses = `${baseClasses} ${classes}`;

  return <p className={combinedClasses}>{message}</p>;
};
