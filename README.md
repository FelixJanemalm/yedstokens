## How it works
The npm build task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding design tokens, you will have to run this command again to generate the files.


## clean up figma export - uses tokens.json and creates output.json:
```
npm run transform
```

## Transforms output.json into css and scss:
````
style-dictionary build
```
