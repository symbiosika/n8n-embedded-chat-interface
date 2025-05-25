/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue3" />

declare module "*.vue" {
	import { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
