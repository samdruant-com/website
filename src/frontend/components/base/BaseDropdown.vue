<script setup lang="ts">
export interface DropdownItem {
  label: string
  action?: () => void
  color?: string
}

const props = defineProps({
  color: {
    type: String,
    default: undefined
  },
  items: {
    type: Array as PropType<DropdownItem[]>,
    required: true
  }
});

const show = ref(false);

function toggle() {
  show.value = !show.value;
}
</script>

<template>
  <div>
    <base-btn :color="props.color" @click="toggle">
      <slot />
    </base-btn>

    <!-- select should be position directly under parent -->
    <div v-if="show" class="absolute top-full left-0 w-full bg-primary p-2" @change="toggle">
      <div
        v-for="item in props.items"
        :key="item.label"
        :value="item.label"
        :class="`text-${item.color || 'slate-300'} hover:bg-slate-300 hover:text-primary`"
        @click="item.action"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
