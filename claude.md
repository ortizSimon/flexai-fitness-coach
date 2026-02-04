# n8n Workflow-to-App Project

This project converts n8n workflows into deployable Next.js web applications. Each workflow is optimized for proper data handling, paired with a custom front-end, version-controlled on GitHub, and auto-deployed via Vercel.

---

## Current Project Status

**Workflow Name**: FlexAI - AI Fitness Coach
**n8n Workflow URL**: https://ortizsimon.app.n8n.cloud
**Webhook URL**: https://ortizsimon.app.n8n.cloud/webhook/b0d778cb-7b09-47e2-b943-13afec426b29
**GitHub Repository**: https://github.com/ortizSimon/flexai-fitness-coach
**Vercel Deployment**: Ready to deploy (see DEPLOYMENT.md)
**Status**: ✅ Complete - Ready for Deployment
**Last Updated**: 2026-02-04

### Project Completion ✅
- ✅ GitHub Integration: API access verified (username: ortizSimon)
- ✅ Frontend Designer Skill: Installed and ready
- ✅ Next.js Application: Built with TypeScript, Tailwind CSS, Framer Motion
- ✅ n8n Webhook Integration: Connected to AI fitness coach workflow
- ✅ Stunning UI: Dark theme with Apple Fitness-inspired design
- ✅ Advanced Animations: Smooth micro-interactions throughout
- ✅ Chat Interface: Real-time AI conversation with session memory
- ✅ Workout Dashboard: Statistics and recent workout tracking
- ✅ Documentation: Comprehensive README and deployment guide
- ✅ Version Control: Pushed to GitHub with complete history
- 🚀 Ready for Vercel deployment!

---

## Development Workflow

### 1. Analyze & Optimize n8n Workflow
- Review workflow structure and nodes in n8n Cloud UI
- Verify webhook node configuration and test endpoint
- Ensure output format matches frontend needs
- Test workflow manually to confirm data flow
- Copy webhook URL and document required fields

### 2. Design & Build Frontend
- Set up Next.js project with TypeScript
- Create React components for user interface
- Build n8n webhook client for HTTP communication
- Implement form validation and error handling
- Style with modern UI framework (Tailwind CSS)

### 3. Test Integration
- Test app → n8n data submission
- Verify n8n → app response handling
- Check error scenarios and edge cases
- Test locally with actual workflow

### 4. Push to GitHub
- Initialize Git repository
- Create .gitignore (exclude .env.local, node_modules)
- Commit all project files
- Push to GitHub repository
- Verify repository structure

### 5. Deploy to Vercel
- Connect GitHub repository to Vercel
- Configure environment variables in Vercel
- Deploy initial version
- Verify auto-deploy on future Git pushes
- Test live deployment

**Important Note**: All n8n workflow modifications are done manually in the n8n Cloud UI. This project uses a webhook-only approach - no API access needed.

---

## Required Tools & Configuration

### MCPs (Model Context Protocol)
- **GitHub MCP**: Create repositories and push changes

### Skills
- **Frontend designer skill**: UI/UX design assistance (optional)

### Access Requirements
- **n8n Cloud account**: Free tier - manage workflows manually in UI
- **Webhook URL**: Copy from n8n workflow Webhook node
- **GitHub account**: For version control
- **Vercel account**: For deployment

### Not Required
- ❌ n8n API key (not available on free tier, webhooks work without it)
- ❌ n8n MCP (workflows managed manually in n8n Cloud UI)
- ❌ n8n programmatic access

---

## Project Structure

```
/
├── claude.md              # This file - project documentation
├── README.md              # User-facing app documentation
├── .gitignore             # Git exclusions
├── .env.example           # Environment variables template
├── .env.local             # Local secrets (not committed)
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── src/
│   ├── app/              # Next.js app router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── api/          # API routes (if needed)
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   └── forms/       # Form components
│   ├── lib/             # Utilities
│   │   ├── n8n-client.ts    # n8n webhook client
│   │   └── utils.ts         # Helper functions
│   └── types/           # TypeScript type definitions
│       └── workflow.ts  # n8n data types
└── public/              # Static assets
    └── images/
```

