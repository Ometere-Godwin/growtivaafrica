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
import { Trash2, Mail, Eye, MessageSquare } from "lucide-react";
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
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-display font-bold">Contact Inbox</CardTitle>
              <CardDescription className="mt-1">General inquiries and messages from the community.</CardDescription>
            </div>
            <Badge variant="outline" className="bg-gold/5 text-gold border-gold/20 px-3 py-1 font-bold tracking-widest uppercase text-[10px]">
              {contacts?.length || 0} Messages
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Date</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Sender</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Subject</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 uppercase tracking-wider text-[11px]">Status</TableHead>
                  <TableHead className="font-bold text-foreground/70 py-4 px-6 text-right uppercase tracking-wider text-[11px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <TableSkeleton cols={5} /> : 
                  contacts?.map((contact) => (
                    <TableRow 
                      key={contact._id} 
                      className="group cursor-pointer hover:bg-gold/5 transition-all border-border/30" 
                      onClick={() => setSelectedContact(contact)}
                    >
                      <TableCell className="whitespace-nowrap py-4 px-6 text-sm text-muted-foreground">{formatDate(contact.createdAt)}</TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="font-bold text-foreground group-hover:text-gold transition-colors">{contact.name}</div>
                        <div className="text-[11px] text-muted-foreground font-medium">{contact.email}</div>
                      </TableCell>
                      <TableCell className="py-4 px-6 font-medium text-sm max-w-[200px] truncate">{contact.subject || 'No Subject'}</TableCell>
                      <TableCell className="py-4 px-6"><StatusBadge status={contact.status} /></TableCell>
                      <TableCell className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-9 w-9 p-0 rounded-full hover:bg-gold/10 hover:text-gold transition-all"
                            onClick={() => setSelectedContact(contact)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-9 w-9 p-0 rounded-full text-destructive hover:bg-destructive/10 transition-all" 
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
          {(!contacts || contacts.length === 0) && !isLoading && (
            <div className="py-20 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No messages found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Detail Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-xl border-border/40 shadow-2xl bg-card">
          <DialogHeader className="pb-4 border-b border-border/40">
            <DialogTitle className="text-2xl font-display font-bold flex items-center justify-between pr-8">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-gold" />
                <span>Message Details</span>
              </div>
              {selectedContact && <StatusBadge status={selectedContact.status} />}
            </DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-8 py-6">
              <div className="grid grid-cols-2 gap-6">
                <DetailItem label="Full Name" value={selectedContact.name} />
                <DetailItem label="Email Address" value={selectedContact.email} />
                <DetailItem label="Subject" value={selectedContact.subject || "Not provided"} />
                <DetailItem label="Submission Date" value={formatDate(selectedContact.createdAt)} />
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Message Body</p>
                <div className="bg-muted/40 p-5 rounded-xl text-sm whitespace-pre-wrap leading-relaxed border border-border/40 font-medium text-foreground/80 min-h-[150px]">
                  {selectedContact.message}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gold text-white hover:bg-gold/90 font-bold h-11"
                  onClick={() => {
                    onUpdateStatus(selectedContact._id, 'read');
                    setSelectedContact(null);
                  }}
                >
                  Mark as Read
                </Button>
              </div>
              
              <div className="col-span-full border-t border-border/40 pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                <span>Message ID: {selectedContact._id}</span>
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Received
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
