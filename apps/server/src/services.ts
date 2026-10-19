import { createAuth as createConfiguredAuth } from "@attend-ease/auth";
import { type Database, createDb } from "@attend-ease/db";

import { ENV } from "./env.server";

export function getDb(): Database {
  return createDb(ENV);
}
export async function createAuth(database?: Database) {
  return createConfiguredAuth(ENV, database ?? (await getDb()));
}
