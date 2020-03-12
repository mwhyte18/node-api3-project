// code away!
const PORT = 5000;

const server = require("./server");

server.listen(PORT, () => {
  console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
});
