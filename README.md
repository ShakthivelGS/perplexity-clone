git config --global user.name "YourGitHubUsername"
git config --global user.email "your-other-email@example.com"# Perplexity AI Clone

A pixel-perfect clone of Perplexity AI's chat interface with functional streaming responses.

## Features

- 🎨 **Pixel-Perfect UI** - Matches Perplexity.ai's design exactly
- 📡 **Streaming Responses** - Real-time word-by-word answer streaming
- 🔍 **Search Progress** - Shows search status and URLs being crawled
- 📚 **Source Citations** - Displays sources with citations at the end
- ✨ **Goals/Planning** - Shows AI planning steps in real-time
- 🔄 **Multi-turn Conversations** - Support for follow-up questions
- 🎯 **Smooth Animations** - Loading states, transitions, and scrolling

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS 4
- **State Management**: TanStack Query
- **Language**: TypeScript
- **Icons**: Lucide React

## Project Structure

```
perplexity-clone/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Landing page with hero
│   ├── globals.css         # Global styles
│   └── search/
│       └── page.tsx        # Chat interface page
├── components/
│   ├── chat/
│   │   ├── hero.tsx        # Landing page hero section
│   │   ├── message-list.tsx    # Message container
│   │   ├── user-message.tsx    # User message component
│   │   ├── assistant-message.tsx   # AI response component
│   │   ├── search-progress.tsx     # Search status display
│   │   ├── source-citations.tsx    # Source links
│   │   └── chat-input.tsx          # Message input box
│   ├── shared/
│   │   ├── button.tsx      # Reusable button component
│   │   └── input.tsx       # Reusable input component
│   └── providers.tsx       # TanStack Query provider
├── hooks/
│   └── use-streaming.ts    # Streaming API hook
├── lib/
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
└── package.json
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Integration

The app uses the streaming API endpoint:

```
POST https://mock-askperplexity.piyushhhxyz.deno.net
Content-Type: application/json
Body: {"question": "your question here"}
```

### API Response Format

The API returns Server-Sent Events (SSE) with the following structure:

- **Goals/Planning**: Progressive updates showing AI's thinking process
- **Search Results**: URLs being crawled with status updates
- **Answer Chunks**: Word-by-word streaming of the response
- **Sources**: Citations and references at the end

### Testing the API

```bash
curl -X POST https://mock-askperplexity.piyushhhxyz.deno.net \
  -H "Content-Type: application/json" \
  -d '{"question": "list of top 10 singers, give table"}' \
  --no-buffer
```

## Key Features Implementation

### 1. Streaming Response Handler

Located in `hooks/use-streaming.ts`:
- Parses SSE events from the API
- Handles incremental updates for goals, search results, and answers
- Manages streaming state

### 2. Message Components

- **UserMessage**: Displays user questions
- **AssistantMessage**: Shows AI responses with:
  - Goals/planning steps (with loading animations)
  - Search progress (URLs being crawled)
  - Streaming answer text (with cursor)
  - Source citations (clickable links)

### 3. Chat Interface

- Sticky header with logo
- Auto-scrolling messages
- Fixed bottom input
- New chat functionality

### 4. Landing Page

- Hero section with search bar
- Suggested queries
- Smooth routing to chat page

## UI Details Replicated

✅ Question scroll behavior - moves to top when sent
✅ Input stays fixed at bottom
✅ Smooth loading animations
✅ Progressive text streaming with cursor
✅ Search progress indicators
✅ Source citation cards with hover effects
✅ Goals/planning display with spinners
✅ Auto-resize textarea
✅ Keyboard shortcuts (Enter to send, Shift+Enter for new line)

## Color Palette

- Primary: `#20808d` (Teal)
- Hover: `#1a6b76` (Dark Teal)
- Background: `#ffffff` (White)
- Text: `#171717` (Dark Gray)
- Border: `#e5e7eb` (Light Gray)

## Notes

- Light mode only (as per requirements)
- No dropdowns, modals, or settings (focused on core chat experience)
- Mock API returns same response for all questions (by design)
- Optimized for desktop and mobile viewports

## License

MIT

## Credits

Built as a technical challenge to demonstrate:
- Server-Sent Events (SSE) streaming
- Real-time UI updates
- Pixel-perfect design replication
- Modern React patterns with Next.js
