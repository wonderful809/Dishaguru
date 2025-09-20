import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, School, Award } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Career Chatbot',
    description: 'Get personalized career suggestions from our AI mentor, Disha Guru.',
    link: '/career-chat',
    icon: MessageCircle,
    imageId: 'chatbot-feature',
  },
  {
    title: 'College Directory',
    description: 'Explore top Indian colleges and universities for your future.',
    link: '/colleges',
    icon: School,
    imageId: 'colleges-feature',
  },
  {
    title: 'Success Stories',
    description: 'Get inspired by the journeys of successful professionals.',
    link: '/success-stories',
    icon: Award,
    imageId: 'stories-feature',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-gradient-to-r from-primary via-white to-secondary p-1 rounded-xl shadow-lg">
        <div className="bg-background rounded-lg p-8 md:p-12">
          <div className="text-center flex flex-col items-center gap-4">
            <Badge variant="outline" className="border-secondary text-secondary-foreground bg-secondary/90">Your Future Awaits</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-headline animate-fade-in-down">
              Welcome to <span className="text-primary">Disha</span> <span className="text-secondary-foreground">Guru</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl animate-fade-in-up">
              Your personal AI mentor for navigating the path to a successful career in India. Let's find the right direction for you.
            </p>
            <Button asChild size="lg" className="mt-4 animate-fade-in-up">
              <Link href="/career-chat">Chat with Mentor <ArrowRight/></Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {features.map((feature, index) => {
          const image = PlaceHolderImages.find((img) => img.id === feature.imageId);
          return (
            <Link href={feature.link} key={feature.title} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-2">
                {image && (
                   <div className="relative h-48 w-full">
                      <Image
                        src={image.imageUrl}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                   </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                       <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                 <div className="p-6 pt-0 flex justify-end">
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
