import type { PlayerRole } from "@/lib/types";

interface RoleBadgeProps {
  className?: string;
  role: PlayerRole;
}

function getRoleLabel(role: PlayerRole) {
  if (role === "guesser") {
    return "Guesser";
  }

  if (role === "truth") {
    return "Truth Teller";
  }

  if (role === "bluffer") {
    return "Bluffer";
  }

  return "Observer";
}

function getRoleClass(role: PlayerRole) {
  if (role === "guesser") {
    return "role-badge-guesser";
  }

  if (role === "truth") {
    return "role-badge-truth";
  }

  if (role === "bluffer") {
    return "role-badge-bluffer";
  }

  return "role-badge-neutral";
}

export function RoleBadge({ className = "", role }: RoleBadgeProps) {
  return (
    <span className={`role-badge ${getRoleClass(role)} ${className}`}>
      {getRoleLabel(role)}
    </span>
  );
}
