import { formatDate } from "./formatDate";

export const createdDate = (date: Date): string => `created on ${formatDate(date)}`;
