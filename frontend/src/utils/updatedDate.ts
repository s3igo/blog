import { formatDate } from "./formatDate";

export const updatedDate = (date: Date): string => `last updated on ${formatDate(date)}`;
