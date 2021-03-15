import { diContainer } from "../di-container";
import { Server } from "./server";

const server = <Server>diContainer.resolve("server");

async function start(): Promise<void> {
  try {
    await server.start();
  } catch (ex) {
    console.log("Could not start server");
    // log exception
    console.log(ex);
    process.exit(1);
  }
}

start();
