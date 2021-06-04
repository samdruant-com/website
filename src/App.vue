<template>
  <div>
    <b-container
      id="container"
      fluid>
      <b-navbar
        toggleable="sm"
        sticky>
        <b-navbar-brand class="brand">
          Sam Druant
        </b-navbar-brand>

        <b-navbar-toggle target="sidebar-nav" />
        <b-collapse
          id="nav"
          is-nav>
          <b-navbar-nav
            class="ml-auto"
            align="end">
            <!-- links -->
            <b-nav-form>
              <b-link class="mx-2 simple-link">
                Work
              </b-link>
              <b-link class="mx-2 simple-link">
                About
              </b-link>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-row
        id="content"
        align-h="center"
        align-v="stretch">
        <b-col cols="12">
          <router-view />
        </b-col>
      </b-row>

      <b-row
        id="footer"
        class="mb-3"
        align-h="center">
        <b-col
          cols="auto"
          class="mx-1">
          <img
            src="./assets/svgs/instagram.svg"
            width="auto"
            height="20px"
            style="color: #000000;">
        </b-col>
        <b-col
          cols="auto"
          class="mx-1">
          sam@mail.com
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
	export default {
		name: "App",
	};
</script>
