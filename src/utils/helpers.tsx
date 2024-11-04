import { HASH_SIZE } from "./constants";

export function formatDate(date: Date, type?: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (type) return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
  else return `${year}/${month}/${day} -`;
}

export function generateRandomHash() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < HASH_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function formatEstimate(estimate: number): string {
  if (estimate < 8) {
    return `${estimate}h`;
  } else if (estimate < 40) {
    return `${Math.floor(estimate / 8)}d`;
  } else if (estimate < 160) {
    return `${Math.floor(estimate / 40)}w`;
  } else {
    return `${Math.floor(estimate / 160)}m`;
  }
}
