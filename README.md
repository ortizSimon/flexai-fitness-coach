# 💪 FlexAI - Your AI Fitness Coach

> Personalized fitness coaching powered by AI. Get expert advice, track workouts, and crush your fitness goals.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- 🤖 **AI-Powered Coaching** - Conversational fitness assistant powered by n8n workflows
- 💬 **Real-time Chat** - Interactive chat interface with message history
- 📊 **Workout Tracking** - Beautiful dashboard to monitor your progress
- 🎨 **Stunning UI** - Dark, modern design inspired by Apple Fitness
- ⚡ **Smooth Animations** - Delightful micro-interactions using Framer Motion
- 📱 **Responsive Design** - Perfect experience on all devices
- 🔒 **Session Persistence** - Your conversation history is saved locally

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- n8n Cloud account (free tier works!)
- Your n8n workflow webhook URL

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd flexai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your n8n webhook details:
   ```env
   N8N_WEBHOOK_URL=https://your-instance.app.n8n.cloud/webhook/your-webhook-id
   N8N_AUTH_KEY=your_auth_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
flexai/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles & animations
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page (chat interface)
│   ├── components/          # React components
│   │   ├── ChatBubble.tsx   # Animated chat message
│   │   ├── WorkoutCard.tsx  # Workout display card
│   │   └── StatCard.tsx     # Statistics card
│   ├── lib/                 # Utilities & clients
│   │   ├── n8n-client.ts    # n8n webhook client
│   │   └── utils.ts         # Helper functions
│   └── types/               # TypeScript definitions
│       └── workflow.ts      # n8n types
├── .env.example             # Environment template
├── .env.local               # Your secrets (not committed)
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind customization
└── next.config.js           # Next.js configuration
```

---

## 🔧 n8n Workflow Setup

### Workflow Structure

Your n8n workflow should have:

1. **Webhook Node** (trigger)
   - Method: POST
   - Content-Type: form-data
   - Authentication: Header Auth (key: "key")

2. **AI Agent Node**
   - Connected to OpenAI Chat Model
   - Connected to Simple Memory (for conversation history)

3. **Respond to Webhook Node**
   - Returns: `{{ $json.output }}`

### Required Fields

The webhook expects:
```javascript
{
  sessionId: "user-001",  // For memory persistence
  message: "Your message here"
}
```

The response format:
```javascript
{
  output: "AI response here"
}
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: '#3b82f6',      // Blue accent
  accent: '#10b981',       // Green accent
  background: '#0a0a0a',   // Dark background
  // ... more colors
}
```

### Fonts

The app uses:
- **Space Grotesk** - Headings & display text
- **Inter** - Body text

Change fonts in `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

### Animations

All animations use Framer Motion. Customize in component files or `tailwind.config.js` for global animations.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `N8N_WEBHOOK_URL`
     - `N8N_AUTH_KEY`
   - Deploy!

3. **Automatic Deployments**
   Every push to `main` automatically deploys your app.

### Environment Variables in Vercel

Navigate to: **Project Settings → Environment Variables**

Add:
```
N8N_WEBHOOK_URL = https://ortizsimon.app.n8n.cloud/webhook/b0d778cb-7b09-47e2-b943-13afec426b29
N8N_AUTH_KEY = 1234
NEXT_PUBLIC_APP_NAME = FlexAI
```

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: n8n Cloud (webhook-only)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Design inspired by Apple Fitness
- Powered by [n8n](https://n8n.io) workflow automation
- Built with [Next.js](https://nextjs.org) and [Framer Motion](https://www.framer.com/motion/)

---

## 📧 Support

Having issues? Here's how to get help:

1. Check the [n8n documentation](https://docs.n8n.io/)
2. Review your webhook configuration in n8n
3. Check browser console for errors
4. Verify environment variables are set correctly

---

## 🎯 Roadmap

- [ ] Add workout plan generator
- [ ] Integrate nutrition tracking
- [ ] Add progress photos
- [ ] Implement voice input
- [ ] Add social sharing
- [ ] Multi-language support

---

<div align="center">

**Built with ❤️ using Next.js, n8n, and AI**

[Demo](https://your-deployment-url.vercel.app) · [Report Bug](https://github.com/your-username/flexai/issues) · [Request Feature](https://github.com/your-username/flexai/issues)

</div>
