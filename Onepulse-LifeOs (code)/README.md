# OnePulse Orb 🔮

Your all-in-one personal growth and wellness companion, powered by AI.

## ✨ Features

### Core Features
- 🎯 Custom Interactive Routines with AI Suggestions
- 🧠 AI-Powered Problem Solver & Life Coach
- 📊 Comprehensive Life Dashboard
- 🏆 Gamified Achievement System
- 🤝 Social Accountability Network
- 🔄 Smart App Integrations

### Technical Highlights
- 🚀 Real-time Progress Tracking
- 🎮 Interactive UI with Drag & Drop
- 🔒 Secure Data Storage with Supabase
- 📱 Progressive Web App (PWA)
- 🌐 Cross-platform Compatibility
- 🎨 Beautiful, Responsive Design

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Testing**: Vitest

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/onepulse-orb.git
   cd onepulse-orb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Supabase credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Setup

Make sure your `.env` file contains the following variables:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code

### Project Structure

```
onepulse-orb/
├── src/
│   ├── components/     # React components
│   ├── lib/           # Utilities and helpers
│   ├── styles/        # Global styles
│   └── types/         # TypeScript definitions
├── public/            # Static assets
├── supabase/          # Database migrations
└── tests/            # Test files
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [Lucide](https://lucide.dev) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for the styling system