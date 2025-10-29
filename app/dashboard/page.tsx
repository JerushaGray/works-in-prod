// /app/dashboard/page.tsx
import { DashboardClientPage } from "./DashboardClientPage";

export const metadata = {
  title: "Dashboard | Works in Prod",
  description: "Manage Your MarTech Stack",
};

// ✅ This wrapper stays simple; the drawer logic lives in DashboardClientPage.
export default function DashboardPage() {
  return <DashboardClientPage />;
}
