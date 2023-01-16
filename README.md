## How it works
The npm build task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding design tokens, you will have to run this command again to generate the files.

A future step could be to send the output from Figma to a serverless function first which does below steps automatically. This way code comits could be done through our design tool, Figma.

Step 1.
tokens.json is being directly synced with Figma using the "Figma tokens" plugin.

Step 2. Run this to clean up figma export. Uses tokens.json and creates output.json:
```
npm run transform
```

Step 3. Use the package "Style dictionary" to transform our output.json into plattform ready code like css, scss etc. (configurable settings in config.json):
```
style-dictionary build
```