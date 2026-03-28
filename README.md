# BC Childcare Finder

A modern web application for BC parents to discover and explore licensed daycare homes and centres. Built with Next.js 14, Tailwind CSS, and Claude AI.

## Features

✨ **Search & Filter**
- Filter daycares by city, age group, schedule type, languages, and $10/Day programs
- Real-time interactive map showing centre locations
- Search by city name or postal code

🤖 **AI Assistant**
- Chat with Claude AI to get personalized daycare recommendations
- Ask questions about schedules, fees, age groups, and childcare in BC
- Available on every centre profile and the search page

🏠 **Centre Profiles**
- Detailed information for each daycare (schedules, languages, age groups)
- Availability, contact info, and $10/Day program eligibility
- Star ratings and parent reviews

📍 **Location-Based**
- Interactive map view of all centres
- Filter by city or postal code
- Visual pins showing centre locations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI**: React 18
- **AI**: Claude API (Sonnet 4.6)
- **Fonts**: Google Fonts (DM Serif Display, DM Sans)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ (recommend 20 LTS)
- npm or yarn
- Anthropic API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bc-childcare-finder.git
   cd bc-childcare-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Add your API keys to `.env.local`**
   ```
   ANTHROPIC_API_KEY=your_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here_optional
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## Pages

### Home (`/`)
Landing page with hero section, search bar, stats, and featured daycares.

### Find Centres (`/find`)
Search and filtering interface with:
- Left sidebar for filters
- Interactive map view
- Scrollable centre list

### Centre Profile (`/centre/[id]`)
Detailed page for each centre showing:
- Full information and descriptions
- Age groups, schedules, languages
- Contact information
- AI chat assistant button

## Project Structure

```
/app
  /api
    /chat
      route.ts              # Claude API endpoint
  /centre
    /[id]
      page.tsx             # Centre detail page
  /find
    page.tsx               # Search & explore page
  layout.tsx               # Root layout with fonts
  globals.css              # Global styles
  page.tsx                 # Landing page

/components
  Navbar.tsx              # Header navigation
  Footer.tsx              # Footer
  CentreCard.tsx          # Reusable centre card
  FilterSidebar.tsx       # Filter controls
  MapView.tsx             # Map visualization
  AIChatPanel.tsx         # AI chat sidebar
  Badge.tsx               # Badge component
  LoadingSpinner.tsx      # Loading state

/lib
  mock-data.ts            # 12 sample centres + helpers
  utils.ts                # Utility functions

/public                   # Static assets

/tailwind.config.ts       # Tailwind configuration
/tsconfig.json            # TypeScript configuration
```

## Design System

### Colors
- **Background**: `#F7F5F0` (warm off-white)
- **Primary Dark**: `#1A1A2E` (dark navy)
- **Accent Green**: `#4CAF82` (nature-inspired)
- **Card BG**: `#FFFFFF` (white)
- **Muted Text**: `#666666` (gray)
- **Border**: `#E8E4DC` (light tan)

### Typography
- **Headings**: DM Serif Display (elegant, serif)
- **Body**: DM Sans (clean, sans-serif)

### Components
- Rounded cards with subtle shadows
- Generous whitespace
- Smooth hover transitions

## API Routes

### POST `/api/chat`
Chat with the AI assistant.

**Request:**
```json
{
  "message": "What centres are good for infants in Vancouver?",
  "context": "Optional centre-specific context"
}
```

**Response:**
```json
{
  "message": "Based on the centres available...",
  "role": "assistant"
}
```

## Mock Data

The app includes 12 realistic BC daycare centres across Vancouver, Burnaby, Surrey, Richmond, Coquitlam, North Vancouver, and Langley. Data is stored in `/lib/mock-data.ts`.

Each centre includes:
- Name, address, city, coordinates
- Age groups served (infant, toddler, preschool, school-age)
- Languages offered
- Schedule type (full-time, part-time, drop-in)
- $10/Day program eligibility
- Available spots
- Contact info and description

## Future Enhancements

- [ ] Real Supabase integration for dynamic data
- [ ] User accounts and saved preferences
- [ ] Parent reviews and ratings
- [ ] Booking system integration
- [ ] Availability calendar
- [ ] Push notifications for new centres
- [ ] Real waitlist management
- [ ] Admin dashboard for centre management

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
npm run build
npm start
```

### Other Platforms
The app is compatible with any Node.js hosting (Heroku, DigitalOcean, AWS, etc.).

## Environment Variables

Required:
- `ANTHROPIC_API_KEY` - Your Anthropic API key for Claude

Optional:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For future Google Maps integration

## Performance

- Next.js App Router for optimal code splitting
- Tailwind CSS for minimal CSS footprint
- Image optimization (when images are added)
- Vercel Edge Functions ready

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Focus states on all buttons
- Color contrast compliant
- Mobile-responsive design

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ for BC families. **Made with Next.js, Tailwind CSS, and Claude AI.**
