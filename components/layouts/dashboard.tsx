
import { House } from "lucide-react";
import Nav from "../sections/nav";

const left = [
    {
        href: "#",
        icon: "home",
        title: "Dashboard",
        description: "Overview of your app",
        
    }
]
const right = [
  {
      href: "#",
      icon: <House />,
      title: "Dashboard",
      description: "Overview of your app",
  }
]





export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <Nav/>
<div className="bg-gray-50 relative dark:bg-gray-900 antialiased">
  {children}
</div>
</>
    );
}