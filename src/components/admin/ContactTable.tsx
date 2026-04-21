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
import { Trash2 } from "lucide-react";
import { ContactMessage } from "@/api/admin";
import { StatusBadge, TableSkeleton, formatDate, DetailItem } from "./AdminUI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactTableProps {
  contacts?: ContactMessage[];
  isLoading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const ContactTable = ({ contacts, isLoading, onUpdateStatus, onDelete }: ContactTableProps) => {
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>Click anywhere on a row to view the full message.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message Preview</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <TableSkeleton cols={6} /> : 
                  contacts?.map((contact) => (
                    <TableRow 
                      key={contact._id} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors" 
                      onClick={() => setSelectedContact(contact)}
                    >
                      <TableCell>{formatDate(contact.createdAt)}</TableCell>
                      <TableCell>
                        <div className="font-semibold">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.email}</div>
                      </TableCell>
                      <TableCell className="font-medium text-sm">{contact.subject || 'No Subject'}</TableCell>
                      <TableCell className="max-w-[200px] truncate italic text-muted-foreground">"{contact.message}"</TableCell>
                      <TableCell><StatusBadge status={contact.status} /></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                            onClick={() => onUpdateStatus(contact._id, 'read')}
                          >
                            Mark Read
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" 
                            onClick={() => onDelete(contact._id)}
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

      {/* Contact Detail Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center justify-between pr-8">
              <span>Message Details</span>
              {selectedContact && <StatusBadge status={selectedContact.status} />}
            </DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Full Name" value={selectedContact.name} />
                <DetailItem label="Email" value={selectedContact.email} />
                <DetailItem label="Subject" value={selectedContact.subject || "Not provided"} />
                <DetailItem label="Sent Date" value={formatDate(selectedContact.createdAt)} />
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Message Content</p>
                <div className="bg-muted/50 p-4 rounded-lg text-sm whitespace-pre-wrap leading-relaxed border italic">
                  "{selectedContact.message}"
                </div>
              </div>

              {selectedContact.adminNotes && (
                <div className="border-t pt-2">
                  <DetailItem label="Admin Notes" value={selectedContact.adminNotes} />
                </div>
              )}
              
              <div className="col-span-full border-t pt-4 flex justify-between items-center text-xs text-muted-foreground">
                <span>Database ID: {selectedContact._id}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
