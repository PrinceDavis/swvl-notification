import { FastifyInstance } from "fastify";

import { notificationController } from "./notification-controller";

export const registerRoutes = (fastify: FastifyInstance): void => {
  fastify.register(notificationController.routes);
};
