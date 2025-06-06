import antfu from "@antfu/eslint-config";

export default antfu(
  {
    typescript: true,
    vue: true
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ["**/*.vue"],
    rules: {
      "vue/first-attribute-linebreak": ["error", { singleline: "beside", multiline: "below" }],
      "vue/max-attributes-per-line": ["error", { singleline: { max: 3 }, multiline: { max: 1 } }]
    }
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ["**/*.yaml"],
    rules: {
      "yaml/quotes": ["warn", { prefer: "double" }]
    }
  },
  {
    ignores: [
      // Ignore all .d.ts files
      "**/*.d.ts",
      // Ignore all auto-generated strapi files
      "src/backend/.strapi/**",
      "src/backend/.strapi-updater.json"
    ]
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      "style/indent": ["error", 2],
      "style/semi": ["error", "always"],
      "style/quotes": ["error", "double"],
      "style/comma-dangle": ["error", "never"],
      "style/brace-style": ["error", "1tbs"]
    }
  }
);
