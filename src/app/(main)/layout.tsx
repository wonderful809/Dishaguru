import { SidebarNav } from '@/components/layout/sidebar-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { DishaGuruLogo } from '@/components/icons';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <DishaGuruLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground group-data-[collapsible=icon]:hidden">
              Disha Guru
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-10">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2">
            <DishaGuruLogo className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold font-headline text-foreground">
              Disha Guru
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
