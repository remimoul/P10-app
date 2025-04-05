//dark mode
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser, useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  RiTimerLine,
  RiUser3Fill,
  RiCheckboxCircleFill,
  RiTeamFill,
} from "react-icons/ri";
import { GiCheckeredFlag, GiRaceCar, GiPodiumWinner } from "react-icons/gi";
import { TbEngine } from "react-icons/tb";
import toast from "react-hot-toast";

interface Participant {
  id: string;
  name: string;
  score: number;
  hasVoted: boolean;
}

const Header = ({
  league,
  timeLeft,
  formatTime,
}: {
  league: { name: string; type: string };
  timeLeft: number;
  formatTime: (seconds: number) => string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-red-900 p-8 text-white shadow-2xl"
  >
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            {league.name}
            <span className="block text-lg font-normal mt-2 opacity-80">
              {league.type === "public" ? "Public League" : "Private League"}
            </span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 bg-black/30 px-6 py-4 rounded-xl border border-red-500/30">
        <div className="flex items-center gap-2">
          <RiTimerLine className="text-2xl text-red-400" />
          <span className="font-mono text-2xl font-bold">
            {timeLeft > 0 ? formatTime(timeLeft) : "FINISHED"}
          </span>
        </div>
        <span className="text-sm opacity-80">Race Clock</span>
      </div>
    </div>

    <div className="mt-6 flex items-center gap-4">
      <span className="text-xl font-medium opacity-90">
        Season 2024 • Round 12 • Circuit de Monaco
      </span>
    </div>
  </motion.div>
);

const ActionBar = ({
  handleAddMembers,
  handleLeaveLeague,
}: {
  handleAddMembers: () => void;
  handleLeaveLeague: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col sm:flex-row gap-4 mb-8 justify-end"
  >
    <Button
      onClick={handleAddMembers}
      className="group px-8 py-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
    >
      <RiTeamFill className="mr-3 text-xl" />
      Add Team Members
      <span className="ml-2 opacity-70 group-hover:opacity-90">+</span>
    </Button>

    <Button
      onClick={handleLeaveLeague}
      className="px-8 py-6 rounded-2xl bg-gradient-to-b from-gray-800 to-black text-red-400 border border-red-900/50 hover:border-red-400/30 font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
    >
      Exit Championship
      <TbEngine className="ml-3 text-xl" />
    </Button>
  </motion.div>
);

const UserCard = ({
  participant,
  timeLeft,
  handleVote,
}: {
  participant?: Participant;
  timeLeft: number;
  handleVote: () => void;
}) => {
  const safeParticipant = participant ?? {
    id: "default",
    name: "Driver",
    score: 0,
    hasVoted: false,
  };

  return (
    <motion.div className="relative bg-gradient-to-br from-gray-900 to-red-900 rounded-3xl p-8 shadow-2xl overflow-hidden mb-10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full opacity-30"
            />
            <div className="relative w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center border-2 border-red-500/30">
              <RiUser3Fill className="text-4xl text-red-400" />
              <GiCheckeredFlag className="absolute -bottom-2 -right-2 text-3xl text-red-500" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-red-400">Your Stats</h2>
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-white">
                  {safeParticipant.score}
                </p>
                <p className="text-sm text-red-300 uppercase tracking-wider">
                  Points
                </p>
              </div>
              <div className="h-12 w-px bg-red-500/30" />
              <div className="text-center">
                <p className="text-4xl font-bold text-white">#1</p>
                <p className="text-sm text-red-300 uppercase tracking-wider">
                  Position
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleVote}
          disabled={timeLeft === 0}
          className={`px-10 py-6 rounded-xl text-lg font-bold uppercase tracking-wider transition-all ${
            safeParticipant.hasVoted
              ? "bg-gray-800 hover:bg-gray-700 text-red-400"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {safeParticipant.hasVoted ? (
            <>
              Cancel Vote <RiCheckboxCircleFill className="ml-3" />
            </>
          ) : timeLeft > 0 ? (
            <>Push to Vote</>
          ) : (
            "Session Closed"
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const ParticipantsList = ({
  participants,
  currentUser,
}: {
  participants: Participant[];
  currentUser?: string;
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
    {participants
      .filter((p) => p.id !== currentUser)
      .map((participant, index) => (
        <motion.div
          key={participant.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-red-900/30 hover:border-red-500/50 transition-colors"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center">
                  <RiUser3Fill className="text-xl text-red-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {participant.name}
                </h3>
                <p className="text-red-300 text-sm">
                  {participant.score} points
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
  </div>
);

const Ranking = ({ participants }: { participants: Participant[] }) => (
  <div className="bg-gradient-to-br from-gray-900 to-red-900 rounded-3xl p-8 shadow-2xl border border-red-900/30">
    <h2 className="text-3xl font-black text-red-400 mb-6 flex items-center gap-3">
      <GiPodiumWinner className="text-4xl" /> Championship Standings
    </h2>

    <div className="space-y-4">
      {[...participants]
        .sort((a, b) => b.score - a.score)
        .map((participant, index) => (
          <motion.div
            key={participant.id}
            className="p-4 rounded-xl bg-gray-800/30 backdrop-blur-sm flex justify-between items-center hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span
                className={`text-2xl font-bold ${
                  index === 0
                    ? "text-yellow-400"
                    : index === 1
                    ? "text-gray-300"
                    : index === 2
                    ? "text-amber-600"
                    : "text-red-400"
                }`}
              >
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `#${index + 1}`}
              </span>
              <span className="text-xl font-medium text-white">
                {participant.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">
                {participant.score}
              </span>
            </div>
          </motion.div>
        ))}
    </div>
  </div>
);

const ViewLeague = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const { organization } = useOrganization();
  const [timeLeft, setTimeLeft] = useState(3600);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (userLoaded && user) {
      setParticipants([
        {
          id: user.id,
          name: user.fullName || "Racer",
          score: 0,
          hasVoted: false,
        },
        { id: "2", name: "Max Verstappen", score: 245, hasVoted: false },
        { id: "3", name: "Lewis Hamilton", score: 198, hasVoted: false },
      ]);
    }
  }, [userLoaded, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async () => {
    if (!user) return;

    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === user.id) {
          const newVoteStatus = !p.hasVoted;
          return {
            ...p,
            score: newVoteStatus ? p.score + 10 : p.score - 10,
            hasVoted: newVoteStatus,
          };
        }
        return p;
      })
    );

    toast.success(
      participants.find((p) => p.id === user.id)?.hasVoted
        ? "-10 points!"
        : "+10 points!"
    );
  };

  const handleAddMembers = () => toast.success("Invitation sent!");
  const handleLeaveLeague = () =>
    toast.success(`Left ${organization?.name || "league"} successfully`);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <GiRaceCar className="text-6xl text-red-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      <Header
        league={{
          name: organization?.name || "Racing League",
          type: "public",
        }}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />

      <ActionBar
        handleAddMembers={handleAddMembers}
        handleLeaveLeague={handleLeaveLeague}
      />

      {user ? (
        <>
          <UserCard
            participant={participants.find((p) => p.id === user.id)}
            timeLeft={timeLeft}
            handleVote={handleVote}
          />
          <ParticipantsList participants={participants} currentUser={user.id} />
          <Ranking participants={participants} />
        </>
      ) : (
        <div className="text-center py-20">
          <GiRaceCar className="text-6xl text-red-500 mx-auto mb-6" />
          <Button asChild variant="destructive" size="lg">
            <a href="/sign-in">Login to Join Championship</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewLeague;
