<script setup lang="ts">
import DayJs from 'dayjs';

const props = defineProps({
  /**
   * Timestamp
   */
  value: {
    type: Number,
    default: undefined
  },
  label: {
    type: String,
    default: ''
  },
  labelDate: {
    type: String,
    default: 'Date'
  },
  labelTime: {
    type: String,
    default: 'Time'
  },
  hideDate: {
    type: Boolean,
    default: false
  },
  hideTime: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'transparent'
  }
});

const emit = defineEmits(['update:model-value']);

const form = reactive({
  date: '',
  time: ''
});

const validDate = computed<boolean>(() => {
  return props.hideDate ? true : DayJs(form.date).isValid();
})

const validTime = computed<boolean>(() => {
  const [hour, minute] = form.time.split(':');
  return props.hideTime ? true : DayJs(validDate.value ? form.date : undefined).hour(Number(hour)).minute(Number(minute)).isValid();
})

const validForm = computed<boolean>(() => {
  return validDate.value && validTime.value;
});

const getDateTimeUnix = computed<number>(() => {
  let date = !props.hideDate && validDate.value ? DayJs(form.date) : DayJs();

  const [hour, minute] = form.time.split(':');
  date = !props.hideTime && validTime.value ? date.hour(Number(hour)).minute(Number(minute)) : date;

  return date.unix();
});

watch(() => form,
  () => {
    if (validForm.value) {
      emit('update:model-value', getDateTimeUnix.value);
    }
  },
  { deep: true }
);
</script>

<template>
  <v-row justify="center" no-gutters>
    <v-col v-if="!props.hideTime" :cols="props.hideDate ? 12 : 6">
      <InputText v-model="form.time" type="time" :label="props.labelTime" />
    </v-col>

    <v-col v-if="!props.hideDate" :cols="props.hideTime ? 12 : 6">
      <InputText v-model="form.date" type="date" :label="props.labelDate" />
    </v-col>
  </v-row>
</template>
