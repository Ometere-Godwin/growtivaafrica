import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Users, Eye, CheckCircle, XCircle } from "lucide-react";
import { Subscriber } from "@/api/admin";
import { TableSkeleton, formatDate, DetailItem } from "./AdminUI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubscriberTableProps {
  subscribers?: Subscriber[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export const SubscriberTable = ({ subscribers, isLoading, onDelete }: SubscriberTableProps) => {
  const [selectedSub, setSelectedSub] = useState<Subscriber | null>(null);

  return (
    <>
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-display font-bold">Newsletter Subscribers</CardTitle>
              <CardDescription className="mt-1">List of individuals who have subscribed to platform updates.</CardDescription>
            </div>
            <Badge variant="outline" className="bg-gold/5 text-gold border-gold/20 px-3 py-1 font-bold tracking-widest uppercase text-[10px]">
              {subscribers?.length || 0} Subscribers
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Date Joined</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Email Address</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Status</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 text-right uppercase tracking-wider text-[11px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <TableSkeleton cols={4} /> : 
                  subscribers?.map((sub) => (
                    <TableRow 
                      key={sub._id} 
                      className="group cursor-pointer hover:bg-gold/5 transition-all border-border/30" 
                      onClick={() => setSelectedSub(sub)}
                    >
                      <TableCell className="whitespace-nowrap py-4 px-6 text-sm text-muted-foreground">{formatDate(sub.createdAt)}</TableCell>
                      <TableCell className="py-4 px-6 font-bold text-foreground group-hover:text-gold transition-colors">{sub.email}</TableCell>
                      <TableCell className="py-4 px-6">
                        {sub.active ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 font-bold uppercase text-[9px] tracking-widest">
                            <CheckCircle className="w-2.5 h-2.5 mr-1" /> Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground font-bold uppercase text-[9px] tracking-widest">
                            <XCircle className="w-2.5 h-2.5 mr-1" /> Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                           <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-9 w-9 p-0 rounded-full hover:bg-gold/10 hover:text-gold transition-all"
                            onClick={() => setSelectedSub(sub)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-9 w-9 p-0 rounded-full text-destructive hover:bg-destructive/10 transition-all" 
                            onClick={() => onDelete(sub._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
          {(!subscribers || subscribers.length === 0) && !isLoading && (
            <div className="py-20 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Users className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No subscribers found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedSub} onOpenChange={(open) => !open && setSelectedSub(null)}>
        <DialogContent className="max-w-sm border-border/40 shadow-2xl bg-card">
          <DialogHeader className="pb-4 border-b border-border/40">
            <DialogTitle className="text-2xl font-display font-bold flex items-center gap-3">
              <Users className="w-6 h-6 text-gold" />
              <span>Subscriber Details</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedSub && (
            <div className="space-y-6 py-6">
              <DetailItem label="Email Address" value={selectedSub.email} />
              <DetailItem label="Name" value={selectedSub.name || "Anonymous Subscriber"} />
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Subscription Status</p>
                {selectedSub.active ? (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1 font-bold uppercase text-[10px] tracking-widest">
                    Active & Subscribed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="px-3 py-1 text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
                    Unsubscribed
                  </Badge>
                )}
              </div>
              <DetailItem label="Joined Date" value={formatDate(selectedSub.createdAt)} />
              
              <div className="col-span-full border-t border-border/40 pt-6 flex flex-col gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                <p>System Ref: {selectedSub._id}</p>
                <p>Last Sync: {formatDate(selectedSub.updatedAt)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
