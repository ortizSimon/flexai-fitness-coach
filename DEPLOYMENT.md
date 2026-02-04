# 🚀 Deployment Guide - FlexAI

This guide walks you through deploying FlexAI to Vercel.

---

## Prerequisites

- ✅ GitHub repository (done!)
- ✅ Vercel account ([sign up free](https://vercel.com/signup))
- ✅ n8n webhook URL and auth key

---

## Step-by-Step Deployment to Vercel

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub account (ortizSimon)
5. Find and import **"flexai-fitness-coach"**

### 2. Configure Project

Vercel will auto-detect Next.js. You don't need to change:
- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `next build`
- **Output Directory**: `.next`

### 3. Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `N8N_WEBHOOK_URL` | `https://ortizsimon.app.n8n.cloud/webhook/b0d778cb-7b09-47e2-b943-13afec426b29` |
| `N8N_AUTH_KEY` | `1234` |
| `NEXT_PUBLIC_APP_NAME` | `FlexAI` |

**Important**: Make sure to select **"All Environments"** (Production, Preview, Development)

### 4. Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://flexai-fitness-coach.vercel.app`

---

## Post-Deployment

### Test Your Deployment

1. Visit your Vercel URL
2. Try sending a message to the AI coach
3. Check that the n8n workflow responds correctly

### Get Your Production URL

Your app is now live at:
```
https://flexai-fitness-coach.vercel.app
```

Or you can add a custom domain in Vercel settings.

---

## Automatic Deployments

Every time you push to GitHub, Vercel automatically deploys:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel auto-deploys! 🚀
```

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from other branches (for testing)

---

## Vercel Dashboard Features

### View Deployments
- See all deployments and their status
- Rollback to previous versions instantly
- View build logs for debugging

### Monitor Performance
- Analytics on page views and performance
- Error tracking
- Function metrics

### Configure Domains
- Add custom domain (e.g., flexai.com)
- Automatic SSL certificates
- DNS configuration help

---

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify environment variables are set correctly
3. Make sure all dependencies are in `package.json`

### n8n Connection Issues

1. Verify `N8N_WEBHOOK_URL` is correct
2. Check `N8N_AUTH_KEY` matches your n8n workflow
3. Test webhook directly with curl:
   ```bash
   curl -X POST \
     -H "key: 1234" \
     -F "sessionId=test-001" \
     -F "message=hello" \
     https://ortizsimon.app.n8n.cloud/webhook/b0d778cb-7b09-47e2-b943-13afec426b29
   ```

### App Not Loading

1. Check browser console for errors
2. Verify deployment succeeded in Vercel
3. Check Vercel function logs

---

## Performance Optimization

Vercel automatically optimizes:
- ✅ Image optimization
- ✅ Code splitting
- ✅ Caching
- ✅ CDN distribution
- ✅ Automatic HTTPS

Your app should load in under 2 seconds globally!

---

## Cost

**Vercel Free Tier Includes:**
- Unlimited deployments
- Automatic previews
- SSL certificates
- 100GB bandwidth/month
- Analytics
- Perfect for this app!

---

## Next Steps

1. ✅ Test your live app thoroughly
2. ✅ Share the URL with users
3. ✅ Monitor performance in Vercel dashboard
4. ✅ Make improvements and push to GitHub
5. ✅ Watch automatic deployments work!

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Deployment Issues**: Check Vercel dashboard logs
- **n8n Issues**: Check n8n workflow execution logs

---

**🎉 Congratulations! Your AI fitness coach is now live!**

Repository: https://github.com/ortizSimon/flexai-fitness-coach
