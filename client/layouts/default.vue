<template>
  <v-app>
    <!-- navigation -->
    <app-nav />
    <app-sidebar />

    <!-- main content -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="11" md="10">
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- footer -->
    <app-footer />

    <!-- notification -->
    <toaster />
  </v-app>
</template>