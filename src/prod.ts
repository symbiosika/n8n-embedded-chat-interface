import { createApp } from "vue";
import N8nEmbeddedChatInterface from "./components/N8nEmbeddedChatInterface.vue";
import i18n from "./i18n";
import { useCustomColors, type ColorProps } from "./composables/useCustomColors";

class N8nEmbeddedChatInterfaceElement extends HTMLElement {
	connectedCallback() {
		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" });
		}
		const mountPoint = document.createElement("div");
		if (this.shadowRoot) {
			this.shadowRoot.appendChild(mountPoint);
		}

		// Read attributes and pass them as props
		const props: Record<string, any> = {};
		for (const attr of this.getAttributeNames()) {
			// Convert dash-case attribute names to camelCase
			const camelCase = attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
			props[camelCase] = this.getAttribute(attr);
		}

		const app = createApp(N8nEmbeddedChatInterface, props);
		app.use(i18n);
		app.mount(mountPoint);
	}

	// Generate custom color CSS based on attributes using the secure composable
	protected generateCustomColorCSS(): string {
		const colorProps: ColorProps = {
			primaryColor: this.getAttribute('primary-color') || undefined,
			secondaryColor: this.getAttribute('secondary-color') || undefined,
			backgroundColor: this.getAttribute('background-color') || undefined,
			textColor: this.getAttribute('text-color') || undefined,
			accentColor: this.getAttribute('accent-color') || undefined,
			surfaceColor: this.getAttribute('surface-color') || undefined,
			borderColor: this.getAttribute('border-color') || undefined,
			successColor: this.getAttribute('success-color') || undefined,
			warningColor: this.getAttribute('warning-color') || undefined,
			errorColor: this.getAttribute('error-color') || undefined
		};

		const { generateCustomColorCSS } = useCustomColors(colorProps);
		return generateCustomColorCSS();
	}
}

// Load styles
fetch(new URL("./styles/output.css", import.meta.url))
	.then((res) => res.text())
	.then((css) => {
		class N8nEmbeddedChatInterfaceElementWithStyles extends N8nEmbeddedChatInterfaceElement {
			connectedCallback() {
				super.connectedCallback();
				try {
					const styleTag = document.createElement("style");
					// Combine main CSS with custom color CSS (now securely validated)
					styleTag.textContent = css + this.generateCustomColorCSS();
					if (this.shadowRoot) {
						this.shadowRoot.appendChild(styleTag);
					}
				} catch (error) {
					console.warn('Failed to inject custom colors:', error);
					// Fallback: inject only the main CSS without custom colors
					try {
						const fallbackStyleTag = document.createElement("style");
						fallbackStyleTag.textContent = css;
						if (this.shadowRoot) {
							this.shadowRoot.appendChild(fallbackStyleTag);
						}
					} catch (fallbackError) {
						console.error('Critical error: Failed to inject any styles:', fallbackError);
					}
				}
			}
		}
		customElements.define("n8n-embedded-chat-interface", N8nEmbeddedChatInterfaceElementWithStyles);
	});
