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

	// Generate custom color CSS based on attributes
	protected generateCustomColorCSS(): string {
		const colorMappings = {
			'--custom-primary': this.getAttribute('primary-color'),
			'--custom-secondary': this.getAttribute('secondary-color'),
			'--custom-background': this.getAttribute('background-color'),
			'--custom-text': this.getAttribute('text-color'),
			'--custom-accent': this.getAttribute('accent-color'),
			'--custom-surface': this.getAttribute('surface-color'),
			'--custom-border': this.getAttribute('border-color'),
			'--custom-success': this.getAttribute('success-color'),
			'--custom-warning': this.getAttribute('warning-color'),
			'--custom-error': this.getAttribute('error-color')
		};

		let cssContent = '\n\n/* Custom Colors */\n:host, :root {\n';
		Object.entries(colorMappings).forEach(([property, value]) => {
			if (value) {
				cssContent += `  ${property}: ${value};\n`;
			}
		});
		cssContent += '}\n\n';

		// Add Tailwind utility overrides when custom colors are provided
		if (this.getAttribute('primary-color')) {
			cssContent += `.bg-primary { background-color: var(--custom-primary) !important; }\n`;
			cssContent += `.text-primary { color: var(--custom-primary) !important; }\n`;
			cssContent += `.border-primary { border-color: var(--custom-primary) !important; }\n`;
		}
		if (this.getAttribute('secondary-color')) {
			cssContent += `.bg-secondary { background-color: var(--custom-secondary) !important; }\n`;
			cssContent += `.text-secondary { color: var(--custom-secondary) !important; }\n`;
		}
		if (this.getAttribute('background-color')) {
			cssContent += `.bg-white { background-color: var(--custom-background) !important; }\n`;
		}
		if (this.getAttribute('text-color')) {
			cssContent += `.text-white { color: var(--custom-text) !important; }\n`;
			cssContent += `.text-black { color: var(--custom-text) !important; }\n`;
		}
		if (this.getAttribute('surface-color')) {
			cssContent += `.bg-surface-0, .bg-surface-50 { background-color: var(--custom-surface) !important; }\n`;
		}
		if (this.getAttribute('border-color')) {
			cssContent += `.border, .border-gray-200 { border-color: var(--custom-border) !important; }\n`;
		}

		return cssContent;
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
				// Combine main CSS with custom color CSS
				styleTag.textContent = css + this.generateCustomColorCSS();
				if (this.shadowRoot) {
					this.shadowRoot.appendChild(styleTag);
				}
			}
		}
		customElements.define("n8n-embedded-chat-interface", N8nEmbeddedChatInterfaceElementWithStyles);
	});
