# flight2ics ✈️

Convert flight numbers into downloadable ICS calendar events. A simple React + TypeScript web application that generates calendar files from flight information.

## Features

- 🔍 Search flights by flight number
- 📅 Generate ICS calendar files
- ⬇️ Download calendar events for import into any calendar app
- 📱 Responsive design for mobile and desktop
- 🎨 Clean, modern UI
- 🚀 Static frontend - no backend required

## Demo

Try it live at: `https://eyal-hl.github.io/flight2ics/`

## How to Use

1. Enter a flight number in the format `AB123` (e.g., `AA123`, `UA456`, `DL789`)
2. Click "Search" to retrieve flight details
3. Review the flight information displayed
4. Click "Download ICS File" to save the calendar event
5. Import the downloaded `.ics` file into your preferred calendar application (Google Calendar, Apple Calendar, Outlook, etc.)

**Note:** This application uses mock/placeholder flight data for demonstration purposes. In a production environment, you would integrate with a real flight information API.

## Development

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/eyal-hl/flight2ics.git
cd flight2ics

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

```bash
# Build the application
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy to GitHub Pages
3. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# Deploy the dist folder to GitHub Pages
# You can use gh-pages package or manually push to gh-pages branch
```

### Configuration

The application is configured for GitHub Pages deployment with the base path `/flight2ics/` in `vite.config.ts`. If you're deploying to a different URL or custom domain, update the `base` option:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Update this
})
```

## Project Structure

```
flight2ics/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/                     # Static assets
├── src/
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles
│   ├── types.ts                # TypeScript type definitions
│   ├── flightService.ts        # Mock flight data service
│   └── icsGenerator.ts         # ICS file generation utility
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Hosting

## Future Enhancements

- Integration with real flight information APIs (e.g., FlightAware, AviationStack)
- Support for multi-leg flights
- Flight status updates and notifications
- More detailed flight information (gate numbers, terminal info, etc.)
- Time zone handling and conversions
- QR code generation for easy sharing
- Save favorite flights

## License

MIT License - Feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
