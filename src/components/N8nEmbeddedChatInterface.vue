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
			<template v-if="appConfig.mode === 'n8n'">
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
import { getCurrentInstance } from "vue";

// import SunIcon from "~icons/mdi/weather-sunny";
// import MoonIcon from "~icons/mdi/weather-night";
// import SettingsIcon from "~icons/ic/round-settings";

const { isMaximized, show, appConfig } = useApp();

const props = defineProps({ 
	label: String, 
	description: String, 
	token: String, 
	organisationId: String, 
	assistant: String, 
	hostname: String, 
	mode: String, 
	openOnStart: String,
	// Custom color scheme props (max 10 colors)
	primaryColor: String,
	secondaryColor: String,
	backgroundColor: String,
	textColor: String,
	accentColor: String,
	surfaceColor: String,
	borderColor: String,
	successColor: String,
	warningColor: String,
	errorColor: String
});

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

// Function to inject custom color CSS variables
const injectCustomColors = () => {
	const colorMappings = {
		'--custom-primary': props.primaryColor,
		'--custom-secondary': props.secondaryColor,
		'--custom-background': props.backgroundColor,
		'--custom-text': props.textColor,
		'--custom-accent': props.accentColor,
		'--custom-surface': props.surfaceColor,
		'--custom-border': props.borderColor,
		'--custom-success': props.successColor,
		'--custom-warning': props.warningColor,
		'--custom-error': props.errorColor
	};

	// Find the shadow root (we're inside a web component)
	let targetElement = document.documentElement;
	const currentElement = getCurrentInstance()?.vnode.el;
	if (currentElement) {
		// Look for shadow root
		let parent = currentElement.parentNode;
		while (parent && parent.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
			parent = parent.parentNode;
		}
		if (parent && parent.host) {
			targetElement = parent.host as HTMLElement;
		}
	}

	// Create or find existing style element for custom colors
	let styleElement = targetElement.querySelector('#custom-colors-style') as HTMLStyleElement;
	if (!styleElement) {
		styleElement = document.createElement('style');
		styleElement.id = 'custom-colors-style';
		if (targetElement === document.documentElement) {
			document.head.appendChild(styleElement);
		} else {
			// We're in shadow DOM, inject into shadow root
			const shadowRoot = targetElement.shadowRoot || (targetElement as any).getRootNode();
			if (shadowRoot && shadowRoot.appendChild) {
				shadowRoot.appendChild(styleElement);
			}
		}
	}

	// Build CSS with custom properties and Tailwind class overrides
	let cssContent = ':host, :root {\n';
	Object.entries(colorMappings).forEach(([property, value]) => {
		if (value) {
			cssContent += `  ${property}: ${value};\n`;
		}
	});
	cssContent += '}\n\n';

	// Add Tailwind utility overrides when custom colors are provided
	if (props.primaryColor) {
		cssContent += `.bg-primary { background-color: var(--custom-primary) !important; }\n`;
		cssContent += `.text-primary { color: var(--custom-primary) !important; }\n`;
		cssContent += `.border-primary { border-color: var(--custom-primary) !important; }\n`;
	}
	if (props.secondaryColor) {
		cssContent += `.bg-secondary { background-color: var(--custom-secondary) !important; }\n`;
		cssContent += `.text-secondary { color: var(--custom-secondary) !important; }\n`;
	}
	if (props.backgroundColor) {
		cssContent += `.bg-white { background-color: var(--custom-background) !important; }\n`;
	}
	if (props.textColor) {
		cssContent += `.text-white { color: var(--custom-text) !important; }\n`;
		cssContent += `.text-black { color: var(--custom-text) !important; }\n`;
	}
	if (props.surfaceColor) {
		cssContent += `.bg-surface-0, .bg-surface-50 { background-color: var(--custom-surface) !important; }\n`;
	}
	if (props.borderColor) {
		cssContent += `.border, .border-gray-200 { border-color: var(--custom-border) !important; }\n`;
	}

	styleElement.textContent = cssContent;
};

onBeforeMount(() => {
	show.value = props.openOnStart === "true";
	appConfig.value = {
		label: props.label ?? "",
		description: props.description ?? "",
		hostname: props.hostname ?? "",
		mode: parsedMode,
	};
	console.log("appConfig", JSON.stringify(appConfig.value, null, 2));
	
	// Inject custom colors if provided
	injectCustomColors();
});
</script>
