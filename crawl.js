const { JSDOM } = require("jsdom");

function getUrlsFromHtml(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");

  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseUrl}${link.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.error(`error with url : ${error.message}`);
      }
    } else {
      try {
        const urlObj = new URL(link.href);

        urls.push(urlObj.href);
      } catch (error) {
        console.error(`error with url : ${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(url) {
  const urlObj = new URL(url);
  const normalized = `${urlObj.hostname}${urlObj.pathname}`;
  if (normalized.length > 0 && normalized.slice(-1) === "/") {
    return normalized.slice(0, -1);
  }
  return normalized;
}

module.exports = {
  normalizeURL,
  getUrlsFromHtml,
};
