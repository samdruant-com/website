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

const form = reactive({
  date: props.modelValue ? convertToDateTime(props.modelValue).date : '',
  time: props.modelValue ? convertToDateTime(props.modelValue).time : ''
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

function convertToUnix(dateTime: { date: string; time: string }): number {
  const [hour, minute] = dateTime.time.split(':');
  return hour && minute
    ? DayJs(dateTime.date).hour(Number(hour)).minute(Number(minute)).unix()
    : DayJs(dateTime.date).unix();
}

function convertToDateTime(unix: number | string): {
  date: string;
  time: string;
} {
  if (typeof unix === 'string') {
    unix = Number(unix);
  }

  const date = DayJs.unix(unix);
  return {
    date: date.format('YYYY-MM-DD'),
    time: date.format('HH:mm')
  };
}

watch(
  () => form,
  () => {
    if (validForm.value) {
      const unix: number = convertToUnix(form);
      console.log('unix', unix);
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
