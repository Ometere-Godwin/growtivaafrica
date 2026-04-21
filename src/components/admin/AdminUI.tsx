import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";

// --- Status Badge ---
export const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, "destructive" | "outline" | "secondary" | "default"> = {
    new: "destructive",
    reviewing: "outline",
    quoted: "secondary",
    accepted: "default",
    rejected: "destructive",
    confirmed: "default",
    completed: "outline",
    cancelled: "destructive",
    read: "outline",
    replied: "default",
    archived: "secondary"
  };

  return (
    <Badge variant={variants[status] || "outline"} className="capitalize">
      {status}
    </Badge>
  );
};

// --- Detail Item helper for Dialogs ---
export const DetailItem = ({ label, value }: { label: string, value?: string | number | boolean }) => {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value.toString()}</p>
    </div>
  );
};

// --- Table Skeleton ---
export const TableSkeleton = ({ cols }: { cols: number }) => (
  <>
    {[...Array(5)].map((_, i) => (
      <TableRow key={i}>
        {[...Array(cols)].map((_, j) => (
          <TableCell key={j}>
            <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

// --- Date Formatter ---
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
