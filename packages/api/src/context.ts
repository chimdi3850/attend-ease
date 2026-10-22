import type { Session } from "@attend-ease/auth";
import type { Database } from "@attend-ease/db";

export type Context = {
	session: Session | null;
	db: Database;
};
