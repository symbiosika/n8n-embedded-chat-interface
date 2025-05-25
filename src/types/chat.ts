export type aiMessageResponse = {
	chatId: string;
	message: string;
};

export interface optionButton {
	icon: any;
	command: () => void;
	disabled: boolean;
	active?: boolean;
	show?: boolean;
	class?: string;
}
