<script setup lang="ts">
import type { DropdownItem } from "~/components/base/BaseDropdown.vue";

const i18n = useI18n();

const supportedLanguages = computed<DropdownItem[]>(() => {
  return i18n.availableLocales.map((locale) => {
    return {
      label: locale,
      action: () => {
        i18n.locale.value = locale;
      }
    };
  });
});
</script>

<template>
  <base-dropdown :items="supportedLanguages">
    {{ $t('global.language') }}
  </base-dropdown>
</template>
