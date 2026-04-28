import { GameRoom } from "@/components/GameRoom";

interface RoomPlaceholderPageProps {
  params: Promise<{
    roomCode: string;
  }>;
}

export default async function RoomPlaceholderPage({
  params,
}: RoomPlaceholderPageProps) {
  const { roomCode } = await params;

  return <GameRoom roomCode={roomCode.toUpperCase()} />;
}
