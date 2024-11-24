import "dotenv/config";
import fastify from "fastify";

const app = fastify();

const PORT: number = Number(process.env.APP_PORT) || 8000;
app.listen({ port: PORT }, () => console.log(`running at port: ${PORT}`));
