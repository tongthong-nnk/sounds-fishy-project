export type GameStatus =
  | "lobby"
  | "answering"
  | "guessing"
  | "result"
  | "archived";

export type PlayerRole = "guesser" | "truth" | "bluffer" | null;

export type RoundEndReason =
  | "truth_selected"
  | "guesser_stopped"
  | "all_bluffers_found"
  | null;

export type TimestampValue =
  | Date
  | {
      seconds: number;
      nanoseconds: number;
      toMillis?: () => number;
    }
  | null;

export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface Player {
  playerId: string;
  name: string;
  isHost: boolean;
  score: number;
  role: PlayerRole;
  submittedAnswer: string;
  hasSubmitted: boolean;
  isEliminated: boolean;
  joinedAt: TimestampValue;
  lastSeenAt: TimestampValue;
}

export interface Room {
  roomCode: string;
  hostId: string;
  status: GameStatus;
  roundNumber: number;
  currentQuestionId: string;
  question: string;
  correctAnswer: string;
  guesserId: string;
  truthTellerId: string;
  guessedPlayerIds: string[];
  revealedPlayerIds: string[];
  usedQuestionIds: string[];
  roundEndReason: RoundEndReason;
  scoringApplied: boolean;
  createdAt: TimestampValue;
  updatedAt: TimestampValue;
  lastActivityAt: TimestampValue;
  archivedAt: TimestampValue;
}
