<template>
  <div>
    <b-row
      align-h="center"
      align-v="center">
      <b-col cols="11">
        <picture-frame
          :title="currentWork.title"
          :src="currentWork.src"
          :size="currentWork.size"
          :material="currentWork.material" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
	import PictureFrame from "../views/PictureFrame.vue";
	export default {
		name: "Landing",
		components: { PictureFrame },
		data: function(){
			return {
				currentWork: {
					title: "Putin 1",
					size: "100cm x 200cm",
					material: "Manliness, Strength, Power, Macho",
					src: require("../../assets/images/putin1.jpg")
				},
				works: [
					{
						title: "Putin 1",
						size: "100cm x 200cm",
						material: "Manliness, Strength, Power, Macho",
						src: require("../../assets/images/putin1.jpg")
					}
				]
			};
		}
	};
</script>
