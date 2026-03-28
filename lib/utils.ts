import { AgeGroup, ScheduleType } from "./mock-data";

export const formatAgeGroups = (ageGroups: AgeGroup[]): string => {
  const labels: Record<AgeGroup, string> = {
    infant: "Infant",
    toddler: "Toddler",
    preschool: "Preschool",
    schoolAge: "School Age",
  };
  return ageGroups.map((ag) => labels[ag]).join(", ");
};

export const formatScheduleType = (scheduleType: ScheduleType): string => {
  const labels: Record<ScheduleType, string> = {
    "full-time": "Full-Time",
    "part-time": "Part-Time",
    "drop-in": "Drop-In",
  };
  return labels[scheduleType];
};

export const getStarRating = (
  rating: number,
): { full: number; partial: boolean; empty: number } => {
  const full = Math.floor(rating);
  const partial = rating % 1 >= 0.5;
  const empty = 5 - full - (partial ? 1 : 0);
  return { full, partial, empty };
};
