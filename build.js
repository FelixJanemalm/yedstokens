const StyleDictionaryPackage = require('style-dictionary');
const {createArray} = require('./fns');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionaryPackage.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}\n}`
  }
});

StyleDictionaryPackage.registerTransform({
    name: 'sizes/px',
    type: 'value',
    matcher: function(prop) {
        // You can be more specific here if you only want 'em' units for font sizes    
        return ["fontSizes", "spacing", "borderRadius", "borderWidth", "sizing"].includes(prop.attributes.category);
    },
    transformer: function(prop) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(prop.original.value) + 'px';
    }
    });

function getStyleDictionaryConfig(theme) {
  return {
    "source": [
      `tokens/${theme}.json`,
    ],
    "format": {
      createArray
    },
    "platforms": {
      "web": {
        "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px"],
        "buildPath": `output/css/`,
        "files": [{
          "destination": `${theme}.json`,
          "format": "createArray"
        }, {
          "destination": `${theme}.css`,
          "format": "css/variables",
          "selector": `.${theme}-theme`
        }]
      },
      "scss": {
        "transformGroup": "scss",
        "transforms": ["attribute/cti", "name/cti/kebab", "sizes/px"],
        "buildPath": `output/scss/`,
        "files": [{
          "destination": `${theme}.scss`,
          "format": "scss/variables",
          "selector": `.${theme}-theme`
        }]
      },
      "ios-swift": {
        "transformGroup": "ios-swift",
        "buildPath": "output/ios-swift/",
        "files": [{
          "destination": `${theme}StyleDictionary+Class.swift`,
          "format": "ios-swift/class.swift",
          "className": "StyleDictionaryClass",
          "filter": {},
          "selector": `.${theme}-theme`
        },{
          "destination": `${theme}StyleDictionary+Enum.swift`,
          "format": "ios-swift/enum.swift",
          "className": "StyleDictionaryEnum",
          "filter": {},
          "selector": `.${theme}-theme`
        },{
          "destination": `${theme}StyleDictionary+Struct.swift`,
          "format": "ios-swift/any.swift",
          "className": "StyleDictionaryStruct",
          "filter": {},
          "options": {
            "imports": "SwiftUI",
            "objectType": "struct",
            "accessControl": "internal"
          },
          "selector": `.${theme}-theme`
        }]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['default-dark', 'default-light'].map(function (theme) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));

    StyleDictionary.buildPlatform('web');
    StyleDictionary.buildPlatform('scss');
    StyleDictionary.buildPlatform('ios-swift');

    console.log('\nEnd processing');
})

console.log('\n==============================================');
console.log('\nBuild completed!');