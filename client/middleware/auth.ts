import { useAuthStore } from '~/stores/auth-store';

export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	if (!authStore.isAuthenticated) {
		const path = `/404?redirect=${to.path}`;
    return navigateTo(path);
	}
});
