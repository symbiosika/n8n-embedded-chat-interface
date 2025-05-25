// scroll to the latest message
export const scrollToLatestMessage = (id: string, containerId: string = "chat-messages-container") => {
	setTimeout(() => {
		// find the message as DOM element by the message id
		const messageElement = document.getElementById(id);
		const container = document.getElementById(containerId);

		if (messageElement && container) {
			// Calculate the scroll position needed to show the message with 8px offset
			const scrollTop = messageElement.offsetTop - container.offsetTop - 8;
			container.scrollTo({ top: scrollTop, behavior: "smooth" });
		}
	}, 250);
};
