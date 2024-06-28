import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateInterval(startDate: Date, endDate: Date): string {
  const msDifference = endDate.getTime() - startDate.getTime();

  const seconds = Math.floor(msDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  return `${days} days ${remainingHours} hours ${remainingMinutes} minutes ${remainingSeconds} seconds`;
}