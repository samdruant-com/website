<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio-store';
import type { Portfolio } from '~/types';
import type { ActionItem } from '~/components/base/BaseCard.vue';

const props = defineProps({
  portfolio: {
    type: Object as PropType<Portfolio>,
    required: true
  }
});

const emit = defineEmits(['updated']);

const portfolioStore = usePortfolioStore();
const { notify } = useNotification();

const form = reactive<Partial<Portfolio>>({
  name: props.portfolio?.name || '',
  email: props.portfolio?.email || '',
  socials: props.portfolio?.socials || []
});

const socialForm = reactive({
  name: '',
  url: ''
});

// TODO: add validation for socials
const validForm = computed<boolean>(() => {
  const validName: boolean = form.name ? form.name.length > 0 : false;
  const validEmail: boolean = form.email ? form.email.length > 0 : false;
  return validName === true && validEmail === true;
});

const options = computed<ActionItem[]>(() => {
  return [
    {
      label: 'Update',
      disabled: !validForm.value,
      color: validForm.value ? 'success' : undefined,
      action: async () => {
        try {
          // if id is empty, we want to post, otherwise patch
          const portfolio: Portfolio = props.portfolio._id.trim().length === 0
            ? await portfolioStore.postPortfolio(form)
            : await portfolioStore.patchPortfolio(props.portfolio._id, form);
          
          emit('updated', portfolio);
        } catch (error) {
          notify('Portfolio Error', (error as Error).message, 'error');
        }
      }
    }
  ];
});

function addSocial(): void {
  if (socialForm.name.length === 0 || socialForm.url.length === 0) {
    return;
  }

  if(form.socials!.find((social) => social.name === socialForm.name)) {
    return notify('Duplicate Social', `You already have a social media named <b>${socialForm.name}</b>`, 'error');
  }

  form.socials!.push({
    name: socialForm.name,
    url: socialForm.url
  });

  socialForm.name = '';
  socialForm.url = '';
}

function removeSocial(name: string): void {
  const index: number = form.socials!.findIndex((social) => social.name === name);
  if (index === -1) {
    return;
  }

  form.socials!.splice(index, 1);
}
</script>

<template>
  <base-card :actions="options">
    <InputText v-model="form.name" label="Name" />
    <InputText v-model="form.email" label="Email" />

    <v-divider class="border-opacity-50 my-4" />
    <v-row v-for="social in form.socials" :key="social.name" justify="center" no-gutters>
      <v-col cols="12" md="4" class="mt-2 mx-1">
        <InputText v-model="social.name" />
      </v-col>
      <v-col cols="12" md="4" class="mt-2 mx-1">
        <InputText v-model="social.url" label="Social Media URL" />
      </v-col>
      <v-col cols="auto" class="mt-2 mx-1">
        <base-btn color="warning" @click="removeSocial(social.name)">Remove Social</base-btn>
      </v-col>
    </v-row>
    
    <v-row justify="center" no-gutters>
      <v-col cols="12" md="5" class="mt-2 mx-1">
        <InputText v-model="socialForm.name" label="Social Media Name" />
      </v-col>
      <v-col cols="12" md="5" class="mt-2 mx-1">
        <InputText v-model="socialForm.url" label="Social Media URL" />
      </v-col>
      <v-col cols="auto" class="mt-2 mx-1">
        <base-btn color="info" @click="addSocial">Add Social</base-btn>
      </v-col>
    </v-row>
  </base-card>
</template>
