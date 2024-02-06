/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text) {
  if (typeof text !== 'string') {
    throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
  }

  let decoded = text;

  const entities = {
    '&amp;': '\u0026',
    '&quot;': '\u0022',
    '&#039;': '\u0027',
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

export function removeExtraSpaces(text) {
  if (typeof text !== 'string') return;
  return text.replace(/\s+/g, ' ').trim();
}
/**
 * Generate style for elements
 * @param {*} original 
 * @returns 
 */
export  function styleGenerator( original ){

    // make an array with unwanted keys
    const unwantedKeys = [ "globalConditionsResult", "conditionspreview", "conditionstype", "conditionsresult", "conditions","tag"];
    // unset the unwanted keys
    unwantedKeys.forEach((key) => {
        delete original[key];
    });

    const newStyles = {};
    // loop through the original object
    for (const key in original) {

        // convert the key to camelCase
        const newKey = key.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        // store newKey and value to newStyles
        const suffix = newKey == "fontSize" ? "px" : "";
        newStyles[newKey] = original[key] + suffix;



    }

    return newStyles;

}
