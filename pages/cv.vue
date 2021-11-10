<template>
	<div class="text-center">
		<pdf src="./docs/cv.pdf" />
	</div>
</template>

<script>
import pdf from "vue-pdf";
export default {
	components: { pdf }
};
</script>
