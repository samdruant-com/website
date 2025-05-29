<script setup lang="ts">
/**
 * Actions to be displayed in the card footer.
 */
export interface ActionItem {
  label: string
  description?: string
  color?: string
  icon?: string
  disabled?: boolean
  outlined?: boolean
  hint?: string
  to?: string
  action?: () => void
}

const props = defineProps({
  title: {
    type: String,
    default: undefined
  },
  subtitle: {
    type: String,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  colorIntensity: {
    type: Number,
    default: 400
  },
  rounded: {
    type: String,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Array as PropType<ActionItem[]>,
    default: () => []
  }
});

const getClass = computed(() => {
  const classes = [];

  // add color class
  classes.push(`bg-${props.color || "secondary"}-${props.colorIntensity}`);

  // add rounded class
  classes.push(`rounded-${props.rounded || "lg"}`);

  return classes.join(" ");
});
</script>

<template>
  <div :class="getClass">
    <slot />

    <div v-if="props.actions.length" class="flex justify-end p-2">
      <base-btn
        v-for="action in props.actions"
        :key="action.label"
        :color="action.color"
        :disabled="action.disabled"
        :outlined="action.outlined"
        :hint="action.hint"
        :to="action.to"
        @click="action.action"
      >
        {{ action.label }}
      </base-btn>
    </div>
  </div>
</template>
