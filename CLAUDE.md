# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

N8N Embedded Chat Interface is a Vue 3 + TypeScript web component that creates an embeddable chat interface for n8n workflows. The project builds both a development version and a production UMD bundle that can be embedded in any website.

The custom element will be used on various websites to be embedded with simple HTML+JS.

## Development Commands

- `npm run dev` - Start development server with Tailwind CSS watching and Vite dev server in parallel
- `npm run build` - Build production version (runs type-check and build-only in parallel)
- `npm run build-only` - Build without type checking
- `npm run type-check` - Run Vue TypeScript compiler check
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview production build locally

## Architecture

### Build System
- **Development entry**: `src/main.ts` - Standard Vue app for testing
- **Production entry**: `src/prod.ts` - Creates custom web component `<n8n-embedded-chat-interface>`
- **Build target**: UMD bundle in `output/` directory for CDN distribution
- Uses Vite with Vue 3, TypeScript, and Tailwind CSS

### Component Structure
- **Main component**: `src/components/N8nEmbeddedChatInterface.vue` - The primary web component wrapper
- **Chat implementation**: `src/components/chat/n8n/Index.vue` - The n8n-specific chat interface
- **UI components**: `src/components/ui/` - Reusable UI components (buttons, inputs, toasts, etc.)
- **Markdown renderer**: `src/components/markdown/Renderer.vue` - Handles chat message formatting

### State Management
- Uses VueUse `createGlobalState` for state management
- **App store** (`src/stores/App.ts`): UI state (show/hide, maximized, app config)
- **N8n store** (`src/stores/n8n.ts`): Chat state (messages, loading, session management)

### Key Features
- Shadow DOM encapsulation for the web component
- Internationalization (i18n) support with German and English
- Dark/light mode support (configured but not fully implemented)
- Session management for chat continuity
- Markdown support for rich chat messages
- Toast notifications for error handling

### Web Component Integration
The production build creates a custom element that:
- Accepts attributes: `label`, `description`, `hostname`, `mode`, `open-on-start`
- Converts dash-case attributes to camelCase props
- Loads and injects Tailwind CSS styles into shadow DOM
- Can be embedded with: `<n8n-embedded-chat-interface hostname="webhook-url"></n8n-embedded-chat-interface>`

### API Integration
Chat communication with n8n workflows via:
- POST requests to webhook URL specified in `hostname` attribute
- Request body: `{ chatInput: string, sessionId?: string }`
- Expected response: `{ output: string, sessionId: string }`

### Styling
- Tailwind CSS with custom configuration
- Input CSS: `src/styles/input.css`
- Generated CSS: `src/styles/output.css`
- Uses custom color palette with primary brand colors
- Responsive design with fixed positioning for chat widget