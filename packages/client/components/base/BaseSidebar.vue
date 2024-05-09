<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
});

const show = ref(false);

const emits = defineEmits(['close']);

watch(() => props.visible, (value) => {
  show.value = value;
});

onMounted(() => {
  show.value = props.visible;
});
</script>

<template>
  <div class="drawer">
    <input :id="props.id" type="checkbox" class="drawer-toggle" v-model="show">
    <div class="drawer-content">
      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label :for="props.id" aria-label="close sidebar" class="drawer-overlay" />

      <div class="w-full h-full flex flex-col bg-background">
        <base-btn class="max-w-20 text-4xl font-semibold" @click="emits('close');" color="transparent">
          <span class="i-mdi-close" />
        </base-btn>

        <slot />
      </div>
    </div>
  </div>
</template>
