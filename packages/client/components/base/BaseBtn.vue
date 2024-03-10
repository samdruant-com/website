<script setup lang="ts">

import type { PropType } from 'vue';

const props = defineProps({
	rounded: { 
		type: String, 
		default: undefined
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

const emit = defineEmits([ 'click' ]);

const getClass = computed(() => {
	const classes = [];
	
	// color
	if(props.disabled){
		classes.push('bg-slate-400');
	} else {
    classes.push('bg-primary');
  }

  // center text
  classes.push('text-center');

	// add rounded class
	classes.push(props.rounded ? `rounded-${props.rounded}` : 'rounded-lg');

	// add some padding
	classes.push('p-2');

	return classes.join(' ');
});

</script>

<template>
  <NuxtLink
    v-if="props.to"
    :class="getClass"
    :to="props.disabled ? undefined : props.to"
  >
    <slot />
  </NuxtLink>
  
  <NuxtLink
    v-else-if="props.href"
    :class="getClass"
    :disabled="props.disabled"
    :href="props.href"
    :target="props.target"
  >
    <slot />
  </NuxtLink>
  
  <button
    v-else
    :class="getClass"
    :disabled="props.disabled"
    :href="props.to"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
