
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, School, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardPage() {
  const bgImage = PlaceHolderImages.find(
    (img) => img.id === 'dashboard-background'
  );

  const features = [
    {
      href: '/career-chat',
      icon: MessageSquare,
      title: 'Chat with Mentor',
      description: 'Get personalized career advice and explore your future.',
    },
    {
      href: '/colleges',
      icon: School,
      title: 'Explore Colleges',
      description: 'Find the perfect college to kickstart your career.',
    },
    {
      href: '/success-stories',
      icon: Award,
      title: 'Success Stories',
      description: 'Get inspired by the journeys of successful individuals.',
    },
  ];

  return (
    <div className="relative flex-grow flex flex-col justify-center items-center text-center -m-4 sm:-m-6 lg:-m-8">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Inspiring background"
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative z-10 flex flex-col gap-8 p-4">
        <div className="text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
            Welcome to <span className="text-primary">Disha</span>{' '}
            <span className="text-secondary-foreground">Guru</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Your personal AI mentor for navigating the path to a successful
            career in India.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-up duration-700">
          {features.map((feature, i) => (
            <Link href={feature.href} key={i}>
              <Card className="flex flex-col items-center justify-center p-6 text-center h-full bg-background/20 backdrop-blur-sm border-white/20 hover:bg-background/30 transition-all duration-300">
                <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20 w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold font-headline mb-2 text-foreground">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
