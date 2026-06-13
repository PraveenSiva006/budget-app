type Props = {
  submissionError?: unknown;
};

export function FormSubmissionError({ submissionError, ...rest }: Props) {
  if (!submissionError) return null;

  const message =
    submissionError instanceof Error
      ? submissionError.message
      : "Something went wrong";

  return (
    <p className="text-center text-sm text-destructive mb-1" {...rest}>
      {message}
    </p>
  );
}
