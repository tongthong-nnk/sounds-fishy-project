import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  message: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] px-5 text-[#17202f]">
      <div className="w-full max-w-lg rounded-lg border border-[#f0b4ae] bg-white p-7 shadow-[0_20px_70px_rgba(23,32,47,0.10)]">
        <p className="text-sm font-semibold uppercase text-[#a33e38]">
          Room unavailable
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#121a27]">{title}</h1>
        <p className="mt-4 leading-7 text-[#465365]">{message}</p>
        <Link
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#253247] px-5 font-bold text-white transition hover:bg-[#17202f] focus:outline-none focus:ring-4 focus:ring-[#253247]/25"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
