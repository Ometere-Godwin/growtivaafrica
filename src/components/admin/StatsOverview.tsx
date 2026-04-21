import { Card, CardContent } from "@/components/ui/card";
import { Clock, Mail, Phone, User } from "lucide-react";
import { GrootivaStats } from "@/api/admin";

interface StatsOverviewProps {
  stats?: GrootivaStats;
}

const StatsCard = ({ title, value, icon }: { title: string, value?: number, icon: React.ReactNode }) => (
  <Card>
    <CardContent className="p-6 flex items-center gap-4">
      <div className="p-3 bg-muted rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <h3 className="text-2xl font-bold">{value ?? "..."}</h3>
      </div>
    </CardContent>
  </Card>
);

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard title="Adverts" value={stats?.advertRequests} icon={<Clock className="text-blue-500" />} />
      <StatsCard title="Profiles" value={stats?.profiles} icon={<Phone className="text-green-500" />} />
      <StatsCard title="Contacts" value={stats?.contactMessages} icon={<Mail className="text-orange-500" />} />
      <StatsCard title="Subscribers" value={stats?.subscribers} icon={<User className="text-purple-500" />} />
    </div>
  );
};
