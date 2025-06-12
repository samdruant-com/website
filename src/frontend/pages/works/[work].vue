<script setup lang="ts">
const route = useRoute();
const formatter = useFormatter();

const { data, error, status } = await useAsyncData("work", async () => {
  const id = route.params.work;

  if (!id) {
    throw new Error("Work ID is not defined");
  }

  const work = await $fetch(`/api/works/${id}`);
  const thumbnail = work.photos[0]?.url || undefined;
  useSeoSetup({ title: work.title, image: thumbnail });

  return work;
});

const currentSlideshowIndex = ref<number>(0);
const showSlideshow = ref<boolean>(false);

const getTitle = computed<string>(() => {
  const name = data.value?.title || "N/a";
  const year = data.value?.date
    ? formatter.convertDateToYear(data.value.date)
    : "N/a";

  return `${name}, ${year}`;
});

const getDetails = computed<{ label: string, value: string }[]>(() => {
  const details: { label: string, value: string }[] = [];
  if (data.value?.size) {
    details.push({ label: "Size", value: data.value.size });
  }
  if (data.value?.material) {
    details.push({ label: "Material", value: data.value.material });
  }
  return details;
});

const getPhotos = computed(() => {
  return data.value?.photos || [];
});

function openSlideshow(index: number) {
  currentSlideshowIndex.value = index;
  showSlideshow.value = true;
}

function closeSlideshow() {
  showSlideshow.value = false;
}

function nextSlide() {
  if (!getPhotos.value.length) {
    return;
  }
  currentSlideshowIndex.value = (currentSlideshowIndex.value + 1) % getPhotos.value.length;
}

function prevSlide() {
  if (!getPhotos.value.length) {
    return;
  }
  currentSlideshowIndex.value = (currentSlideshowIndex.value - 1 + getPhotos.value.length) % getPhotos.value.length;
}

function handleKeydown(e: KeyboardEvent) {
  if (!showSlideshow.value) {
    return;
  }
  if (e.key === "Escape") {
    closeSlideshow();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <NuxtLayout name="page" :title="getTitle">
    <div v-if="data" class="flex flex-col items-center md:flex-row md:justify-between gap-2 md:gap-x-2 md:gap-y-4">
      <div
        id="work-details"
        class="w-full my-2 md:my-0 md:self-start md:basis-3/12 md:sticky md:top-16 md:max-h-[80vh] md:overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent"
        style="scrollbar-width: thin; scrollbar-color: transparent transparent;"
      >
        <span v-for="(detail, index) in getDetails" :key="detail.label">
          <span class="text-gray-600">{{ detail.label }}: {{ detail.value }}</span>
          <span v-if="index < getDetails.length - 1">,<br></span>
        </span>

        <div
          v-if="data?.description"
          class="mt-4 w-full"
          v-html="formatter.convertMarkdownToHtml(data.description)"
        />
      </div>
      <div id="work-images" class="flex flex-col items-center gap-4 md:grow">
        <div v-for="(image, index) in getPhotos" :key="image.id" class="flex flex-col items-center md:w-full md:max-w-2xl">
          <img
            :src="image.url"
            :alt="image.caption"
            class="block w-fit md:h-auto md:w-8/12 object-contain cursor-pointer"
            @click="openSlideshow(index)"
          >
          <div v-if="image.caption" class="mt-2 md:text-xs">
            {{ image.caption }}
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="text-red-500">
      <p>Error loading work: {{ error?.message }}</p>
    </div>
    <div v-else-if="status === 'pending'" class="text-gray-500">
      <p>Loading work...</p>
    </div>
    <div v-else class="text-gray-500">
      <p>No work found.</p>
    </div>

    <!-- Slideshow Modal -->
    <transition name="fade">
      <div v-if="showSlideshow" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
        <div class="absolute inset-0" @click="closeSlideshow" />
        <div class="relative z-10 flex flex-col items-center max-w-3xl w-full">
          <button
            class="absolute top-4 right-4 text-white text-3xl font-bold"
            @click="closeSlideshow"
          >
            &times;
          </button>
          <img :src="getPhotos[currentSlideshowIndex]?.url" :alt="getPhotos[currentSlideshowIndex]?.caption" class="max-h-[80vh] object-contain rounded shadow-lg">
          <div v-if="getPhotos[currentSlideshowIndex]?.caption" class="mt-4 text-white text-center">
            {{ getPhotos[currentSlideshowIndex]?.caption }}
          </div>
          <div class="flex justify-between w-full mt-4">
            <button
              class="text-white text-2xl px-4 py-2"
              @click="prevSlide"
            >
              &#8592; Prev
            </button>
            <button
              class="text-white text-2xl px-4 py-2"
              @click="nextSlide"
            >
              Next &#8594;
            </button>
          </div>
        </div>
      </div>
    </transition>
  </NuxtLayout>
</template>
