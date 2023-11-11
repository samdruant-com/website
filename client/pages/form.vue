<script setup lang="ts">
const editor = ref<string>('hey')
</script>

<template>
  <base-page title="Forms">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h3>Text Editor</h3>
        <input-editor v-model="editor" label="Enter text" />

        <h4>Output</h4>
        <v-sheet color="grey lighten-3" class="pa-3">
          <p>{{ editor }}</p>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="8">
        <h3>Text Input</h3>
        <InputText label="Enter text" place-holder="This is a placeholder" />
      </v-col>

      <v-col cols="12" md="8">
        <h3>Password Input</h3>
        <InputText label="Enter password" place-holder="This is a placeholder" type="password" />
      </v-col>

      <v-col cols="12" md="8">
        <h3>Larger Text Input</h3>
        <InputTextArea label="Enter more text" place-holder="Another placeholder" />
      </v-col>

      <v-col cols="12" md="8">
        <h3>Date Input</h3>
        <InputDateTime label="Enter a date" />
      </v-col>

      <v-col cols="12" md="8">
        <h3>Upload Files</h3>
        <InputFile label="Upload a file" />
      </v-col>
    </v-row>
  </base-page>
</template>