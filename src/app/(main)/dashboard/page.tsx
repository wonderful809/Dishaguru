
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, MessageSquare, School, ArrowRight } from 'lucide-react';

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
            className="object-cover animate-image-zoom"
            data-ai-hint={bgImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex flex-col items-center justify-center p-4">
          <div className="animate-in fade-in-up duration-1000">
            <Card className="w-full max-w-2xl bg-transparent border-none shadow-none">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20 w-fit mb-4 animate-in zoom-in-75 duration-500">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-5xl font-extrabold font-headline text-white animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
                  Find Your Future with Disha Guru
                </CardTitle>
                <CardDescription className="text-xl text-white/90 mt-4 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300 max-w-xl mx-auto">
                  Get personalized career advice, ask questions, and explore your
                  future possibilities with our AI-powered career mentor.
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-6 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-400 justify-center">
                <Button
                  asChild
                  className="w-full max-w-xs mx-auto text-lg py-7 rounded-full font-bold group"
                >
                  <Link href="/career-chat">
                    Start Chat
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold font-headline text-foreground">
              Explore Your Future
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              All the tools you need for your career journey, in one place.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature, index) => (
              <Card
                key={feature.title}
                className="group flex flex-col text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-in fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="items-center pt-8">
                  <div className="p-5 bg-primary/10 rounded-full w-fit transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                    <feature.icon className="h-10 w-10 text-primary transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  <CardTitle className="font-headline text-2xl font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-3 text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6">
                  <Button asChild variant="outline" className="w-full text-base py-6 font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Link href={feature.href}>
                      Explore
                      <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"/>
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
