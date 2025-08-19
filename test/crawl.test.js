const { normalizeURL, getUrlsFromHtml } = require("../crawl");

const { test, expect } = require("@jest/globals");

test("normaizeURL url", () => {
  const input = "https://boot.dev";
  const actual = normalizeURL(input);
  const expected = "boot.dev";
  expect(actual).toEqual(expected);
});

test("normaizeURL capital", () => {
  const input = "https://Boot.dev";
  const actual = normalizeURL(input);
  const expected = "boot.dev";
  expect(actual).toEqual(expected);
});

test("normaizeURL trailing", () => {
  const input = "https://Boot.dev/";
  const actual = normalizeURL(input);
  const expected = "boot.dev";
  expect(actual).toEqual(expected);
});

test("getURLsfromHTML absolute", () => {
  const input = `<html>
    <body>
    <a href="https://blog.dev/">
    Blog Post
    </a>
    </body>
  </html`;
  const baseUrl = "https://blog.dev/"
  const actual = getUrlsFromHtml(input,baseUrl);
  const expected = ["https://blog.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsfromHTML relative", () => {
  const input = `<html>
    <body>
    <a href="/page">
    Blog Post
    </a>
    </body>
  </html`;
  const baseUrl = "https://blog.dev"
  const actual = getUrlsFromHtml(input,baseUrl);
  const expected = ["https://blog.dev/page"];
  expect(actual).toEqual(expected);
});

test("getURLsfromHTML relative", () => {
  const input = `<html>
    <body>
    <a href="invalid">
    Blog Post
    </a>
    </body>
  </html`;
  const baseUrl = "https://blog.dev"
  const actual = getUrlsFromHtml(input,baseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});
