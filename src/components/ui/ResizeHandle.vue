<template>
	<div
		class="absolute left-0 top-0 z-10 cursor-nw-resize"
		@mousedown="startResize"
		@touchstart="startResize"
	>
		<div class="h-4 w-4 bg-primary/20 hover:bg-primary/40 transition-colors duration-200">
			<div class="absolute left-1 top-1 h-2 w-2">
				<svg
					width="8"
					height="8"
					viewBox="0 0 8 8"
					fill="none"
					class="text-primary"
				>
					<path
						d="M0 8L8 0M0 4L4 0M0 0L0 0"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useApp } from "@/stores/App";
import { ref, onMounted, onUnmounted } from "vue";

const { chatSize } = useApp();
const isResizing = ref(false);
const startX = ref(0);
const startY = ref(0);
const startWidth = ref(0);
const startHeight = ref(0);

const startResize = (event: MouseEvent | TouchEvent) => {
	// Prevent resize on mobile devices (screen width < 768px)
	if (window.innerWidth < 768) {
		return;
	}

	isResizing.value = true;
	
	const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
	const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
	
	startX.value = clientX;
	startY.value = clientY;
	startWidth.value = chatSize.value.width;
	startHeight.value = chatSize.value.height;

	document.addEventListener("mousemove", handleResize);
	document.addEventListener("mouseup", stopResize);
	document.addEventListener("touchmove", handleResize);
	document.addEventListener("touchend", stopResize);
	
	// Prevent text selection during resize
	document.body.style.userSelect = "none";
	event.preventDefault();
};

const handleResize = (event: MouseEvent | TouchEvent) => {
	if (!isResizing.value) return;

	const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
	const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
	
	// Calculate new dimensions (resizing from top-left, so we subtract the delta)
	const deltaX = startX.value - clientX;
	const deltaY = startY.value - clientY;
	
	const newWidth = Math.max(
		chatSize.value.minWidth,
		Math.min(chatSize.value.maxWidth, startWidth.value + deltaX)
	);
	
	const newHeight = Math.max(
		chatSize.value.minHeight,
		Math.min(chatSize.value.maxHeight, startHeight.value + deltaY)
	);

	// Update the chat size
	chatSize.value.width = newWidth;
	chatSize.value.height = newHeight;
};

const stopResize = () => {
	isResizing.value = false;
	
	document.removeEventListener("mousemove", handleResize);
	document.removeEventListener("mouseup", stopResize);
	document.removeEventListener("touchmove", handleResize);
	document.removeEventListener("touchend", stopResize);
	
	// Restore text selection
	document.body.style.userSelect = "";
};

onUnmounted(() => {
	// Clean up event listeners if component is unmounted during resize
	document.removeEventListener("mousemove", handleResize);
	document.removeEventListener("mouseup", stopResize);
	document.removeEventListener("touchmove", handleResize);
	document.removeEventListener("touchend", stopResize);
});
</script>