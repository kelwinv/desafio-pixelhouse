import { Injectable } from '@nestjs/common';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

type PgHealth = {
  status: string;
  version: string;
  max_connections: number;
  current_connections: number;
};

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async getPgHealth(): Promise<PgHealth> {
    try {
      const targetDatabase = process.env.POSTGRES_DB || 'postgres';

      const data = await this.prisma.$queryRaw<
        [
          {
            max_connections: string;
            current_connections: string;
            database_name: string;
            version: string;
          },
        ]
      >`
        SELECT 
          (SELECT setting FROM pg_settings WHERE name = 'max_connections') AS max_connections,
          (SELECT COUNT(*) FROM pg_stat_activity 
          WHERE datname = ${targetDatabase} AND state = 'active') AS current_connections,
          ${targetDatabase} AS database_name,
          version() AS version;
      `;

      const result = data[0];

      return {
        status: 'up',
        version: result.version.split(' ')[1],
        max_connections: parseInt(result.max_connections),
        current_connections: parseInt(result.current_connections),
      };
    } catch (_error: unknown) {
      return {
        status: 'down',
        version: 'unknown',
        max_connections: 0,
        current_connections: 0,
      };
    }
  }

  async getHealth() {
    const pg = await this.getPgHealth();

    return {
      status: 'ok',
      updated_at: new Date().toISOString(),
      dependencies: {
        pg,
      },
    };
  }
}
