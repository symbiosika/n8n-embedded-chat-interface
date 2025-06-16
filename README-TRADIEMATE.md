# 🔧 TradieMate N8N Chat Interface

## 🎯 What's Been Configured

This n8n embedded chat interface has been customized for TradieMate with:

### ✅ Brand Colors Applied
- **Primary**: #336A75 (TradieMate Teal)
- **Secondary**: #4EA3A6 (TradieMate Light Teal)

### ✅ Render Deployment Ready
- Express server configured for Render hosting
- CORS and iframe embedding enabled
- Environment variables configured
- Build scripts optimized

### ✅ N8N Integration
- Webhook URL: `http://localhost:5678/webhook/9ef3e72d-7bec-4ca7-9223-3d323f42a950/chat`
- Session management enabled
- Error handling implemented

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run build
npm start
```
Visit: http://localhost:4000/demo

### Deploy to Render
1. Push this repo to GitHub
2. Connect to Render as a Web Service
3. Use build command: `npm run render-build`
4. Use start command: `npm start`

## 🔗 Integration Example

```html
<!-- Add to your website -->
<script src="https://your-render-url.onrender.com/index.umd.cjs"></script>
<n8n-embedded-chat-interface 
    label="TradieMate Assistant" 
    hostname="YOUR_PRODUCTION_N8N_WEBHOOK_URL" 
    open-on-start="false">
</n8n-embedded-chat-interface>
```

## 📋 Next Steps

1. **Deploy to Render**: Follow DEPLOYMENT.md guide
2. **Update Webhook URL**: Replace localhost URL with your production n8n instance
3. **Test Integration**: Verify chat works with your n8n workflow
4. **Embed on Website**: Add the integration code to your TradieMate website

## 🎨 Customization

All TradieMate brand colors are configured in `tailwind.config.ts`. The interface uses your primary color (#336A75) for headers and buttons, and secondary color (#4EA3A6) for accents.

## 📁 Key Files

- `server.js` - Express server for Render
- `render.yaml` - Render deployment config
- `production-demo.html` - Branded demo page
- `tailwind.config.ts` - Brand colors configuration
- `DEPLOYMENT.md` - Detailed deployment guide

Your TradieMate chat interface is ready for production! 🎉