import { FastifyInstance } from "fastify";
import HttpStatus from "http-status";

import { scheduleNotificationSchema } from "./validation";
import { ScheduleNotification } from "../../usescases";

async function create(req: any, reply: any): Promise<void> {
  const handler = <ScheduleNotification>(
    req.diContainer.resolve("scheduleNotification")
  );

  const { DATABASE_ERROR, SUCCESS, ERROR, BAD_PARAMETERS } = handler.events;
  handler.on(SUCCESS, (res) => reply.send(res));
  handler.on(DATABASE_ERROR, (ex) =>
    reply.code(HttpStatus.BAD_REQUEST).send({
      error: "DatabaseError",
      message: ex,
    })
  );
  handler.on(BAD_PARAMETERS, (ex) =>
    reply.code(HttpStatus.BAD_REQUEST).send(ex)
  );
  handler.on(ERROR, () =>
    // log exception ex
    reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Internal Server Error",
      message: "The server is unable to handle this request",
    })
  );
  handler.execute(req.body);
}

export const notificationController = {
  routes(fastify: FastifyInstance, _: any, done: any): void {
    fastify.post(
      "/notification",
      {
        schema: scheduleNotificationSchema,
      },
      create
    );
    done();
  },
};
