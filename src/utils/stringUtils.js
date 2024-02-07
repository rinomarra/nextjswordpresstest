// src/utils/stringUtils.js

export function toPascalCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    }).replace(/\s+/g, '');
  }