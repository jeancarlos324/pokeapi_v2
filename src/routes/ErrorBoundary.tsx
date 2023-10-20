import { ErrorInfo, ReactNode, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}
const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  const catchError = (error: Error, info: ErrorInfo) => {
    console.error(error, info);
    console.log(error)
    setHasError(true);
  };
  if (hasError) return <div className="w-screen h-screen bg-black">Error</div>;
  return <>{children}</>;
};

export default ErrorBoundary;
