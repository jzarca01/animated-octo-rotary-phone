'use strict';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

export function getMetadata(url) {
  if (!url) {
    return undefined;
  }
  
  return fetch(url)
    .then((result) => result.text())
    .then((page) => {
      const $ = cheerio.load(page);
      const head = $.html($('head'));
      const title =
        $('meta[property="og:title"]').attr('content') ||
        $('title').text() ||
        $('meta[name="title"]').attr('content');
      const description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content');
      const url = $('meta[property="og:url"]').attr('content');
      const site_name = $('meta[property="og:site_name"]').attr('content');
      const image =
        $('meta[property="og:image"]').attr('content') ||
        $('meta[property="og:image:url"]').attr('content');
      const icon =
        $('link[rel="icon"]').attr('href') ||
        $('link[rel="shortcut icon"]').attr('href');
      const keywords =
        $('meta[property="og:keywords"]').attr('content') ||
        $('meta[name="keywords"]').attr('content');
      return {
        head,
        title,
        description,
        url,
        site_name,
        image,
        icon,
        keywords,
      };
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

