<script setup lang="ts">
const { availableLocales } = useI18n()

interface Language {
  title: string;
  value: string;
}

const supportedLanguages = computed<Language[]>(() => {
  return availableLocales.map((locale) => {
    return {
      title: locale.toUpperCase(),
      value: locale
    }
  })
});


</script>

<template>
  <base-btn>
    {{ $t('global.language') }}

    <v-menu activator="parent">
      <v-list>
        <v-list-item v-for="language in supportedLanguages" :key="language.value" @click="$i18n.locale = language.value">
          <v-list-item-title>{{ language.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </base-btn>
</template>
