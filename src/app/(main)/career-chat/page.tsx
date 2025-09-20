'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { MessageCircle, BrainCircuit, Lightbulb, BookOpen } from 'lucide-react';

import { getCareerSuggestion } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Thinking...' : 'Get Career Advice'}
      {!pending && <Lightbulb className="ml-2" />}
    </Button>
  );
}

export default function CareerChatPage() {
  const { toast } = useToast();
  const initialState = { message: '', data: null, issues: null };
  const [state, formAction] = useFormState(getCareerSuggestion, initialState);

  useEffect(() => {
    if (state.message !== 'Success' && (state.issues || state.message)) {
      const description = state.issues ? (
        <ul>
          {state.issues.map((issue) => (
            <li key={issue}>• {issue}</li>
          ))}
        </ul>
      ) : state.message;
      
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: description as React.ReactNode,
      });
    }
  }, [state, toast]);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full border-4 border-primary/20">
          <MessageCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline">AI Career Mentor</h1>
        <p className="text-lg text-muted-foreground">
          Describe your interests and academic background, and our AI will suggest potential career paths for you.
        </p>
      </div>

      <Card className="animate-fade-in-up">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="interests">Your Interests & Hobbies</Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="e.g., 'I love playing video games, designing graphics, and I'm fascinated by space exploration...'"
                rows={4}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="academicBackground">Your Academic Background</Label>
              <Textarea
                id="academicBackground"
                name="academicBackground"
                placeholder="e.g., 'Completed 12th grade in Science stream with Physics, Chemistry, and Math. Scored 85%...'"
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-4">
        {useFormStatus().pending && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        )}

        {state.data && (
          <div className="space-y-6 animate-fade-in">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Here are your results!</AlertTitle>
              <AlertDescription>
                Based on your inputs, here are some potential paths to explore.
              </AlertDescription>
            </Alert>

            <Card className="border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                  <CardTitle className="font-headline">Suggested Careers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-foreground/90">{state.data.suggestedCareers}</p>
              </CardContent>
            </Card>
            
            <Card className="border-accent/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-accent" />
                  <CardTitle className="font-headline text-accent">Study Plan Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-foreground/90">{state.data.studyPlanRecommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
