# Locales

This directory contains the translations of the strings used in the application.

## Adding support for a new language

Not all the languages are supported yet. If you want to add support for a new language, follow these steps:

1. create a json file and name it with the two-letter code of the language (e.g. `en.json` for English). Visit this [wiki](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for a list of the codes.
2. add translations for all the strings in the 'main' language file (`en.json` in our case) and following the same json structure.
3. import the new json file to the [/plugins/i18n.client.ts](../plugins/i18n.client.ts) file.

## Adding new translations

Existing translations can be improved or new ones can be added. To do so, follow these steps:

1. open the main language file (`en.json` in our case) and add the new strings or improve the existing ones.
2. open the other language files and add the new strings or improve the existing ones.
