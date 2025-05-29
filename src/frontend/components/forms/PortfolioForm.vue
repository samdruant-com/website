<script setup lang="ts">
import type { ActionItem } from "~/components/base/BaseCard.vue";
import type { Portfolio } from "~/types";
import { usePortfolioStore } from "~/stores/portfolio.store";

const props = defineProps({
  portfolio: {
    type: Object as PropType<Portfolio>,
    required: true
  }
});

const emit = defineEmits(["updated"]);

const portfolioStore = usePortfolioStore();
const { notify } = useNotification();

const form = reactive<Partial<Portfolio>>({
  name: props.portfolio?.name || "",
  email: props.portfolio?.email || "",
  socials: props.portfolio?.socials || []
});

const socialForm = reactive({
  name: "",
  url: ""
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
      label: "Update",
      disabled: !validForm.value,
      color: validForm.value ? "success" : undefined,
      action: async () => {
        try {
          // if id is empty, we want to post, otherwise patch
          const portfolio: Portfolio = props.portfolio._id.trim().length === 0
            ? await portfolioStore.postPortfolio(form)
            : await portfolioStore.patchPortfolio(props.portfolio._id, form);

          emit("updated", portfolio);
        } catch (error) {
          notify("Portfolio Error", (error as Error).message, "error");
        }
      }
    }
  ];
});

function addSocial(): void {
  if (socialForm.name.length === 0 || socialForm.url.length === 0) {
    return;
  }

  if (form.socials!.find(social => social.name === socialForm.name)) {
    return notify("Duplicate Social", `You already have a social media named <b>${socialForm.name}</b>`, "error");
  }

  form.socials!.push({
    name: socialForm.name,
    url: socialForm.url
  });

  socialForm.name = "";
  socialForm.url = "";
}

function removeSocial(name: string): void {
  const index: number = form.socials!.findIndex(social => social.name === name);
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

    <div class="mt-2 grid grid-cols-1 md:grid-cols-4">
      <span class="col-span-4 font-semibold">Social Media</span>

      <div class="my-2 col-span-4 flex flex-cols md:flex-row">
        <InputText v-model="socialForm.name" label="Social Media Name" />
        <InputText v-model="socialForm.url" label="Social Media URL" />

        <!-- next line -->
        <base-btn class="bg-primary text-xs mt-2 mx-1 md:col-span-4 max-h-10" @click="addSocial">
          Add Social
        </base-btn>
      </div>

      <div v-for="social in form.socials" :key="social.name" class="flex flex-col bg-slate-100 p-2 mr-2 mt-2">
        <InputText v-model="social.name" label="Social Media Name" />
        <InputText v-model="social.url" label="Social Media URL" />

        <base-btn class="bg-yellow-200 text-xs mt-2 mx-1 md:col-span-4" @click="removeSocial(social.name)">
          Remove Social
        </base-btn>
      </div>
    </div>
  </base-card>
</template>
