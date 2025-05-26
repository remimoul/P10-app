import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Vote } from "@/lib/types/vote";
import toast from "react-hot-toast";

export function useVote() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [confirmedVote, setConfirmedVote] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [voteDeadline, setVoteDeadline] = useState<Date | null>(null);
  const [totalParticipants] = useState(0);
  const [voteModified] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (driverId: string) => {
    if (!user) {
      toast.error("Vous devez être connecté pour voter");
      return;
    }

    if (timeLeft === 0) {
      toast.error("Le temps de vote est écoulé!");
      return;
    }

    try {
      // API call to register vote would go here

      setSelectedDriver(driverId);
      setUserVote({
        driverId,
        timestamp: Date.now(),
      });
      toast.success("Vote enregistré avec succès!");
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement du vote");
      console.error("Error submitting vote:", err);
    }
  };

  const handleConfirmVote = () => {
    if (!selectedDriver) {
      toast.error("Veuillez d'abord sélectionner un pilote");
      return;
    }
    setConfirmedVote(selectedDriver);
    toast.success(
      "Vote confirmé ! Vous pouvez toujours le modifier jusqu'à la fin du temps imparti."
    );

    setTimeout(() => {
      router.push("/leagues");
    }, 1000);
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
      toast.success("Vote annulé avec succès!");
    } catch (err) {
      toast.error("Erreur lors de l'annulation du vote");
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
