<template>
	<div :class="size === 'small' ? 'size-small' : size === 'large' ? 'size-large' : 'size-base'" class="markdown-wrapper">
		<div class="markdown-content" v-html="renderedContent"></div>
	</div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import DOMPurify from "dompurify";

const props = defineProps({
	content: { type: String, required: true },
	size: {
		type: String as PropType<"normal" | "small" | "large">,
		default: "normal",
		validator: (value: string) => ["normal", "small", "large"].includes(value),
	},
	renderWordByWord: {
		type: Boolean,
		default: false,
	},
	wordDelay: {
		type: Number,
		default: 10,
	},
});

const renderedContent = ref("");
const lastKnownContent = ref("");
const isRendering = ref(false);

const wordCountPerIteration = 25;

// Function to render content word by word
const renderWordByWord = async (content: string) => {
	try {
		if (isRendering.value) return;
		isRendering.value = true;

		let currentIndex = lastKnownContent.value.length;
		let currentContent = "";
		while (currentIndex < content.length + wordCountPerIteration) {
			currentContent = content.slice(0, currentIndex);
			const rawHtml = marked(currentContent);
			const sanitizedHtml = DOMPurify.sanitize(rawHtml as string);

			renderedContent.value = sanitizedHtml;
			currentIndex += wordCountPerIteration;
			await new Promise((resolve) => setTimeout(resolve, props.wordDelay));
		}
	} finally {
		isRendering.value = false;
		lastKnownContent.value = content;
	}
};

// Function to render content immediately
const renderImmediately = (content: string) => {
	const rawHtml = marked(content);
	const sanitizedHtml = DOMPurify.sanitize(rawHtml as string);
	renderedContent.value = sanitizedHtml;
};

// Watch for content changes
watch(
	() => props.content,
	async (newContent) => {
		if (props.renderWordByWord) {
			await renderWordByWord(newContent);
		} else {
			renderImmediately(newContent);
		}
	},
	{ immediate: true },
);
</script>

<!-- prettier-ignore -->
<style lang="scss">
// Font size variants
.size-small {
  .markdown-content {
    
    h1 { font-size: 1.15em; }
    h2 { font-size: 1.1em; }
    h3 { font-size: 1em; }
    
    p, ul, ol, code { font-size: 0.9em; }

    pre {
      padding: 0.7em;
      margin-bottom: 0.7em;
    }
  }
}
.size-base {
  .markdown-content {
    
    h1 { font-size: 1.3em; }
    h2 { font-size: 1.2em; }
    h3 { font-size: 1.1em; }

    p, ul, ol, code { font-size: 0.95em; }

    pre {
      padding: 1.5em;
      margin-bottom: 1em;
    }
  }
}
.size-large {
  .markdown-content {
    
    h1 { font-size: 1.5em; }
    h2 { font-size: 1.3em; }
    h3 { font-size: 1.2em; }
    
    p, ul, ol, code { font-size: 1.05em; }
    
    pre {
      padding: 2em;
      margin-bottom: 1.5em;
    }
  }
}



.markdown-wrapper {
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;

  .markdown-content {
    max-width: 100%;
    margin: 0 auto;
    text-align: left;
    overflow-wrap: break-word;
    color: #1e1e1e;

    h1, h2, h3 {
      font-weight: bold;
      margin: 0.5em 0;
      line-height: 1.6;
      color: #333;
    }

    p {
      margin: 0.5em 0;
      line-height: 1.6;
    }

    ul, ol {
      margin: 0.5em 0 0.5em 1.5em;
      line-height: 1.6;
    }

    code {
      padding: 0.2em 0.4em;
      border-radius: 0.25rem;
      font-family: monospace;
      color: #4a4a4a;
      font-weight: 700;
    }

    pre {
      background-color: #f6f8fa;
      padding: 1.5em;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1em 0;
      position: relative;
      border: 1px solid rgba(128, 128, 128, 0.2);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      text-wrap: wrap;

      code {
         color: inherit;
         font-weight: 400;
       }

      .copy-code-button {
        position: absolute;
        top: 8px;
        right: 8px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 4px;
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease;

        &:hover {
          background-color: #ffffff;
          transform: scale(1.05);
        }
      }

      &:hover .copy-code-button {
        opacity: 1;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95em;
      margin: 1em 0;
      
      th, td {
        padding: 8px 12px;
        text-align: left;
        border: 1px solid rgba(128, 128, 128, 0.2);
      }
      
      th {
        background-color: #f6f8fa;
        font-weight: bold;
      }
      
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    }
  }
}

// Dark mode
:root.dark, .dark {
  .markdown-wrapper .markdown-content {
    @apply text-surface-300;
    
    h1, h2, h3 {
      @apply text-surface-100;
    }
 
    strong {
      @apply text-surface-200;
    }

    code {
      @apply text-surface-400;
    }

    pre {
      @apply bg-surface-800 border-surface-700;

      code {
        @apply text-surface-300
      }
      .copy-code-button {
        @apply bg-surface-700 duration-150 border-none text-surface-300 hover:bg-primary-400; 
      }
    }
    
    table {
      th, td {
        border-color: rgba(128, 128, 128, 0.3);
      }
      
      th {
        @apply bg-surface-800;
      }
      
      tr:nth-child(even) {
        @apply bg-surface-900;
      }
      
    }
  }
}
</style>
