import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlexAI - Your AI Fitness Coach',
  description: 'Personalized fitness coaching powered by AI. Track workouts, get expert advice, and achieve your fitness goals.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
