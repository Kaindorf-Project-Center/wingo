import { Leaderboard } from "@/components/wingo/Leaderboard.tsx";

export function Dashboard() {
  return (
    <div className="m-6">
      <p className={"text-3xl font-bold"}>Leaderboard</p>
      <Leaderboard />
    </div>
  );
}
