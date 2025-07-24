<template>
	<div class="flex h-full flex-col justify-between gap-2">
		<div class="h-full overflow-hidden">
			<div class="h-full overflow-y-auto p-2 pb-0" id="chat-messages-container">
				<h3 v-if="messages.length === 0" class="flex h-full items-center justify-center font-semibold">
					{{ t("helpPrompt") }}
				</h3>
				<div v-else>
					<div v-for="(msg, idx) in messages" :key="idx" class="mb-2">
						<div :class="msg.role === 'user' ? 'text-right' : 'text-left'">
							<span v-if="msg.role === 'user'" class="inline-block max-w-[80%] rounded bg-primary px-3 py-2 text-white">
								{{ msg.content }}
							</span>
							<Renderer class="inline-block max-w-[80%] rounded bg-gray-200 px-3 py-2 dark:bg-zinc-800" v-else :content="msg.content" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="p-2 pt-0">
			<div :class="{ '!border-primary': focused }" class="relative mx-auto w-full max-w-[666px] overflow-hidden rounded-md border duration-200 hover:border-primary/40 dark:border-zinc-700">
				<!-- chat input -->
				<Textarea :disabled="isLoading" @keydown.enter.exact.prevent="sendMessage(userInput)" v-if="!isLoading" v-model="userInput" :class="focused ? 'h-[84px]' : 'h-[32px]'" class="mb-2 resize-none transition-all duration-200" @blur="focused = false" :placeholder="t('askAnything')" @click="focused = true" />

				<div class="flex w-full justify-between bg-white p-1 dark:bg-zinc-900">
					<!-- options (nur Reset) -->
					<div class="flex items-center gap-1">
						<Button :disabled="isLoading" class="size-8 rounded-full border p-0 text-neutral-600 hover:bg-neutral-200" variant="secondary" @click="clearChat">
							<FluentErase24Regular class="text-lg" />
						</Button>
					</div>
					<div class="flex items-center gap-2">
						<Thinking v-if="isLoading" class="m-[5px]" />
						<Button :disabled="isLoading" class="size-8 rounded-full p-0" @click="sendMessage(userInput)">
							<PaperPlaneIcon class="text-lg" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PaperPlaneIcon from "~icons/fluent/send-24-regular";
import Thinking from "@/components/Thinking.vue";
import { useN8n } from "@/stores/n8n";
import Renderer from "@/components/markdown/Renderer.vue";
import FluentErase24Regular from "~icons/fluent/eraser-24-regular";
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";

const { t } = useI18n();
const { messages, userInput, sendMessage, isLoading, clearChat, initializeChat } = useN8n();
const focused = ref(false);

onMounted(() => {
	initializeChat();
});
</script>
