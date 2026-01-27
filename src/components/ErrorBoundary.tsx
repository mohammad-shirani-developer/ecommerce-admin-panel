"use client";

import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error("Error caught by Error Boundary:", error, errorInfo);
    setHasError(true);
    setErrorMessage(error.message);
  };

  return (
    <ErrorBoundaryFallback hasError={hasError} errorMessage={errorMessage}>
      {children}
    </ErrorBoundaryFallback>
  );
};

const ErrorBoundaryFallback: React.FC<{
  hasError: boolean;
  errorMessage: string | null;
  children: React.ReactNode;
}> = ({ hasError, errorMessage, children }) => {
  if (hasError) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">مشکلی پیش آمده است</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