---

## How Webhook Integration Works

This project uses a **webhook-only approach** since n8n Cloud free tier doesn't provide API access. This is actually the simplest and most reliable way to integrate.

### The Flow
1. **In n8n Cloud UI**: Create a workflow with a Webhook node (trigger)
2. **Copy webhook URL**: Get the unique URL from the Webhook node (e.g., `https://yourinstance.app.n8n.cloud/webhook/abc123`)
3. **Next.js app**: Sends POST requests with JSON data to this webhook URL
4. **n8n processes**: Workflow runs and processes the data through its nodes
5. **Response**: n8n returns data via "Respond to Webhook" node
6. **Display results**: Next.js app shows the response to the user

### Typical n8n Workflow Structure
```
Webhook (trigger)
  ↓
[Your processing nodes]
  ↓
Respond to Webhook (return data to app)
```

### Benefits of Webhook Approach
- ✅ No API key required - works on n8n free tier
- ✅ Simple HTTP POST requests from your app
- ✅ Real-time: workflow executes immediately when called
- ✅ Changes in n8n UI take effect instantly
- ✅ Full control over workflow logic in n8n

### Limitations
- ❌ Cannot programmatically read workflow structure
- ❌ Cannot modify workflows via code
- ❌ Must manually copy webhook URLs from n8n UI
- ❌ One webhook URL per workflow

---

## Key Files to Maintain

### src/lib/n8n-client.ts
Handles all communication with n8n workflows via webhooks. Contains functions for:
- Sending POST requests to webhook endpoints
- Parsing n8n webhook responses
- Error handling and retries
- TypeScript types for request/response data

### README.md
User-facing documentation including:
- What the app does
- How to use it
- Deployment URL
- Support/contact information

### .env.example
Template showing all required environment variables (without values):
```bash
N8N_WEBHOOK_URL=
NEXT_PUBLIC_API_URL=
```

---

## Environment Variables

### Required Variables
- **N8N_WEBHOOK_URL**: Full webhook URL from your n8n workflow (copied from Webhook node)
  - Example: `https://yourinstance.app.n8n.cloud/webhook/abc123`

### Optional Variables
- **NEXT_PUBLIC_API_URL**: Only if you need client-side API calls through Next.js API routes

### Workflow-Specific Variables
Add as needed based on your specific workflow requirements:
- Third-party API keys
- Service credentials
- Feature flags
- Custom configuration values

### Setup Instructions
1. Copy `.env.example` to `.env.local`
2. Fill in actual values
3. Add same variables to Vercel project settings

---

## Quick Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Run production build locally
npm run start

# Deploy to Vercel
# (Automatic via GitHub push after initial setup)
git add .
git commit -m "Update workflow integration"
git push origin main
```

---

## Development Guidelines

### Coding Standards
- Use TypeScript for type safety
- Follow Next.js 14+ app router conventions
- Keep components small and focused
- Write clear, descriptive variable names
- Add comments for complex n8n data transformations

### Git Workflow
- Commit frequently with clear messages
- Use conventional commit format: `feat:`, `fix:`, `docs:`, etc.
- Push to main branch (auto-deploys to Vercel)
- Tag releases for significant versions

### Testing Checklist
Before deploying:
- [ ] Workflow responds correctly to test data
- [ ] Form validation works
- [ ] Error messages are user-friendly
- [ ] Loading states are shown
- [ ] Success feedback is clear
- [ ] Mobile responsive design
- [ ] Environment variables set in Vercel

---

## Workflow-Specific Notes

_This section will be populated with details specific to the current n8n workflow being converted, including:_
- Required input fields and formats
- Expected response structure
- Special data transformations
- Business logic considerations
- Known limitations or edge cases

---

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated**: 2026-02-04
**Claude Version**: Sonnet 4.5
