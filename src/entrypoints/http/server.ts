import fastify, { FastifyInstance } from "fastify";
import { Sequelize } from "sequelize/types";
import helment from "fastify-helmet";
import cors from "fastify-cors";

import { ConfigI } from "../../contracts/config";
import { diContainer } from "./di-container";
import { registerRoutes } from "./routes";
import { Heimdall } from "../../services";

interface ServerI {
  database: Sequelize;
  heimdall: Heimdall;
  config: ConfigI;
}

export class Server {
  fastify: FastifyInstance;
  database: Sequelize;
  heimdall: Heimdall;
  config: ConfigI;

  constructor({ config, database, heimdall }: ServerI) {
    this.fastify = fastify({});
    this.database = database;
    this.heimdall = heimdall;
    this.config = config;
  }

  async configureServer(): Promise<void> {
    this.fastify.register(cors);
    this.fastify.register(helment, { contentSecurityPolicy: false });

    registerRoutes(this.fastify);
    this.fastify.addHook("onRequest", async (req: any) => {
      req.diContainer = diContainer;
    });
    const address = await this.fastify.listen(
      this.config.server.port,
      "0.0.0.0"
    );
    this.heimdall.watch();
    console.log(`server listening on ${address}`);
  }

  async start(): Promise<void> {
    await this.database.authenticate();
    await this.configureServer();
  }
}
