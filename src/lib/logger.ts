import pino from "pino";

export const logger = pino({
  name: "haccp-system",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});
