<script setup lang="ts">
const router = useRouter();

const inStartPage = computed<boolean>(
	() => router.currentRoute.value.path === "/"
);
</script>

<template>
	<v-app>
		<!-- navigation -->
		<app-nav v-if="!inStartPage" />
		<app-sidebar />

		<!-- main content -->
		<v-main>
			<v-container>
				<v-row justify="center">
					<v-col cols="11" md="10">
						<slot></slot>
					</v-col>
				</v-row>
			</v-container>
		</v-main>

		<!-- footer -->
		<app-footer />

		<!-- notification -->
		<Toaster />
	</v-app>
</template>
