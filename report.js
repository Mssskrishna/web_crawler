function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return bHits - aHits;
  });
  return pagesArr;
}

function printReports(pages) {
  console.log("============");
  console.log("REPORT");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hit = sortedPage[1];
    console.log(`${url}: :${hit}`);
  }

  console.log("============");
}
module.exports = {
  printReports,
};
