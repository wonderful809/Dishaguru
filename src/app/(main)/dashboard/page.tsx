import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
      <div className="bg-gradient-to-r from-primary via-white to-secondary p-1 rounded-xl shadow-lg w-full max-w-4xl">
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
    </div>
  );
}
