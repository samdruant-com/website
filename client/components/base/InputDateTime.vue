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

const emit = defineEmits(['update:modelValue']);

const form = reactive({
  date: '',
  time: ''
});

const dateTime = computed<number>(() => {
  const [year, month, day] = form.date.split('-');
  const [hour, minute] = form.time.split(':');

  const date = (!year || !month || !day)
    ? DayJs()
    : DayJs().year(Number(year)).month(Number(month)).day(Number(day));

  return date.hour(Number(hour)).minute(Number(minute)).unix();
});

const validForm = computed<boolean>(() => {
  const validDate = props.hideDate ? true : DayJs(form.date).isValid();

  if (form.time.length !== 5) { return false; }
  const [hour, minute] = form.time.split(':');
  const validTime = props.hideTime ? true : DayJs().hour(Number(hour)).minute(Number(minute)).isValid();

  return validDate && validTime;
});

watch(() => validForm.value, (valid) => {
  if (valid) {
    emit('update:modelValue', dateTime.value);
  }
});
</script>

<template>
  <BaseCard :color="props.color">
    <v-row justify="center">
      <v-col v-if="!props.hideTime" :cols="props.hideDate ? 12 : 6" :md="props.hideDate ? 'auto' : 6">
        <InputText v-model="form.time" type="time" :label="props.labelTime" />
      </v-col>

      <v-col v-if="!props.hideTime" :cols="props.hideTime ? 12 : 6" :md="props.hideTime ? 'auto' : 6">
        <InputText v-model="form.date" type="date" :label="props.labelDate" />
      </v-col>
    </v-row>
  </BaseCard>
</template>
