
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, MessageSquare, School } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

const featureCards = [
  {
    title: 'AI Career Mentor',
    description: 'Engage in a conversation with your AI mentor to get personalized career advice.',
    href: '/career-chat',
    icon: MessageSquare,
  },
  {
    title: 'Top Colleges',
    description: 'Explore a curated list of top colleges and universities across India.',
    href: '/colleges',
    icon: School,
  },
  {
    title: 'Success Stories',
    description: 'Get inspired by reading the stories of students who achieved their dreams.',
    href: '/success-stories',
    icon: Award,
  },
];

export default function DashboardPage() {
  const bgImage = PlaceHolderImages.find(
    (img) => img.id === 'dashboard-background'
  );

  return (
    <div className="flex-grow flex flex-col -m-4 sm:-m-6 lg:-m-8">
      {/* Hero Section */}
      <div className="relative flex-grow flex flex-col justify-center items-center text-center overflow-hidden min-h-[60vh]">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt="Inspiring background"
            fill
            className="object-cover scale-105"
            data-ai-hint={bgImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col items-center justify-center p-4">
          <div className="animate-in fade-in-up duration-1000">
            <Card className="w-full max-w-lg bg-transparent border-none shadow-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20 w-fit mb-4 animate-in zoom-in-50 duration-500">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold font-headline text-white animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
                  Chat with your Mentor
                </CardTitle>
                <CardDescription className="text-lg text-white/80 mt-2 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
                  Get personalized career advice, ask questions, and explore your
                  future possibilities with our AI-powered career mentor.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-4 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-400">
                <Button
                  asChild
                  className="w-full max-w-xs mx-auto text-lg py-7 rounded-full font-bold animate-pulse hover:animate-none"
                >
                  <Link href="/career-chat">Start Chat</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline text-foreground">
              Explore Your Future
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              All the tools you need for your career journey, in one place.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature, index) => (
              <Card
                key={feature.title}
                className="flex flex-col text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-in fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="font-headline text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={feature.href}>
                      Explore
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
