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

// Split Components
import { StatsOverview } from "@/components/admin/StatsOverview";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { CallTable } from "@/components/admin/CallTable";
import { ContactTable } from "@/components/admin/ContactTable";
import { SubscriberTable } from "@/components/admin/SubscriberTable";

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    !!import.meta.env.VITE_ADMIN_SECRET,
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
    } else {
      toast({ title: "Invalid Secret", variant: "destructive" });
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
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
              />
              <Button type="submit" className="w-full">
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your advert requests, profiles, and contacts.
              </p>
            </div>
            <Button variant="outline" onClick={refreshData} className="w-fit">
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh Data
            </Button>
          </header>

          <StatsOverview stats={statsQuery.data} />

          <Tabs defaultValue="adverts" className="space-y-6">
            <TabsList className="bg-muted w-full justify-start overflow-x-auto h-auto p-1 gap-1">
              <TabsTrigger value="adverts" className="py-2.5">
                Advert Requests
              </TabsTrigger>
              <TabsTrigger value="profiles" className="py-2.5">
                Profiles
              </TabsTrigger>
              <TabsTrigger value="contacts" className="py-2.5">
                Contacts
              </TabsTrigger>
              <TabsTrigger value="subscribers" className="py-2.5">
                Subscribers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="adverts">
              <ProjectTable
                requests={advertsQuery.data?.data}
                isLoading={advertsQuery.isLoading}
                onUpdateStatus={(id, status) =>
                  updateStatusMutation.mutate({ type: "advert", id, status })
                }
                onDelete={(id) => deleteMutation.mutate({ type: "advert", id })}
              />
            </TabsContent>

            <TabsContent value="profiles">
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

            <TabsContent value="contacts">
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

            <TabsContent value="subscribers">
              <SubscriberTable
                subscribers={subscribersQuery.data?.data}
                isLoading={subscribersQuery.isLoading}
                onDelete={(id) =>
                  deleteMutation.mutate({ type: "subscriber", id })
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
