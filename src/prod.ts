import { createApp } from "vue";
import N8nEmbeddedChatInterface from "./components/N8nEmbeddedChatInterface.vue";
import i18n from "./i18n";

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
}

// Load styles
fetch(new URL("./styles/output.css", import.meta.url))
	.then((res) => res.text())
	.then((css) => {
		class N8nEmbeddedChatInterfaceElementWithStyles extends N8nEmbeddedChatInterfaceElement {
			connectedCallback() {
				super.connectedCallback();
				const styleTag = document.createElement("style");
				styleTag.textContent = css;
				if (this.shadowRoot) {
					this.shadowRoot.appendChild(styleTag);
				}
			}
		}
		customElements.define("n8n-embedded-chat-interface", N8nEmbeddedChatInterfaceElementWithStyles);
	});
