# TradieMate N8N Chat Interface - Deployment Guide

## 🎯 Overview
This is your customized n8n embedded chat interface with TradieMate branding, ready for Render deployment.

## 🎨 Brand Customization Applied
- **Primary Color**: #336A75 (TradieMate teal)
- **Secondary Color**: #4EA3A6 (TradieMate light teal)
- **Label**: "TradieMate Assistant"

## 🚀 Render Deployment

### Step 1: Connect Repository to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `TradieMate/n8n-embedded-chat-interface`

### Step 2: Configure Render Service
Use these settings in Render:

```yaml
Name: tradiemate-chat-interface
Environment: Node
Build Command: npm run render-build
Start Command: npm start
```

### Step 3: Environment Variables
Set these in Render dashboard:
```
NODE_ENV=production
```

### Step 4: Update N8N Webhook URL
Once deployed, update your production webhook URL in:
- `production-demo.html` (line 46)
- For your website integration

## 🔗 Integration on Your Website

### Basic Integration
Add this to any webpage:

```html
<script src="https://your-render-url.onrender.com/index.umd.cjs"></script>
<n8n-embedded-chat-interface 
    label="TradieMate Assistant" 
    hostname="YOUR_PRODUCTION_N8N_WEBHOOK_URL" 
    open-on-start="false">
</n8n-embedded-chat-interface>
```

### Advanced Configuration
```html
<n8n-embedded-chat-interface 
    label="TradieMate Assistant" 
    description="Your AI-powered trade assistant"
    hostname="https://your-n8n-instance.com/webhook/your-id/chat" 
    mode="n8n"
    open-on-start="false">
</n8n-embedded-chat-interface>
```

## 🛠️ N8N Workflow Requirements

Your n8n workflow must:

### 1. Accept POST requests with this format:
```json
{
  "chatInput": "User message here",
  "sessionId": "optional-session-id"
}
```

### 2. Return this format:
```json
{
  "output": "AI response here",
  "sessionId": "session-id-for-continuity"
}
```

### 3. Webhook Configuration:
- Method: POST
- Response Mode: "responseNode"
- Enable CORS headers

## 📁 File Structure
```
├── src/                    # Source code
├── output/                 # Built files
├── server.js              # Express server for Render
├── render.yaml            # Render configuration
├── production-demo.html   # Demo page
└── DEPLOYMENT.md          # This file
```

## 🧪 Testing

### Local Testing:
```bash
npm install
npm run build
npm start
```
Visit: http://localhost:4000/demo

### Production Testing:
After Render deployment, visit:
- `https://your-app.onrender.com/demo` - Demo page
- `https://your-app.onrender.com/health` - Health check

## 🔧 Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
primary: {
  DEFAULT: "#336A75",  // Your primary color
  // ... other shades
},
secondary: {
  DEFAULT: "#4EA3A6",  // Your secondary color
  // ... other shades
}
```

### Labels
Edit the integration code:
```html
<n8n-embedded-chat-interface 
    label="Your Custom Label"
    ...>
```

## 🚨 Important Notes

1. **CORS**: The server is configured to allow iframe embedding and cross-origin requests
2. **HTTPS**: Render provides HTTPS by default
3. **Scaling**: Render will auto-scale based on traffic
4. **Updates**: Push to your GitHub repo to trigger automatic redeployment

## 📞 Support

For issues:
1. Check Render logs in dashboard
2. Verify n8n webhook is accessible
3. Test with browser developer tools
4. Check CORS headers

## 🎉 You're Ready!

Your TradieMate chat interface is now ready for production deployment on Render!