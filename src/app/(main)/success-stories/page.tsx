import Image from 'next/image';
import { Award, Quote } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { stories } from './data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20">
          <Award className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline">Success Stories</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Read the inspiring journeys of individuals who found their path with a little guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {stories.map((story, index) => {
          const image = PlaceHolderImages.find((img) => img.id === story.imageId);
          return (
            <Card 
              key={story.id} 
              className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/50 animate-in fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                {image && (
                  <Avatar className="h-28 w-28 mb-6 border-4 border-primary/20 transition-transform duration-500 group-hover:scale-110">
                    <AvatarImage src={image.imageUrl} alt={story.name} data-ai-hint={image.imageHint} />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-grow relative">
                  <Quote className="h-10 w-10 text-primary/20 absolute -top-4 left-1/2 -translate-x-1/2 transform transition-transform duration-500 group-hover:scale-125" />
                  <p className="text-lg italic text-foreground/90 mt-4 mb-4 z-10 relative">
                    {story.story}
                  </p>
                </div>
                <div className="mt-auto text-center">
                  <p className="font-bold text-xl font-headline text-primary">{story.name}</p>
                  <p className="text-base text-muted-foreground">{story.role}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
