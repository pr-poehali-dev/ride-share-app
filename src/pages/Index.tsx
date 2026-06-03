import { useState } from "react";
import HomePage from "@/components/app/HomePage";
import SearchPage from "@/components/app/SearchPage";
import OrdersPage from "@/components/app/OrdersPage";
import ProfilePage from "@/components/app/ProfilePage";
import RatingsPage from "@/components/app/RatingsPage";
import WalletPage from "@/components/app/WalletPage";
import SupportPage from "@/components/app/SupportPage";
import BottomNav from "@/components/app/BottomNav";
import Header from "@/components/app/Header";

export type Page = "home" | "search" | "orders" | "profile" | "ratings" | "wallet" | "support";
export type UserRole = "passenger" | "driver";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [role, setRole] = useState<UserRole>("passenger");

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} role={role} />;
      case "search": return <SearchPage role={role} />;
      case "orders": return <OrdersPage role={role} />;
      case "profile": return <ProfilePage role={role} setRole={setRole} />;
      case "ratings": return <RatingsPage />;
      case "wallet": return <WalletPage />;
      case "support": return <SupportPage />;
      default: return <HomePage setPage={setPage} role={role} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(255,107,26,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139,92,246,0.12) 0%, transparent 60%)",
        }}
      />
      <Header page={page} setPage={setPage} role={role} />
      <main className="flex-1 overflow-y-auto pb-24 pt-16 relative z-10">
        {renderPage()}
      </main>
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}
