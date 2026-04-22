import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Mail, Phone, Users } from "lucide-react";
import { GrootivaStats } from "@/api/admin";

interface StatsOverviewProps {
  stats?: GrootivaStats;
}

const StatsCard = ({ title, value, icon, colorClass }: { title: string, value?: number, icon: React.ReactNode, colorClass: string }) => (
  <Card className="border-border/40 bg-card/30 backdrop-blur-sm hover:border-gold/30 transition-all duration-300 group overflow-hidden">
    <CardContent className="p-6 relative">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gold/10 ${colorClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground/70">{title}</p>
          <h3 className="text-3xl font-bold font-display mt-1">{value ?? "..."}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-up">
      <StatsCard title="Adverts" value={stats?.advertRequests} icon={<Megaphone className="w-5 h-5 text-gold" />} colorClass="text-gold" />
      <StatsCard title="Profiles" value={stats?.profiles} icon={<Phone className="w-5 h-5 text-gold" />} colorClass="text-gold" />
      <StatsCard title="Contacts" value={stats?.contactMessages} icon={<Mail className="w-5 h-5 text-gold" />} colorClass="text-gold" />
      <StatsCard title="Subscribers" value={stats?.subscribers} icon={<Users className="w-5 h-5 text-gold" />} colorClass="text-gold" />
    </div>
  );
};
