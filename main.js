const { crawlPage } = require("./crawl");
const { printReports } = require("./report");
async function main() {
  if (process.argv.length < 3) {
    console.log(`required command line args: 3`);
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log(`too many args: 3`);
    process.exit(1);
  }
  const baseUrl = process.argv[2];
  console.log(`starting crawl of ${baseUrl}`);
  const pages = await crawlPage(baseUrl, baseUrl, []);


  printReports(pages)
}
main();
