<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "primary"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: "Upload"
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const files = ref<File[]>([]);

const getFileSize = computed(() => {
  return files.value.reduce((acc, file) => acc + file.size, 0);
});

function handleFiles(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    files.value = Array.from(target.files);
  }
}

watch(files, (files) => {
  if (files.length > 0) {
    if (props.multiple) {
      emit("update:modelValue", files);
    } else {
      emit("update:modelValue", files.slice(0, 1));
    }
  }
});
</script>

<template>
  <div class="flex flex-col">
    <label v-if="props.label">{{ props.label }}</label>
    <input type="file" :multiple="props.multiple" @change="handleFiles">
    <p v-if="files.length > 0" class="text-sm">
      {{ files.length }} files selected <span v-if="getFileSize > 0">({{ getFileSize }} bytes)</span>
    </p>
  </div>
</template>
