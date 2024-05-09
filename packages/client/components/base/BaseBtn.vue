<script setup lang="ts">

import type { PropType } from 'vue';

type ButtonSize = 'small' | 'medium' | 'large' | 'x-large';

const props = defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: undefined
  },
  outlined: {
    type: Boolean,
    default: undefined
  },
  rounded: {
    type: String,
    default: undefined
  },
  noHover: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: undefined
  },
  href: {
    type: String,
    default: undefined
  },
  target: {
    type: String as PropType<'_blank'>,
    default: '_blank'
  },
  disabled: {
    type: Boolean,
    default: undefined
  }
});

const emit = defineEmits(['click']);

const getClass = computed(() => {
  const classes = [];

  // color
  if (props.disabled) {
    classes.push('bg-slate-400');
  } else {
    classes.push(props.color ? `bg-${props.color}` : '');
  }

  // add rounded class
  classes.push(props.rounded ? `rounded-${props.rounded}` : 'rounded-lg');

  // add some padding
  classes.push('p-2');

  // size
  if (props.size === 'small') {
    classes.push('text-sm');
  } else if (props.size === 'medium') {
    classes.push('text-lg');
  } else if (props.size === 'large') {
    classes.push('text-xl');
  } else if (props.size === 'x-large') {
    classes.push('text-2xl');
  }

  return classes.join(' ');
});

</script>

<template>
  <NuxtLink v-if="props.to" :class="getClass" :to="props.disabled ? undefined : props.to">
    <slot />
  </NuxtLink>

  <NuxtLink v-else-if="props.href" :class="getClass" :disabled="props.disabled" :href="props.href"
    :target="props.target">
    <slot />
  </NuxtLink>

  <button v-else :class="getClass" :disabled="props.disabled" :href="props.to" @click="emit('click')">
    <slot />
  </button>
</template>
