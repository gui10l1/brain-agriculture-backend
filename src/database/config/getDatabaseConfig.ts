interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  entities: string[];
}

export default function getDatabaseConfig(): IDatabaseConfig {
  const config = {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    entities: [`dist/**/entities/*.entity.{js,ts}`],
  } as IDatabaseConfig;

  return config;
}
