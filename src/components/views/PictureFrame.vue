<template>
  <div>
    <b-row align-h="center">
      <b-col cols="auto">
        <b-img :src="src" />
      </b-col>
      <b-col cols="12" />
      <b-col cols="auto">
        {{ `${title}, (${size}), ${material}` }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
	export default {
		name: "PictureFrame",
		props:{
			title: {
				type: String,
				required: true
			},
			src: {
				type: String,
				required: true
			},
			material: {
				type: String,
				required: true
			},
			size: {
				type: String,
				required: true
			}
		}
	};
</script>
