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

export const ProjectTable = ({ requests, isLoading, onUpdateStatus, onDelete }: ProjectTableProps) => {
  const [selectedRequest, setSelectedRequest] = useState<AdvertRequest | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Advert Requests</CardTitle>
          <CardDescription>Click anywhere on a row to view full advert details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Ad Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <TableSkeleton cols={6} /> : 
                  requests?.map((req) => (
                    <TableRow 
                      key={req._id} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => setSelectedRequest(req)}
                    >
                      <TableCell className="whitespace-nowrap font-medium">{formatDate(req.createdAt)}</TableCell>
                      <TableCell>
                        <div className="font-semibold">{req.fullName}</div>
                        <div className="text-xs text-muted-foreground">{req.email}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{req.adType}</Badge></TableCell>
                      <TableCell>{req.budget}</TableCell>
                      <TableCell><StatusBadge status={req.status} /></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 px-3 text-xs"
                            onClick={() => onUpdateStatus(req._id, 'reviewing')}
                          >
                            Review
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" 
                            onClick={() => onDelete(req._id)}
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

      {/* Detail Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center justify-between pr-8">
              <span>Advert Details</span>
              {selectedRequest && <StatusBadge status={selectedRequest.status} />}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <DetailItem label="Client Name" value={selectedRequest.fullName} />
                <DetailItem label="Email" value={selectedRequest.email} />
                <DetailItem label="Business Name" value={selectedRequest.businessName} />
                <DetailItem label="Ad Type" value={selectedRequest.adType} />
                <DetailItem label="Budget" value={selectedRequest.budget} />
                <DetailItem label="Wants Hard Copy" value={selectedRequest.wantHardCopy ? "Yes" : "No"} />
              </div>
              
              <div className="space-y-4">
                <DetailItem label="Submission Date" value={formatDate(selectedRequest.createdAt)} />
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional Details</p>
                  <p className="text-sm bg-muted/50 p-3 rounded-lg leading-relaxed border italic">"{selectedRequest.additionalDetails || "No additional details provided"}"</p>
                </div>
              </div>
              
              {selectedRequest.adminNotes && (
                <div className="col-span-full border-t pt-4">
                  <DetailItem label="Internal Admin Notes" value={selectedRequest.adminNotes} />
                </div>
              )}

              <div className="col-span-full border-t pt-4 flex justify-between items-center text-xs text-muted-foreground">
                <span>Database ID: {selectedRequest._id}</span>
                <span>Last Updated: {formatDate(selectedRequest.updatedAt)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
