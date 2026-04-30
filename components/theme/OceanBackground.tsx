import type { ReactNode } from "react";
import { FishMascot } from "./FishMascot";

interface OceanBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function OceanBackground({
  children,
  className = "",
}: OceanBackgroundProps) {
  return (
    <div className={`ocean-shell ${className}`}>
      <div aria-hidden="true" className="ocean-waves">
        <div className="ocean-wave ocean-wave-one" />
        <div className="ocean-wave ocean-wave-two" />
      </div>

      <div aria-hidden="true" className="ocean-bubble-layer">
        {Array.from({ length: 14 }, (_, index) => (
          <span className={`ocean-bubble ocean-bubble-${index + 1}`} key={index} />
        ))}
      </div>

      <FishMascot
        className="ocean-fish ocean-fish-blue"
        style={{
          height: "auto",
          pointerEvents: "none",
          position: "fixed",
          right: "3%",
          top: "4rem",
          width: "min(10rem, 18vw)",
          zIndex: 0,
        }}
        variant="blue"
      />
      <FishMascot
        className="ocean-fish ocean-fish-coral"
        style={{
          bottom: "5rem",
          height: "auto",
          left: "3%",
          pointerEvents: "none",
          position: "fixed",
          width: "min(9rem, 16vw)",
          zIndex: 0,
        }}
        variant="coral"
      />
      <FishMascot
        className="ocean-fish ocean-fish-gold"
        style={{
          height: "auto",
          pointerEvents: "none",
          position: "fixed",
          right: "12%",
          top: "42%",
          width: "min(7rem, 12vw)",
          zIndex: 0,
        }}
        variant="gold"
      />

      <div className="ocean-content">{children}</div>
    </div>
  );
}
