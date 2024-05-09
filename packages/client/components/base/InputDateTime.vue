<script setup lang="ts">
import DayJs from 'dayjs';

const props = defineProps({
  modelValue: {
    type: [Number, String],
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

const { convertDateTimeToUnix, convertUnixToDateTime } = useDate();

const form = reactive({
  date: props.modelValue ? convertUnixToDateTime(props.modelValue).date : '',
  time: props.modelValue ? convertUnixToDateTime(props.modelValue).time : ''
});

const validDate = computed<boolean>(() => {
  return props.hideDate ? true : DayJs(form.date).isValid();
});

const validTime = computed<boolean>(() => {
  const [hour, minute] = form.time.split(':');
  return props.hideTime
    ? true
    : DayJs(validDate.value ? form.date : undefined)
      .hour(Number(hour))
      .minute(Number(minute))
      .isValid();
});

const validForm = computed<boolean>(() => {
  return validDate.value && validTime.value;
});

watch(
  () => form,
  () => {
    if (validForm.value) {
      const unix: number = convertDateTimeToUnix(form);
      emit('update:model-value', unix);
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
    <InputText v-if="!props.hideTime" v-model="form.time" type="time" :label="props.labelTime" />
    <InputText v-if="!props.hideDate" v-model="form.date" type="date" :label="props.labelDate" />
  </div>
</template>
