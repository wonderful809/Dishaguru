import Image from 'next/image';
import { School, MapPin, BarChart, TrendingUp, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { colleges } from './data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function CollegesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20">
          <School className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline">College Directory</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore some of the top colleges and universities across India to find the perfect fit for your future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {colleges.map((college) => {
          const image = PlaceHolderImages.find((img) => img.id === college.imageId);
          return (
            <Card key={college.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl animate-fade-in-up">
              {image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={college.name}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl">{college.name}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground text-sm pt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{college.location}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col gap-4">
                <CardDescription>{college.description}</CardDescription>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Top Programs</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.programs.map((prog) => (
                          <Badge key={prog} variant="secondary">{prog}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <p><span className="font-semibold">Placements:</span> {college.placements}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart className="h-4 w-4 text-primary" />
                    <p><span className="font-semibold">Cutoffs:</span> {college.cutoffs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
