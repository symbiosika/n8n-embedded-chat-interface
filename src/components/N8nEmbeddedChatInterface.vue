<template>
	<div class="fixed bottom-4 right-4 size-14 cursor-pointer rounded-full bg-primary" @click="show = !show">
		<span class="flex h-full select-none items-center justify-center text-xl text-white [&>*]:size-8">
			<Question v-if="!show" />
			<Close v-else />
		</span>
	</div>

	<div v-if="show" :class="[isMaximized ? 'inset-0' : 'shadow-main-ui bottom-20 right-4 h-[460px] w-80 rounded-md border', 'fixed overflow-hidden bg-white dark:bg-neutral-950']">
		<div class="flex h-10 items-center justify-between bg-primary p-2">
			<h1 class="text-sm text-white">{{ appConfig.label }}</h1>
			<div class="flex items-center">
				<!-- TODO: add settings icon -->
				<!-- <button class="flex size-7 cursor-pointer items-center justify-center rounded-md p-[5px] text-white hover:bg-white/15">
					<SettingsIcon />
				</button> -->
				<!-- TODO: add dark mode toggle -->
				<!-- <button class="mr-1 flex size-7 cursor-pointer items-center justify-center rounded-md text-white hover:bg-white/15" @click="toggleDark()">
					<SunIcon v-if="!isDark" />
					<MoonIcon v-else />
				</button> -->
				<button class="flex size-7 cursor-pointer items-center justify-center rounded-md text-white hover:bg-white/15" @click="isMaximized = !isMaximized">
					<Maximize v-if="!isMaximized" />
					<ShrinkIcon v-else />
				</button>
			</div>
		</div>
		<div class="h-[calc(100%-40px)] overflow-auto">
			<!-- Render content based on mode prop -->
			<template v-if="props.mode === 'n8n'">
				<ChatN8n />
			</template>
		</div>
	</div>
	<!-- toaster -->
	<Toaster />
</template>

<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import Maximize from "~icons/flowbite/expand-outline";
import Question from "~icons/proicons/question";
import Close from "~icons/material-symbols/close-rounded";
import ShrinkIcon from "~icons/lucide/shrink";

import ChatN8n from "@/components/chat/n8n/Index.vue";

import { useDark, useToggle } from "@vueuse/core";
import { useApp } from "@/stores/App";

// import SunIcon from "~icons/mdi/weather-sunny";
// import MoonIcon from "~icons/mdi/weather-night";
// import SettingsIcon from "~icons/ic/round-settings";

const { isMaximized, show, appConfig } = useApp();

const props = defineProps({ label: String, description: String, token: String, organisationId: String, assistant: String, hostname: String, mode: String, openOnStart: String });

const isDark = useDark();
const toggleDark = useToggle(isDark);

type Mode = "n8n"; // to be extended later

const parseMode = (input?: string): Mode => {
	console.log("input", input);
	if (input && input === "n8n") {
		return input;
	} else {
		return "n8n";
	}
};
const parsedMode = parseMode(props.mode);
const tab = ref<Mode>(parsedMode);

onBeforeMount(() => {
	show.value = props.openOnStart === "true";
	appConfig.value = {
		label: props.label ?? "",
		description: props.description ?? "",
		hostname: props.hostname ?? "",
		mode: parsedMode,
	};
	console.log("appConfig", JSON.stringify(appConfig.value, null, 2));
});
</script>
