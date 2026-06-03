import Icon from "@/components/ui/icon";
import { Page, UserRole } from "@/pages/Index";

interface HeaderProps {
  page: Page;
  setPage: (p: Page) => void;
  role: UserRole;
}

const pageTitles: Record<Page, string> = {
  home: "РидеМэтч",
  search: "Поиск",
  orders: "Мои поездки",
  profile: "Профиль",
  ratings: "Рейтинги",
  wallet: "Кошелёк",
  support: "Поддержка",
};

export default function Header({ page, setPage, role }: HeaderProps) {
  const isHome = page === "home";

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4 pt-3 pb-2">
      <div className="card-glass rounded-2xl px-4 py-2.5 flex items-center justify-between">
        {isHome ? (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "var(--grad-1)" }}
            >
              <Icon name="Car" size={16} className="text-white" />
            </div>
            <span className="font-display font-800 text-lg gradient-text">РидеМэтч</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage("home")}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
            >
              <Icon name="ChevronLeft" size={20} className="text-white" />
            </button>
            <span className="font-semibold text-white text-base">{pageTitles[page]}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: role === "driver" ? "rgba(139,92,246,0.2)" : "rgba(255,107,26,0.2)",
              color: role === "driver" ? "#A78BFA" : "#FF6B1A",
              border: `1px solid ${role === "driver" ? "rgba(139,92,246,0.3)" : "rgba(255,107,26,0.3)"}`,
            }}
          >
            {role === "driver" ? "Водитель" : "Пассажир"}
          </div>
          <button
            onClick={() => setPage("support")}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
          >
            <Icon name="Bell" size={18} className="text-white/60" />
          </button>
        </div>
      </div>
    </header>
  );
}
