import { OceanBackground } from "./theme/OceanBackground";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <OceanBackground>
      <div className="flex min-h-screen items-center justify-center px-5 text-[#10243d]">
      <div className="game-card w-full max-w-md p-7 text-center">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#d8e1eb] border-t-[#2f9c95]" />
        <p className="text-lg font-semibold text-[#253247]">{message}</p>
      </div>
    </div>
    </OceanBackground>
  );
}
