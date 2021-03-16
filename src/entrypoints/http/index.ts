import { Logger } from "../../adapters/logger";
import { diContainer } from "../di-container";
import { Server } from "./server";

const server = <Server>diContainer.resolve("server");

async function start(): Promise<void> {
  try {
    await server.start();
  } catch (ex) {
    Logger.info("Could not start server");
    Logger.error(ex);
    process.exit(1);
  }
}

start();
