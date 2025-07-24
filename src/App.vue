<template>
	<div>
		<!-- Toolbar -->
		<header class="sticky top-0 z-50 flex items-center justify-between bg-white/80 px-6 py-3 shadow-md backdrop-blur-md dark:bg-neutral-900/80">
			<div class="flex items-center gap-2">
				<button class="rounded-md bg-primary px-4 py-2 text-white" @click="setLocale('de')">Deutsch</button>
				<button class="rounded-md bg-primary px-4 py-2 text-white" @click="setLocale('en')">English</button>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-black dark:text-red-500">Mode: {{ isDark ? "Dark" : "Light" }}</span>
				<button class="rounded-full bg-neutral-200 p-2 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700" @click="toggleDark">
					<svg v-if="!isDark" class="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
					<svg class="h-5 w-5 text-blue-400" v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
				</button>
			</div>
		</header>
		<!-- For testing -->
		<N8nEmbeddedChatInterface label="n8n Chat Demo" description="This is a n8n Chat Demo" :hostname="testUrl" mode="n8n" open-on-start="true" initial-message="Hello, how are you?" />
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDark, useToggle } from "@vueuse/core";
import N8nEmbeddedChatInterface from "./components/N8nEmbeddedChatInterface.vue";

const testUrl = ref(import.meta.env.VITE_N8N_TEST_WEBHOOK_URL ?? "");

// Use vue-i18n composable
const { locale } = useI18n();
const isDark = useDark();
const toggleDark = useToggle(isDark);
// Function to change language
function setLocale(lang) {
	locale.value = lang;
}
</script>
