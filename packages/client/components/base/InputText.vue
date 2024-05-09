<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: String as PropType<string | number>,
    default: ""
  },
  label: {
    type: String,
    default: undefined,
  },
  placeHolder: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: "text",
    validator: (value: string) => {
      return ["text", "password", "date", "number"].includes(value);
    },
  },
  outlined: {
    type: Boolean,
    default: true,
  },
  isValid: {
    type: Boolean || null,
    default: null,
  },
  color: {
    type: String,
    default: undefined,
  },
});

const emits = defineEmits(["update:modelValue"]);

const data = reactive({
  input: props.modelValue,
  showDateMenu: false,
  showPassword: false,
});

function setData(value: string | number) {
  data.input = value;
}

watch(
  () => data.input,
  (newInput) => {
    emits("update:modelValue", newInput);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (newValue) => {
    setData(newValue);
  }
);
</script>

<template>
  <label class="form-control">
    <div v-if="props.label" class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>

    <div v-if="type === 'password'" class="flex items-center gap-2 w-full">
      <input v-model="data.input" :type="data.showPassword ? 'text' : 'password'" :placeholder="placeHolder"
        class="input w-full">

      <base-btn class="bg-slate-400" @click="data.showPassword = !data.showPassword">
        {{ data.showPassword ? "hide" : "show" }}
      </base-btn>
    </div>

    <input v-else v-model="data.input" :type="type" :placeholder="placeHolder" class="input input-bordered w-full">
  </label>
</template>