import Image from 'next/image';
import { Award, Quote } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
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
        {stories.map((story) => {
          const image = PlaceHolderImages.find((img) => img.id === story.imageId);
          return (
            <Card key={story.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl animate-fade-in-up">
              <CardContent className="p-6 flex flex-col items-center text-center">
                {image && (
                  <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                    <AvatarImage src={image.imageUrl} alt={story.name} data-ai-hint={image.imageHint} />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-grow">
                  <Quote className="h-8 w-8 text-primary/30 mx-auto" />
                  <p className="text-lg italic text-foreground/90 mt-2 mb-4">
                    {story.story}
                  </p>
                </div>
                <div className="mt-auto text-center">
                  <p className="font-bold text-lg font-headline text-primary">{story.name}</p>
                  <p className="text-sm text-muted-foreground">{story.role}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
