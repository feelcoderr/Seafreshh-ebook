// lib/qstash.js

import QStashClient from "@upstash/qstash";
export const qstash = new QStashClient({
  token: process.env.QSTASH_TOKEN,
});
