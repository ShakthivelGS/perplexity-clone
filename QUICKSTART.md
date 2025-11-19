# 🚀 Quick Start Guide

## Run the Project (3 Steps)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
```
http://localhost:3000
```

---

## 🎯 What You'll See

### Landing Page (`/`)
- Large hero section
- "Where knowledge begins" headline
- Search bar with gradient hover
- Suggested queries
- Clean, minimal design

### Chat Interface (`/search?q=...`)
- Your question at the top
- AI response streaming word-by-word
- Search progress with URL crawling
- Source citations at the end
- Fixed input at bottom

---

## 💡 Try These Queries

```
1. "list of top 10 singers, give table"
2. "How does photosynthesis work?"
3. "Latest AI developments in 2025"
4. "Explain quantum computing"
5. "Best programming languages to learn"
```

---

## 🔍 Features to Notice

### Streaming States
1. **Goals appear first**: "Searching...", "Listing..."
2. **URLs being crawled**: With status indicators
3. **Answer streams**: Word by word with blinking cursor
4. **Sources appear**: Clickable citation cards

### Interactions
- Type and press **Enter** to send
- **Shift + Enter** for new line
- Click **New Chat** to reset
- **Auto-scroll** to latest message
- Textarea **auto-resizes** as you type

---

## 📱 Responsive Design

Works on:
- 💻 Desktop (1920px+)
- 💻 Laptop (1366px)
- 📱 Tablet (768px)
- 📱 Mobile (375px)

---

## 🛠️ Troubleshooting

### Port Already in Use?
```bash
# Use different port
PORT=3001 npm run dev
```

### Dependencies Not Installing?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Page Not Loading?
1. Check terminal for errors
2. Ensure port 3000 is available
3. Try hard refresh (Ctrl + Shift + R)

---

## 🎨 Customization

### Change Primary Color
Edit `components/shared/button.tsx` and other files:
```typescript
// From: bg-[#20808d]
// To: bg-[#your-color]
```

### Modify API Endpoint
Edit `hooks/use-streaming.ts`:
```typescript
const API_URL = "your-api-endpoint";
```

### Add More Suggestions
Edit `components/chat/hero.tsx`:
```typescript
["Your", "Custom", "Suggestions"]
```

---

## 📊 Project Stats

- **Files Created**: 20+
- **Components**: 10
- **Lines of Code**: ~1,500
- **Dependencies**: 10
- **Build Time**: ~30 seconds
- **Bundle Size**: ~200KB (gzipped)

---

## 🎓 Next Steps

1. ✅ Run the project
2. ✅ Test all features
3. ✅ Try different queries
4. ✅ Read PROJECT_SUMMARY.md
5. ✅ Customize as needed
6. 🚀 Deploy to Vercel

---

**Happy Coding! 🎉**
