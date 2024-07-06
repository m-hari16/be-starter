import dotenv from "dotenv";
import server from "./server/server";

dotenv.config();

const PORT = process.env.PORT || 3200;

server.listen(PORT, () => {
  console.info(`service listening on port ${PORT}...`);
});
