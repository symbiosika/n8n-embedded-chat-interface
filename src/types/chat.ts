export type N8nMessageResponse = {
	sessionId: string;
	output: string;
};

export interface optionButton {
	icon: any;
	command: () => void;
	disabled: boolean;
	active?: boolean;
	show?: boolean;
	class?: string;
}
