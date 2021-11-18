<template>
	<v-row
		id="status-404"
		justify="center">
		<v-col
			cols="10"
			md="5">
			<h1 class="underline">
				404
			</h1>
			<h2>
				The page you are looking for does not exist.
			</h2>
		</v-col>
	</v-row>
</template>

<script>
export default {

};
</script>

<style>
#status-404 {
	margin-top: 20%;
}
.underline {
	text-decoration: underline;
}

@media screen and (max-width: 480px) {
  /* add styling for mobile screens here */
	#status-404 {
		margin-top: 40%;
	}
}

</style>
