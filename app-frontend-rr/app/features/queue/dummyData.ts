import type { Payment } from "./dataColumns";

function randomId(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function randomAmount(min = 10, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomStatus() {
  const statuses: Payment["status"][] = [
    "pending",
    "processing",
    "success",
    "failed",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomName() {
  const firstNames = [
    "Ken",
    "Abe",
    "Monserrat",
    "Silas",
    "Carmella",
    "Alex",
    "Jamie",
    "Taylor",
    "Jordan",
    "Morgan",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Martinez",
  ];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first}${last}${Math.floor(Math.random() * 100)}`;
}

function randomEmail() {
  const domains = ["example.com", "mail.com", "test.org", "demo.net"];
  return `${randomName().toLowerCase()}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
}

export function generateDummyPayments(count: number = 1000): Payment[] {
  const payments: Payment[] = [];
  for (let i = 0; i < count; i++) {
    payments.push({
      id: randomId(),
      amount: randomAmount(),
      status: randomStatus(),
      email: randomEmail(),
    });
  }
  return payments;
}
