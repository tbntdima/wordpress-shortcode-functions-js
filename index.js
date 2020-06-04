const Html5Entities = require("html-entities").Html5Entities;
const entities = new Html5Entities();

const WPShortcodes = (
  content = "",
  shortcodesMap = {},
  clearRemainingShortcodes = true
) => {
  // decoding entities to replace &#34; with " etc.
  let markup = entities.decode(content);

  // Picks up all of the shortcodes and turns them into an array.
  const shortcodesRaw = markup.match(/\[(.*?)?\]/g) || [];

  shortcodesRaw.forEach((shortcodeRaw) => {
    const shortcodeNameRaw =
      shortcodeRaw.match(/(?<=\[)[a-zA-Z0-9/]\w*/g) || [];
    const shortcodeName = shortcodeNameRaw.toString();

    const attributes = {};
    const attributesRaw = shortcodeRaw.match(/[\w-]+=".+?"/g) || [];
    attributesRaw.forEach((attributeRaw) => {
      const attributeData = attributeRaw.match(/([\w-]+)="(.+?)"/);
      attributes[attributeData[1]] = attributeData[2];
    });

    if (typeof shortcodesMap[shortcodeName] === "function") {
      markup = markup.replace(
        shortcodeRaw,
        shortcodesMap[shortcodeName](attributes)
      );
    } else if (clearRemainingShortcodes) {
      markup = markup.replace(shortcodeRaw, "");
    }
  });

  return markup;
};

module.exports = WPShortcodes;
