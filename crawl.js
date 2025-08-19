const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrl.hostname !== currentUrl.hostname) {
    return;
  }
  const normalizedCurrentURL = normalizeURL(currentUrl);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;
  console.log(`actively crawling: ${currentUrl}`);
  try {
    const resp = await fetch(baseUrl);
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} at ${currentUrl}`
      );
      return;
    }
    const content_type = resp.headers.get("content-type");
    if (content_type.includes("text/text")) {
      console.log(
        `error in fetch with content_type: ${content_type} at ${currentUrl}`
      );
      return;
    }

    const respText = await resp.text();
    // console.log(respText)
    const urls = getUrlsFromHtml(respText,baseUrl);
    for (const url of urls) {
      pages = await crawlPage(baseUrl, url, pages);
    }
  } catch (error) {
    console.log(`found invalid link at ${currentUrl}`);
  }
  return pages;
}

function getUrlsFromHtml(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");

  for (const link of links) {
    console.log(link.href);
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
  crawlPage,
};
