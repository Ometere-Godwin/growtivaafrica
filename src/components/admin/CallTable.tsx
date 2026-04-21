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
import { Trash2 } from "lucide-react";
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
      <Card>
        <CardHeader>
          <CardTitle>User Profiles / Sign-ups</CardTitle>
          <CardDescription>
            List of users who have signed up or created profiles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sign-up Date</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableSkeleton cols={5} />
                ) : (
                  calls?.map((profile) => (
                    <TableRow
                      key={profile._id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedCall(profile)}
                    >
                      <TableCell>{formatDate(profile.createdAt)}</TableCell>
                      <TableCell className="font-semibold">{profile.fullName}</TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>{profile.phone}</TableCell>
                      <TableCell className="text-right">
                        <div
                          className="flex justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
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
        </CardContent>
      </Card>

      {/* Profile Detail Dialog */}
      <Dialog
        open={!!selectedCall}
        onOpenChange={(open) => !open && setSelectedCall(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              User Profile Details
            </DialogTitle>
          </DialogHeader>

          {selectedCall && (
            <div className="grid grid-cols-1 gap-6 py-4">
              <div className="space-y-4">
                <DetailItem label="Full Name" value={selectedCall.fullName} />
                <DetailItem label="Email" value={selectedCall.email} />
                <DetailItem label="Phone" value={selectedCall.phone} />
                <DetailItem
                  label="Signed Up At"
                  value={formatDate(selectedCall.createdAt)}
                />
              </div>
              
              <div className="col-span-full border-t pt-4 flex justify-between items-center text-xs text-muted-foreground">
                <span>Database ID: {selectedCall._id}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
