import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, User, Eye, Phone } from "lucide-react";
import { Profile } from "@/api/admin";
import { TableSkeleton, formatDate, DetailItem } from "./AdminUI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CallTableProps {
  calls?: Profile[]; // These are profiles/signups in Growtiva context
  isLoading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const CallTable = ({
  calls,
  isLoading,
  onDelete,
}: CallTableProps) => {
  const [selectedCall, setSelectedCall] = useState<Profile | null>(null);

  return (
    <>
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6">
           <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-display font-bold">User Profiles</CardTitle>
              <CardDescription className="mt-1">Community members who have registered for early access.</CardDescription>
            </div>
            <Badge variant="outline" className="bg-gold/5 text-gold border-gold/20 px-3 py-1 font-bold tracking-widest uppercase text-[10px]">
              {calls?.length || 0} Members
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Sign-up Date</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Full Name</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Email Address</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Phone Number</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 text-right uppercase tracking-wider text-[11px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableSkeleton cols={5} />
                ) : (
                  calls?.map((profile) => (
                    <TableRow
                      key={profile._id}
                      className="group cursor-pointer hover:bg-gold/5 transition-all border-border/30"
                      onClick={() => setSelectedCall(profile)}
                    >
                      <TableCell className="whitespace-nowrap py-4 px-6 text-sm text-muted-foreground">{formatDate(profile.createdAt)}</TableCell>
                      <TableCell className="py-4 px-6 font-bold text-foreground group-hover:text-gold transition-colors">{profile.fullName}</TableCell>
                      <TableCell className="py-4 px-6 text-sm font-medium">{profile.email}</TableCell>
                      <TableCell className="py-4 px-6 text-sm font-display font-bold tracking-tight">{profile.phone}</TableCell>
                      <TableCell className="py-4 px-6 text-right">
                        <div
                          className="flex justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                           <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-9 w-9 p-0 rounded-full hover:bg-gold/10 hover:text-gold transition-all"
                            onClick={() => setSelectedCall(profile)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 rounded-full text-destructive hover:bg-destructive/10 transition-all"
                            onClick={() => onDelete(profile._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {(!calls || calls.length === 0) && !isLoading && (
            <div className="py-20 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No user profiles found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Detail Dialog */}
      <Dialog
        open={!!selectedCall}
        onOpenChange={(open) => !open && setSelectedCall(null)}
      >
        <DialogContent className="max-w-md border-border/40 shadow-2xl bg-card">
          <DialogHeader className="pb-4 border-b border-border/40">
            <DialogTitle className="text-2xl font-display font-bold flex items-center gap-3">
              <User className="w-6 h-6 text-gold" />
              <span>Member Profile</span>
            </DialogTitle>
          </DialogHeader>

          {selectedCall && (
            <div className="grid grid-cols-1 gap-6 py-6">
              <div className="space-y-6">
                <DetailItem label="Full Name" value={selectedCall.fullName} />
                <DetailItem label="Email Address" value={selectedCall.email} />
                <DetailItem label="Phone Number" value={selectedCall.phone} />
                <DetailItem
                  label="Registration Date"
                  value={formatDate(selectedCall.createdAt)}
                />
              </div>
              
              <div className="col-span-full border-t border-border/40 pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                <span>Member ID: {selectedCall._id}</span>
                <span className="flex items-center gap-2">
                   <Phone className="w-3 h-3" /> Registered
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
