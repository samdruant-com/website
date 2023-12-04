<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio.store';

useSeoSetup({ title: "Contact" });

const portfolioStore = usePortfolioStore();

</script>

<template>
  <base-page>
    <div id="contact">
      <v-row justify="center" justify-md="space-around" align="center" class="mr-2 mr-md-5">
        <v-col cols="12" md="auto">
          <base-image src="/images/contact.jpg" height="700px" width="500px" />
        </v-col>
        <v-col cols="12" md="auto">
          <p>
            <a class="hide-link" :href="`mailto:${portfolioStore.portfolio.email}`"><b>email</b> me</a>
          </p>
          <p v-for="social in portfolioStore.portfolio.socials" :key="social.name">
            <a class="hide-link" target="_blank" rel="noreferrer" :href="social.url"><b>visit</b> my {{ social.name }}</a>
          </p>
        </v-col>
      </v-row>
    </div>
  </base-page>
</template>

<style scoped>
#contact {
  margin-top: 5%;
}

@media screen and (max-width: 480px) {

  /* add styling for mobile screens here */
  #contact {
    margin-top: 10%;
  }
}
</style>
~/stores/portfolio.store