import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStats,
  getAdvertRequests,
  getProfiles,
  getContactMessages,
  getSubscribers,
  updateAdvertRequest,
  deleteAdvertRequest,
  updateProfile,
  deleteProfile,
  updateContactMessage,
  deleteContactMessage,
  updateSubscriber,
  deleteSubscriber,
  AdvertRequest,
  Profile,
  ContactMessage,
  Subscriber,
} from "@/api/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";

import { StatsOverview } from "@/components/admin/StatsOverview";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { CallTable } from "@/components/admin/CallTable";
import { ContactTable } from "@/components/admin/ContactTable";
import { SubscriberTable } from "@/components/admin/SubscriberTable";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Menu,
  X,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem("admin_auth") === "true",
  );
  const [passwordInput, setPasswordInput] = useState("");

  // Queries
  const statsQuery = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: getStats,
  });
  const advertsQuery = useQuery({
    queryKey: ["admin", "adverts"],
    queryFn: () => getAdvertRequests({ limit: 100 }),
  });
  const profilesQuery = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: () => getProfiles({ limit: 100 }),
  });
  const contactsQuery = useQuery({
    queryKey: ["admin", "contacts"],
    queryFn: () => getContactMessages({ limit: 100 }),
  });
  const subscribersQuery = useQuery({
    queryKey: ["admin", "subscribers"],
    queryFn: () => getSubscribers({ limit: 100 }),
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: ({ type, id }: { type: string; id: string }): Promise<any> => {
      switch (type) {
        case "advert":
          return deleteAdvertRequest(id);
        case "profile":
          return deleteProfile(id);
        case "contact":
          return deleteContactMessage(id);
        case "subscriber":
          return deleteSubscriber(id);
        default:
          throw new Error("Invalid type");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast({ title: "Deleted", description: `Record deleted successfully.` });
    },
    onError: (err: Error) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      type,
      id,
      status,
    }: {
      type: string;
      id: string;
      status?: string;
      updates?: any;
    }): Promise<any> => {
      switch (type) {
        case "advert":
          return updateAdvertRequest(id, {
            status: status as AdvertRequest["status"],
          });
        case "contact":
          return updateContactMessage(id, {
            status: status as ContactMessage["status"],
          });
        case "subscriber":
          return updateSubscriber(id, { active: status === "active" });
        default:
          throw new Error("Invalid type");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast({ title: "Updated", description: "Status updated successfully." });
    },
    onError: (err: Error) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_SECRET) {
      setIsAdminAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      toast({ title: "Not an Admin!", variant: "destructive" });
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
        <Card className="w-full max-w-md border-border/40 shadow-2xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <span className="font-display font-bold text-2xl tracking-tight">
                GROWTIVA <span className="text-gold">AFRICA</span>
              </span>
            </div>
            <CardTitle className="text-2xl font-display font-bold">
              Admin Access
            </CardTitle>
            <CardDescription>
              Please enter your admin secret to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <Input
                type="password"
                placeholder="Admin Secret"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="bg-muted/50 border-border/40 focus:border-gold/50 transition-colors"
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6"
              >
                Unlock Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["admin"] });
    toast({ title: "Refreshing", description: "Fetching latest data..." });
  };

  const navLinks = [
    { href: "/advertise", label: "Advertise" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-tight">
              GROWTIVA <span className="text-gold">AFRICA</span>
            </span>
            <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
              Admin
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="container py-4 flex flex-col gap-4 text-sm">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-in">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold tracking-widest uppercase mb-2">
                Command Center
              </div>
              <h1 className="text-4xl font-bold font-display tracking-tight">
                Dashboard <span className="text-gold">Control</span>
              </h1>
              <p className="text-muted-foreground max-w-md">
                Monitor growth, manage requests, and track community engagement
                across the platform.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={refreshData}
              className="w-fit border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all gap-2 h-11 px-6 font-semibold"
            >
              <RefreshCcw
                className={`h-4 w-4 ${statsQuery.isFetching ? "animate-spin" : ""}`}
              />
              Sync Data
            </Button>
          </header>

          <StatsOverview stats={statsQuery.data} />

          <Tabs defaultValue="adverts" className="space-y-8 mt-10">
            <div className="relative">
              <TabsList className="bg-muted/50 w-full justify-start overflow-x-auto h-auto p-1 gap-1 border border-border/40 backdrop-blur-sm">
                <TabsTrigger
                  value="adverts"
                  className="py-2.5 px-6 data-[state=active]:bg-background data-[state=active]:text-gold data-[state=active]:shadow-sm font-semibold transition-all"
                >
                  Advert Requests
                </TabsTrigger>
                <TabsTrigger
                  value="profiles"
                  className="py-2.5 px-6 data-[state=active]:bg-background data-[state=active]:text-gold data-[state=active]:shadow-sm font-semibold transition-all"
                >
                  User Profiles
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="py-2.5 px-6 data-[state=active]:bg-background data-[state=active]:text-gold data-[state=active]:shadow-sm font-semibold transition-all"
                >
                  Contact Inbox
                </TabsTrigger>
                <TabsTrigger
                  value="subscribers"
                  className="py-2.5 px-6 data-[state=active]:bg-background data-[state=active]:text-gold data-[state=active]:shadow-sm font-semibold transition-all"
                >
                  Subscribers
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="animate-fade-up">
              <TabsContent
                value="adverts"
                className="m-0 focus-visible:outline-none"
              >
                <ProjectTable
                  requests={advertsQuery.data?.data}
                  isLoading={advertsQuery.isLoading}
                  onUpdateStatus={(id, status) =>
                    updateStatusMutation.mutate({ type: "advert", id, status })
                  }
                  onDelete={(id) =>
                    deleteMutation.mutate({ type: "advert", id })
                  }
                />
              </TabsContent>

              <TabsContent
                value="profiles"
                className="m-0 focus-visible:outline-none"
              >
                <CallTable
                  calls={profilesQuery.data?.data}
                  isLoading={profilesQuery.isLoading}
                  onUpdateStatus={(id, status) =>
                    updateStatusMutation.mutate({ type: "profile", id, status })
                  }
                  onDelete={(id) =>
                    deleteMutation.mutate({ type: "profile", id })
                  }
                />
              </TabsContent>

              <TabsContent
                value="contacts"
                className="m-0 focus-visible:outline-none"
              >
                <ContactTable
                  contacts={contactsQuery.data?.data}
                  isLoading={contactsQuery.isLoading}
                  onUpdateStatus={(id, status) =>
                    updateStatusMutation.mutate({ type: "contact", id, status })
                  }
                  onDelete={(id) =>
                    deleteMutation.mutate({ type: "contact", id })
                  }
                />
              </TabsContent>

              <TabsContent
                value="subscribers"
                className="m-0 focus-visible:outline-none"
              >
                <SubscriberTable
                  subscribers={subscribersQuery.data?.data}
                  isLoading={subscribersQuery.isLoading}
                  onDelete={(id) =>
                    deleteMutation.mutate({ type: "subscriber", id })
                  }
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="dark py-12 bg-surface-dark text-muted-foreground border-t border-white/5">
        <div className="container text-center space-y-5">
          <p className="font-display font-bold text-gold text-lg">
            GROWTIVA AFRICA
          </p>
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://instagram.com/growtivaafrica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/growtivaafrica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-gold transition-colors"
              aria-label="X / Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/growtivaafrica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-gold transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/growtivaafrica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-foreground opacity-70 font-medium">
            A Production of Swiftpixels Creative Studios
          </p>
          <p className="text-xs text-foreground opacity-30">
            &copy; {new Date().getFullYear()} Growtiva Africa. Admin Control
            Panel.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
