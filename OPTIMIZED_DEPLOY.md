# 🚀 Deploy to Render - OPTIMIZED for FREE TIER

## 💰 Cost Optimization Features:

✅ **Auto-sleep after 15 min** - Server shuts down when not in use
✅ **Token caching** - Tokens cached for 24h (no repeated auth calls)
✅ **Minimal dependencies** - Only 3 packages (express, cors, node-fetch)
✅ **No logging spam** - Only essential logs
✅ **Small payloads** - Responses are minimal
✅ **Graceful shutdown** - Clean exit on SIGTERM
✅ **Field filtering** - Only fetch needed order data

### Expected Usage:
- **Cold start**: ~10-15 seconds (first request after sleep)
- **Warm**: <1 second response time
- **Monthly**: ~10-20 hours usage (well under 750 hour limit)

---

## 📦 Quick Deploy (3 Minutes)

### Step 1: Upload to GitHub

```bash
cd render-optimized
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/servtec-server.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to https://dashboard.render.com/
2. Click **"New +" → "Web Service"**
3. Connect your GitHub repo
4. Settings:
   - **Name**: `servtec-customs`
   - **Environment**: `Node`
   - **Build**: `npm install`
   - **Start**: `npm start`
   - **Plan**: **Free** ← Important!
5. Click **"Create Web Service"**

### Step 3: Get Your URL

After deploy completes (~2 min):
```
https://servtec-customs-XXXX.onrender.com
```

**Copy this URL!**

---

## ⚡ Usage Tips to Minimize Costs

### 1. **Cache Tokens Locally**
The app automatically caches tokens for 24 hours:
- First auth: Calls server
- Next 24h: Uses cached token (no server calls!)

### 2. **Batch Your Work**
- Generate multiple invoices in one session
- Server stays awake while you're using it
- Sleeps after 15 min idle

### 3. **Pre-warm the Server**
If you know you'll use it:
1. Open the app
2. Click "Get Token" 
3. Server wakes up and stays ready

### 4. **Check Token Before Auth**
App shows: `✓ Using cached token (still valid)`
- Means no server call needed!

---

## 🎯 How Free Tier Works

**Render Free Web Services:**
- ✅ 750 hours/month (31 days × 24h = 744h max)
- ✅ Auto-sleep after 15 min inactivity
- ✅ 100 GB bandwidth/month
- ⚠️ Cold start: 10-30 sec

**Your Expected Usage:**
- Auth once per day: ~5 sec/day
- Generate 10 invoices/day: ~30 sec/day
- Total: **~10-15 hours/month**

**You'll use <5% of your free quota!** 🎉

---

## 📊 Monitor Usage

Check your usage at:
https://dashboard.render.com/ → Your service → Metrics

Look for:
- **CPU usage** - Should be near 0% when idle
- **Memory** - Should stay under 100MB
- **Bandwidth** - Minimal (tokens are tiny)

---

## 🔧 Troubleshooting

### "Service Unavailable"
- Server is waking up (cold start)
- Wait 15-20 seconds, try again
- This is normal for free tier!

### "Too Many Requests"
- Unlikely with this usage
- If it happens: cache is working, you're good!

### Server Logs
View at: Dashboard → Your Service → Logs

You should see:
```
ServTec Server running on port 3000
```

---

## 🚀 After Deployment

### Test Your Server:

**1. Health Check:**
```
curl https://your-server.onrender.com/health
```
Should return: `{"status":"ok"}`

**2. Get Token:**
```bash
curl -X POST https://your-server.onrender.com/api/shopify/token \
  -H "Content-Type: application/json" \
  -d '{
    "store": "f862ff-4",
    "client_id": "48055cfc9a3db8c865a208452000707c",
    "client_secret": "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"
  }'
```

Should return token!

### Use the App:

1. Open `index.html`
2. Paste your Render URL
3. Click "Get Token (Valid 24h)"
4. Token cached for 24 hours!
5. Generate invoices all day without re-auth!

---

## 💡 Pro Tips

### Keep It Asleep When Not Using:
- Don't set up "ping" services
- Don't keep the app open 24/7
- Let it sleep - that's the point of free tier!

### Batch Invoices:
```
Generate 10 invoices in one sitting
> Server stays awake: ~5 minutes
> Then sleeps for 23h 55min
> Total usage: 5 min/day = 2.5 hours/month!
```

### Pre-auth for Speed:
```
1. Open app
2. Click "Get Token"
3. Wait 15 sec (server wakes)
4. Now generate invoices instantly!
```

---

## 📋 Files Included

- `server.js` - Optimized Express server
- `package.json` - Minimal dependencies (only 3!)
- `index.html` - App with token caching

---

## ✅ You're Done!

**Your setup:**
- ✅ Free forever
- ✅ Auto-sleeping server
- ✅ Token caching (24h)
- ✅ <5% of free quota usage
- ✅ Both Shopify + eBay support

**Cost**: $0/month 🎉

---

## Next: Get eBay Credentials

1. Go to https://developer.ebay.com/
2. Create account
3. Create app
4. Get Client ID + Secret
5. Paste into eBay tab
6. Done!

Start with Shopify today, add eBay when ready! 🚀
