# 🎯 Perplexity AI Clone - Complete Project Summary

## 📋 Project Overview

This is a **pixel-perfect clone** of Perplexity AI's chat interface with fully functional streaming responses. Built with Next.js 16, TailwindCSS 4, and TanStack Query.

---

## 🏗️ Complete Project Structure

```
perplexity-clone/
├── 📁 app/
│   ├── layout.tsx                 # Root layout with TanStack Query provider
│   ├── page.tsx                   # Landing page (Hero component)
│   ├── globals.css                # Global styles with custom animations
│   └── search/
│       └── page.tsx               # Chat interface with streaming
│
├── 📁 components/
│   ├── 💬 chat/
│   │   ├── hero.tsx               # Landing page hero with search
│   │   ├── message-list.tsx       # Container for all messages
│   │   ├── user-message.tsx       # User question display
│   │   ├── assistant-message.tsx  # AI response with streaming
│   │   ├── search-progress.tsx    # Search status indicator
│   │   ├── source-citations.tsx   # Source links with citations
│   │   └── chat-input.tsx         # Message input with auto-resize
│   │
│   ├── 🎨 shared/
│   │   ├── button.tsx             # Reusable button component
│   │   └── input.tsx              # Reusable input component
│   │
│   └── providers.tsx              # TanStack Query client provider
│
├── 📁 hooks/
│   └── use-streaming.ts           # SSE streaming API hook
│
├── 📁 lib/
│   ├── types.ts                   # TypeScript interfaces
│   └── utils.ts                   # Utility functions (cn helper)
│
├── 📁 public/                     # Static assets
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── next.config.ts                 # Next.js config
├── postcss.config.mjs             # PostCSS config
└── README.md                      # Documentation
```

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

### 4. Production Build
```bash
npm run build
npm start
```

---

## 🎨 Key Features Implemented

### ✅ Landing Page
- Clean hero section with large search bar
- Suggested query chips
- Smooth routing to chat interface
- Responsive design

### ✅ Chat Interface
- **Sticky Header**: Logo and navigation
- **Message List**: Auto-scrolling messages
- **Streaming Responses**: Word-by-word text streaming
- **Search Progress**: Real-time URL crawling status
- **Goals/Planning**: AI thinking process display
- **Source Citations**: Clickable source cards
- **Fixed Input**: Bottom-anchored message input
- **Auto-resize Textarea**: Grows with content
- **New Chat Button**: Resets conversation

### ✅ Streaming Implementation
- **SSE Parser**: Handles Server-Sent Events
- **Progressive Updates**: 
  - Goals/planning steps
  - Search results with status
  - Answer chunks word-by-word
  - Source citations
- **State Management**: Real-time UI updates
- **Error Handling**: Graceful fallbacks

### ✅ UI/UX Details
- Smooth animations on all elements
- Loading spinners for active processes
- Hover effects on interactive elements
- Keyboard shortcuts (Enter, Shift+Enter)
- Mobile responsive layout
- Accessibility considerations

---

## 📡 API Integration

### Endpoint
```
POST https://mock-askperplexity.piyushhhxyz.deno.net
```

### Request Format
```json
{
  "question": "your question here"
}
```

### Response Flow
1. **Initial Response**: Setup and metadata
2. **Goals Stream**: Planning steps ("Searching...", "Listing...", etc.)
3. **Search Results**: URLs being crawled with REVIEWING/SELECTED status
4. **Answer Chunks**: Progressive text streaming
5. **Final State**: Complete message with sources

### Example Test
```bash
curl -X POST https://mock-askperplexity.piyushhhxyz.deno.net \
  -H "Content-Type: application/json" \
  -d '{"question": "list of top 10 singers, give table"}' \
  --no-buffer
```

---

## 🎯 Component Breakdown

### 1. **Hero Component** (`components/chat/hero.tsx`)
- Main landing page
- Search input with gradient hover effect
- Suggested queries
- Routes to `/search?q=question`

### 2. **Search Page** (`app/search/page.tsx`)
- Main chat interface
- Message state management
- Streaming integration
- Auto-scroll on new messages

### 3. **Message Components**
- **UserMessage**: Simple user question display
- **AssistantMessage**: Complex AI response with:
  - Goals section
  - Search progress
  - Streaming text with cursor
  - Source citations

