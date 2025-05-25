<template>
	<div class="py-10 text-center">
		<div
			class="mx-auto animate-spin rounded-full border-primary !border-t-transparent"
			:style="{
				width: size ? `${size}px` : '1.5rem',
				height: size ? `${size}px` : '1.5rem',
				borderWidth: stroke ? `${stroke}px` : '4px',
				borderColor: color ? color : '#a7476f',
			}"
		></div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number | string; stroke?: number | string; color?: string }>();
</script>
