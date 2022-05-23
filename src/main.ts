import app from "./app";
import http from "http";

async function main() {
  const server = http.createServer(app());
  server.listen(process.env.PORT, () => {
    console.log(`>>> Connected Server : http://localhost:${process.env.PORT}`);
  });
}

main();
