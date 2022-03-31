## How it works
The npm build task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding design tokens, you will have to run this command again to generate the files.

Step 1.
tokens.json is being directly synced with Figma using the "Figma tokens" plugin.

Step 2. clean up figma export. Uses tokens.json and creates output.json:
```
npm run transform
```

Step 3. Transforms output.json into css and scss:
```
style-dictionary build
```
