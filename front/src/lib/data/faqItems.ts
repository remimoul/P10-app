import { FAQItem } from "../types";

const FaqItems: FAQItem[] = [
  {
    question: "How does the betting system work?",
    answer:
      "You can place bets on race results by selecting your predictions for the top 10 positions. Points are awarded based on the accuracy of your predictions, with more points for correct positions.",
  },
  {
    question: "What is the P10 betting system?",
    answer:
      "P10 (Position 10) is a unique betting system where you predict who will finish in 10th position during a Grand Prix. This adds an exciting strategic element to the race, as the 10th position can be highly competitive and unpredictable.",
  },
  {
    question: "How are points calculated for P10 predictions?",
    answer:
      "For P10 predictions, you earn points based on how close your prediction is to the actual 10th position. A perfect prediction of the 10th position earns the highest points. Points decrease based on how many positions your prediction was off from the actual result.",
  },
  {
    question: "What are leagues?",
    answer:
      "Leagues are groups where you can compete with other users. You can create private leagues to play with friends or join public leagues to compete with the community.",
  },
  {
    question: "How are points calculated?",
    answer:
      "Points are calculated based on the accuracy of your predictions. The closer your prediction is to the actual race result, the more points you earn. Bonus points are awarded for perfect predictions.",
  },
  {
    question: "Can I join multiple leagues?",
    answer:
      "Yes, you can join multiple leagues simultaneously. Each league has its own leaderboard and you can track your performance across different leagues.",
  },
  {
    question: "How often are races updated?",
    answer:
      "Race results are updated in real-time during Formula 1 Grand Prix events. You can track live updates and see how your predictions are performing.",
  },
  {
    question: "Is there a limit to how many bets I can place?",
    answer:
      "You can place one bet per race. Make sure to submit your predictions before the race starts, as betting is closed once the race begins.",
  },
  {
    question: "What makes P10 betting challenging?",
    answer:
      "P10 betting is particularly challenging because the 10th position is often contested by multiple drivers and can be affected by various race factors like pit stops, tire strategies, and race incidents. It requires careful analysis of driver form, team performance, and race conditions.",
  },
  {
    question: "Can I change my P10 prediction?",
    answer:
      "You can modify your P10 prediction up until the race start time. Once the race begins, all predictions are locked and cannot be changed.",
  },
];

export default FaqItems;
