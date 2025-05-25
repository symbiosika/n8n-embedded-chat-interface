import { createGlobalState } from "@vueuse/core";
import { useToast } from "@/components/ui/toast/use-toast";
import type { N8nMessageResponse } from "@/types/chat";

export const useN8n = createGlobalState(() => {
	const { appConfig } = useApp();
	const { toast } = useToast();

	const messages = ref<{ role: "user" | "assistant"; content: string }[]>([]);
	const userInput = ref("");
	const isLoading = ref(false);
	const sessionId = ref<string | null>(null);

	const sendMessage = async (chatInput: string) => {
		if (chatInput.trim() === "") {
			userInput.value = "";
			toast({ title: "Please enter a message" });
			return;
		}

		messages.value.push({ role: "user", content: chatInput });
		messages.value.push({ role: "assistant", content: "Thinking..." });

		isLoading.value = true;

		try {
			const body: Record<string, any> = { chatInput };
			if (sessionId.value) body.sessionId = sessionId.value;

			const response = await fetch(appConfig.value.hostname, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!response.ok) throw new Error(await response.text());
			const data: N8nMessageResponse = await response.json();
			const answer = typeof data === "string" ? data : data.output;
			if (data.sessionId) sessionId.value = data.sessionId;
			messages.value[messages.value.length - 1] = { role: "assistant", content: answer };
			userInput.value = "";
		} catch (error) {
			messages.value[messages.value.length - 1] = { role: "assistant", content: "Fehler: " + (error as any).message };
			toast({ title: "Fehler bei der Anfrage", variant: "destructive" });
		} finally {
			isLoading.value = false;
		}
	};

	const clearChat = () => {
		messages.value = [];
		userInput.value = "";
		isLoading.value = false;
		sessionId.value = null;
	};

	return { messages, userInput, sendMessage, isLoading, clearChat };
});
