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
import { Trash2, ExternalLink, Eye, Megaphone } from "lucide-react";
import { AdvertRequest } from "@/api/admin";
import { StatusBadge, TableSkeleton, formatDate, DetailItem } from "./AdminUI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectTableProps {
  requests?: AdvertRequest[];
  isLoading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const ProjectTable = ({
  requests,
  isLoading,
  onUpdateStatus,
  onDelete,
}: ProjectTableProps) => {
  const [selectedRequest, setSelectedRequest] = useState<AdvertRequest | null>(
    null,
  );

  return (
    <>
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-display font-bold">
                Advert Requests
              </CardTitle>
              <CardDescription className="mt-1">
                Track and manage business inquiries for magazine placements.
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-gold/5 text-gold border-gold/20 px-3 py-1 font-bold tracking-widest uppercase text-[10px]"
            >
              {requests?.length || 0} Inquiries
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">
                    Date
                  </TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">
                    Client & Brand
                  </TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">
                    Ad Placement
                  </TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">
                    Budget
                  </TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 text-right uppercase tracking-wider text-[11px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableSkeleton cols={6} />
                ) : (
                  requests?.map((req) => (
                    <TableRow
                      key={req._id}
                      className="group cursor-pointer hover:bg-gold/5 transition-all border-border/30"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <TableCell className="whitespace-nowrap py-4 px-6 text-sm text-muted-foreground">
                        {formatDate(req.createdAt)}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="font-bold text-foreground group-hover:text-gold transition-colors">
                          {req.fullName}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-tight">
                          {req.businessName}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge
                          variant="secondary"
                          className="bg-secondary/50 font-semibold px-2 py-0 text-[10px] uppercase"
                        >
                          {req.adType}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 px-6 font-display font-bold text-foreground">
                        {req.budget}
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <StatusBadge status={req.status} />
                      </TableCell>
                      <TableCell className="py-4 px-6 text-right">
                        <div
                          className="flex justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 rounded-full hover:bg-gold/10 hover:text-gold transition-all"
                            onClick={() => setSelectedRequest(req)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 rounded-full text-destructive hover:bg-destructive/10 transition-all"
                            onClick={() => onDelete(req._id)}
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
          {(!requests || requests.length === 0) && !isLoading && (
            <div className="py-20 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Megaphone className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">
                No advert requests found.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedRequest}
        onOpenChange={(open) => !open && setSelectedRequest(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/40 shadow-2xl bg-card">
          <DialogHeader className="pb-4 border-b border-border/40">
            <DialogTitle className="text-2xl font-display font-bold flex items-center justify-between pr-8">
              <div className="flex items-center gap-3">
                <Megaphone className="w-6 h-6 text-gold" />
                <span>Advert Inquiry</span>
              </div>
              {selectedRequest && (
                <StatusBadge status={selectedRequest.status} />
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
              <div className="space-y-6">
                <DetailItem
                  label="Full Name"
                  value={selectedRequest.fullName}
                />
                <DetailItem
                  label="Email Address"
                  value={selectedRequest.email}
                />
                <DetailItem
                  label="Business / Brand"
                  value={selectedRequest.businessName}
                />
                <DetailItem
                  label="Ad Placement"
                  value={selectedRequest.adType.toUpperCase()}
                />
              </div>

              <div className="space-y-6">
                <DetailItem
                  label="Proposed Budget"
                  value={selectedRequest.budget}
                />
                <DetailItem
                  label="Physical Copy Wanted"
                  value={
                    selectedRequest.wantHardCopy
                      ? "Yes, please"
                      : "No, digital only"
                  }
                />
                <DetailItem
                  label="Inquiry Date"
                  value={formatDate(selectedRequest.createdAt)}
                />
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 bg-gold text-white hover:bg-gold/90 font-bold h-11"
                    onClick={() =>
                      onUpdateStatus(selectedRequest._id, "reviewing")
                    }
                  >
                    Mark as Reviewing
                  </Button>
                </div>
              </div>

              <div className="col-span-full space-y-2 mt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
                  Campaign Details
                </p>
                <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-sm leading-relaxed min-h-[100px] font-medium text-foreground/80">
                  {selectedRequest.additionalDetails ||
                    "No additional details provided by the client."}
                </div>
              </div>

              <div className="col-span-full border-t border-border/40 pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                <span>Ref ID: {selectedRequest._id}</span>
                <span className="flex items-center gap-2">
                  Status Updated: {formatDate(selectedRequest.updatedAt)}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
