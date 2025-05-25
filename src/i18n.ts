// i18n.ts - vue-i18n setup for English and German
import { createI18n } from "vue-i18n";

// English and German translations
const messages = {
	en: {
		uploadingArtifacts: "Uploading artifacts",
		thinking: "Thinking...",
		helpPrompt: "What can I help with?",
		askAnything: "Ask anything...",
	},
	de: {
		uploadingArtifacts: "Lade Anhänge hoch",
		thinking: "Denke nach...",
		helpPrompt: "Womit kann ich helfen?",
		askAnything: "Frag mich...",
	},
};

const i18n = createI18n({
	legacy: false, // Use Composition API
	locale: "en", // Default language
	fallbackLocale: "en",
	messages,
});

export default i18n;
