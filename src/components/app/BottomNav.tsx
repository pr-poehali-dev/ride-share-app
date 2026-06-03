import Icon from "@/components/ui/icon";
import { Page } from "@/pages/Index";

interface BottomNavProps {
  page: Page;
  setPage: (p: Page) => void;
}

const navItems = [
  { id: "home" as Page, icon: "Home", label: "Главная" },
  { id: "search" as Page, icon: "Search", label: "Поиск" },
  { id: "orders" as Page, icon: "ClipboardList", label: "Заказы" },
  { id: "wallet" as Page, icon: "Wallet", label: "Кошелёк" },
  { id: "profile" as Page, icon: "User", label: "Профиль" },
];

export default function BottomNav({ page, setPage }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4 pb-4">
      <div
        className="card-glass rounded-2xl px-2 py-2 flex items-center justify-around"
        style={{ backdropFilter: "blur(20px)" }}
      >
        {navItems.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: active ? "rgba(255,107,26,0.15)" : "transparent",
              }}
            >
              <div
                className="transition-all duration-200"
                style={{
                  color: active ? "#FF6B1A" : "rgba(255,255,255,0.4)",
                  filter: active ? "drop-shadow(0 0 6px rgba(255,107,26,0.6))" : "none",
                }}
              >
                <Icon name={item.icon} size={20} />
              </div>
              <span
                className="text-[10px] font-medium transition-all duration-200"
                style={{ color: active ? "#FF6B1A" : "rgba(255,255,255,0.4)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
