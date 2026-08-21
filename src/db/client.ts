/**
 * Database connection factory (IMP-020).
 *
 * Scope: migrations, database integration tests, and schema verification
 * only. This module creates no implicit connection on import — a client is
 * created only when a caller explicitly invokes createDbClient(). No
 * application route, Server Action, or page may import this module; it is
 * reserved for migration/test tooling until a later task introduces
 * authorized repository/domain-service database access.
 */

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export interface DbClient {
  db: NodePgDatabase<typeof schema>;
  pool: Pool;
  close: () => Promise<void>;
}

/**
 * Creates a new pg Pool and Drizzle instance for the given connection
 * string. The caller owns the returned client's lifecycle and must call
 * `close()` when done (migrations and tests each do this explicitly).
 */
export function createDbClient(connectionString: string): DbClient {
  const pool = new Pool({ connectionString });
  const db = drizzle(pool, { schema });
  return {
    db,
    pool,
    close: async () => {
      await pool.end();
    },
  };
}
