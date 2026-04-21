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
import { Trash2 } from "lucide-react";
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
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Subscribers</CardTitle>
          <CardDescription>Click anywhere on a row to view subscription info.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Joined</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <TableSkeleton cols={4} /> : 
                  subscribers?.map((sub) => (
                    <TableRow 
                      key={sub._id} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => setSelectedSub(sub)}
                    >
                      <TableCell>{formatDate(sub.createdAt)}</TableCell>
                      <TableCell className="font-semibold">{sub.email}</TableCell>
                      <TableCell>
                        <Badge variant={sub.active ? "default" : "outline"}>
                          {sub.active ? "Active" : "Unsubscribed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div onClick={(e) => e.stopPropagation()}>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" 
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
        </CardContent>
      </Card>

      <Dialog open={!!selectedSub} onOpenChange={(open) => !open && setSelectedSub(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-display">Subscriber Info</DialogTitle>
          </DialogHeader>
          
          {selectedSub && (
            <div className="space-y-4 py-4">
              <DetailItem label="Email Address" value={selectedSub.email} />
              <DetailItem label="Name" value={selectedSub.name || "Anonymous Subscriber"} />
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>
                <Badge variant={selectedSub.active ? "default" : "outline"}>
                  {selectedSub.active ? "Active & Subscribed" : "Unsubscribed"}
                </Badge>
              </div>
              <DetailItem label="Joined Date" value={formatDate(selectedSub.createdAt)} />
              <div className="border-t pt-4 text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
                <p>System ID: {selectedSub._id}</p>
                <p className="mt-1">Last Update: {formatDate(selectedSub.updatedAt)}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
