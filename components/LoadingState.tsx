interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] px-5 text-[#17202f]">
      <div className="w-full max-w-md rounded-lg border border-[#d8e1eb] bg-white p-7 text-center shadow-[0_20px_70px_rgba(23,32,47,0.10)]">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#d8e1eb] border-t-[#2f9c95]" />
        <p className="text-lg font-semibold text-[#253247]">{message}</p>
      </div>
    </div>
  );
}
