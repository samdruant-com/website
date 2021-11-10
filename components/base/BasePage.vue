<template>
	<div
		id="base-page"
		class="pa-2">
		<slot name="title">
			<h1 class="text-center">
				{{ title }}
			</h1>
		</slot>

		<div class="mt-2">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: undefined
		}
	}
};
</script>
