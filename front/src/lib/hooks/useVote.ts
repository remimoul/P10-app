import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Removed unused import
import { useUser } from "@clerk/nextjs";
import { Vote } from "@/lib/types/vote";
import toast from "react-hot-toast";
import { gql, useQuery } from "@apollo/client";

export function useVote() {
  const { user } = useUser();
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [confirmedVote, setConfirmedVote] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [voteDeadline, setVoteDeadline] = useState<Date | null>(null);
  const [totalParticipants] = useState(0);
  const [voteModified] = useState(false);

  useEffect(() => {
    const updateTimeLeft = () => {
      if (voteDeadline) {
        const diff = Math.floor((voteDeadline.getTime() - Date.now()) / 1000);
        setTimeLeft(diff > 0 ? diff : 0);
      } else {
        setTimeLeft(0);
      }
    };
    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [voteDeadline]);

  const handleVote = async (driverId: string) => {
    if (!user) {
      toast.error("You must be logged in to vote");
      return;
    }

    if (timeLeft === 0) {
      toast.error("Voting time has expired!");
      return;
    }

    try {
      // API call to register vote would go here

      setSelectedDriver(driverId);
      setUserVote({
        driverId,
        timestamp: Date.now(),
      });
      toast.success("Vote successfully registered!");
    } catch (err) {
      toast.error("Error while registering the vote");
      console.error("Error submitting vote:", err);
    }
  };

  const handleConfirmVote = () => {
    if (!selectedDriver) {
      toast.error("Please select a driver first");
      return;
    }

    const QUERY = gql`
      query AddNewBet($input: CreateBetInput!) {
        createBet(input: $input) {
          id
        }
      }
    `;

    const {
      data: betData,
      loading: betLoading,
      error: betError,
    } = useQuery(QUERY, {
      variables: {
        input: {
          grandPrixId: "some-grand-prix-id", // Replace with actual grand prix ID
          pilotId: selectedDriver,
        },
      },
    });

    if (betError) {
      toast.error("Error while confirming the vote");
      console.error("Error confirming vote:", betError);
      return;
    }
    setConfirmedVote(selectedDriver);
    toast.success(
      `Vote confirmed! You can still modify it until the end of the allotted time. (Vote id: ${betData?.createBet.id})`
    );
  };

  const handleCancelVote = () => {
    setShowCancelDialog(true);
  };

  const confirmCancelVote = async () => {
    if (!user) return;

    try {
      // API call to cancel vote would go here
      setSelectedDriver(null);
      setUserVote(null);
      setShowCancelDialog(false);
      toast.success("Vote successfully cancelled!");
    } catch (err) {
      toast.error("Error while cancelling the vote");
      console.error("Error canceling vote:", err);
    }
  };

  return {
    selectedDriver,
    confirmedVote,
    userVote,
    showCancelDialog,
    setShowCancelDialog,
    timeLeft,
    voteDeadline,
    setVoteDeadline,
    totalParticipants,
    voteModified,
    handleVote,
    handleConfirmVote,
    handleCancelVote,
    confirmCancelVote,
  };
}