### 4. **Chat Input** (`components/chat/chat-input.tsx`)
- Auto-resizing textarea
- Submit on Enter
- New line on Shift+Enter
- New Chat button

### 5. **Streaming Hook** (`hooks/use-streaming.ts`)
- Fetches from API
- Parses SSE events
- Extracts goals, search results, and answer chunks
- Provides callbacks for updates

---

## 🎨 Styling & Theme

### Color Palette
```css
Primary:    #20808d  /* Teal */
Hover:      #1a6b76  /* Dark Teal */
Background: #ffffff  /* White */
Text:       #171717  /* Dark Gray */
Border:     #e5e7eb  /* Light Gray */
```

### Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Cursor Blink */
animate-pulse (for streaming cursor)

/* Spin */
animate-spin (for loading indicators)
```

---

## 📦 Dependencies

### Core
- `next`: 16.0.3
- `react`: 19.2.0
- `react-dom`: 19.2.0

### UI & Styling
- `tailwindcss`: ^4
- `lucide-react`: ^0.554.0
- `clsx`: ^2.1.1
- `tailwind-merge`: ^2.5.5

### State Management
- `@tanstack/react-query`: ^5.62.11

### Dev Dependencies
- `typescript`: ^5
- `@types/react`: ^19
- `@types/node`: ^20
- `eslint`: ^9

---

## 🔥 Advanced Features

### 1. **Real-time Streaming**
- Parses SSE events line by line
- Updates UI incrementally
- Shows typing cursor during streaming
- Smooth transitions

### 2. **Search Progress Tracking**
- Displays URLs being crawled
- Shows REVIEWING → SELECTED status
- Animated status indicators
- Organized in collapsible sections

### 3. **Source Management**
- Extracts citations from API
- Displays in grid layout
- Clickable external links
- Domain name extraction

### 4. **Message State**
- Unique IDs for each message
- Role-based rendering (user/assistant)
- Status tracking (streaming/complete)
- Persistent conversation history

---

## 🎯 Testing Guide

### Test Case 1: Landing Page
1. Visit `http://localhost:3000`
2. Verify hero section displays
3. Click suggested query
4. Verify navigation to `/search`

### Test Case 2: Basic Chat
1. Enter question on landing page
2. Verify user message appears
3. Watch goals/planning stream
4. See search progress updates
5. Observe answer streaming word-by-word
6. Check sources appear at end

### Test Case 3: Multi-turn Conversation
1. Send initial question
2. Wait for complete response
3. Send follow-up question
4. Verify both messages persist
5. New response streams below

### Test Case 4: New Chat
1. Click "New Chat" button
2. Verify redirect to home
3. Check conversation cleared

---

## 📝 Code Highlights

### Streaming Hook
```typescript
const streamResponse = async (
  question: string,
  onUpdate: (message: Partial<Message>) => void,
  onComplete: () => void
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ question }),
  });
  
  const reader = response.body?.getReader();
  // Parse SSE events and call onUpdate
};
```

### Auto-scroll
```typescript
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
```

### Auto-resize Textarea
```typescript
useEffect(() => {
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }
}, [input]);
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
```bash
npm run build
# Deploy .next folder to any Node.js hosting
```

---

## ✅ Requirements Checklist

- ✅ Landing page with search bar
- ✅ Chat interface with multi-turn support
- ✅ Streaming API integration
- ✅ Word-by-word answer streaming
- ✅ Search progress indicators
- ✅ Source citations
- ✅ Goals/planning display
- ✅ New chat functionality
- ✅ Smooth animations
- ✅ Auto-scroll behavior
- ✅ TailwindCSS styling
- ✅ TanStack Query
- ✅ Light mode only
- ✅ Pixel-perfect design
- ✅ TypeScript
- ✅ Next.js App Router

---

## 🎓 Learning Outcomes

This project demonstrates:
1. **Server-Sent Events (SSE)** handling
2. **Real-time UI updates** with React
3. **Streaming data parsing**
4. **Complex state management**
5. **Pixel-perfect CSS replication**
6. **Modern Next.js patterns**
7. **TypeScript best practices**
8. **Component composition**

---

## 📞 Support

For issues or questions:
1. Check the README.md
2. Review API documentation
3. Inspect browser console
4. Test API with curl

---

**Built with ❤️ using Next.js, TailwindCSS, and TanStack Query**
