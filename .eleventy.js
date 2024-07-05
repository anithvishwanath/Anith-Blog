const { DateTime } = require('luxon');
const { chain, toPairs, value, _ } = require('lodash');
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const lucideIcons = require("@grimlink/eleventy-plugin-lucide-icons");

async function imageShortcode(src, alt) {
  let sizes = "(min-width: 1024px) 100vw, 50vw";
  let srcPrefix = `src/assets/img/`;
  src = srcPrefix + src;
  console.log(`Generating image(s) from:  ${src}`);
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }
  let metadata = await Image(src, {
    widths: [720, 900, 1600],
    formats: ["webp", "jpeg", "png"],
    urlPath: "/assets/img",
    outputDir: "./_site/assets/img/",
    /* =====
    Now we'll make sure each resulting file's name will 
    make sense to you. **This** is why you need 
    that `path` statement mentioned earlier.
    ===== */
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
  });
  let lowsrc = metadata.jpeg[0];
  return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${imageFormat[0].sourceType
          }" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(", ")}" sizes="${sizes}">`;
      })
      .join("\n")}
    <img
      src="${lowsrc.url}"
      width="${lowsrc.width}"
      height="${lowsrc.height}"
      alt="${alt}"
      loading="lazy"
      decoding="async">
  </picture>`;
}

/**
 * @param {*} doc A real big object full of all sorts of information about a document
 * @returns {String} the markup of the first image.
 * reference/credit: https://github.com/11ty/eleventy/issues/230
 *
 */
function extractFirstImage(doc) {
  if (!doc.hasOwnProperty("templateContent")) {
    console.warn(
      "❌ Failed to extract image: Document has no property `templateContent`."
    );
    return;
  }

  const content = doc.templateContent;

  if (content.includes("<img")) {
    const imgTagBegin = content.indexOf("<img");
    const imgTagEnd = content.indexOf(">", imgTagBegin);

    return content.substring(imgTagBegin, imgTagEnd + 1);
  }

  return "";
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("LL-dd");
    // return new Date(dateObj).toDateString();
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("fullDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).setLocale('en-CA').toLocaleString(DateTime.DATE_HUGE);
  });

  eleventyConfig.addFilter("year", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy");
  });

  //https://darekkay.com/blog/eleventy-group-posts-by-year/
  eleventyConfig.addCollection("postsByYear", (collection) => {
    return _.chain(collection.getFilteredByTag("posts"))
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  /* Post sorting in the sidebar */
  eleventyConfig.addCollection("allPostsSorted", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").map(post => {
      post.data.year = post.date.getFullYear();
      return post;
    }).sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addShortcode("first_image", (post) => extractFirstImage(post));
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  // === Liquid needed if `markdownTemplateEngine` **isn't** changed from Eleventy default
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(lucideIcons);

  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownLib = markdownIt(mdOptions).use(markdownItAttrs).disable("code");

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  }
}
