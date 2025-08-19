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

  // Convert to an array of objects for table display
  const tableData = sortedPages.map(([url, hit]) => ({
    URL: url,
    Hits: hit,
  }));

  console.table(tableData);

  console.log("============");
}

module.exports = {
  printReports,
};
