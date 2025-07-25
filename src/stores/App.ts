import { createGlobalState } from "@vueuse/core";

export const useApp = createGlobalState(() => {
	const show = ref(true);
	const isMaximized = ref(false);
	const chatSize = ref({
		width: 320, // 80 * 4 (w-80 in Tailwind)
		height: 460,
		minWidth: 280,
		minHeight: 300,
		maxWidth: 600,
		maxHeight: 700,
	});
	const appConfig = ref({
		label: "",
		description: "",
		hostname: "",
		mode: "",
		initialMessage: "",
	});
	return { isMaximized, show, chatSize, appConfig };
});
