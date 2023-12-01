<script setup lang="ts">
import { useDisplay } from "vuetify";

useSeoMeta({
  title: "Contact - Sam Druant",
  description:
    "Sam combines her background in illustration with various textile techniques, such as tufting, weaving, knitting and embroidery. In the figurative way of working, she uses a contrast in text, image and material to evoke an ambivalent feeling on the part of the viewer.",
  ogImage: "/images/contact.jpg",
  ogImageAlt: "Sam tufting in her studio",
});

const { smAndDown } = useDisplay();
</script>

<template>
  <base-page>
    <div id="contact">
      <v-row justify="center" justify-md="space-around" align="center" class="mr-2 mr-md-5">
        <v-col cols="12" md="auto">
          <base-image src="/images/contact.jpg" size="contain" :width="smAndDown ? 300 : 400" />
        </v-col>
        <v-col cols="12" md="auto">
          <p>
            <a class="hide-link" href="mailto:sam.druant@gmail.com"><b>email</b> me</a>
          </p>
          <p>
            <a class="hide-link" target="_blank" rel="noreferrer" href="https://www.instagram.com/samdruant"><b>visit</b>
              my instagram</a>
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
