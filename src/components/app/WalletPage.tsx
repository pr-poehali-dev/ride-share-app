import { useState } from "react";
import Icon from "@/components/ui/icon";

const transactions = [
  { id: "T-5841", type: "income", label: "Поездка Арбат → Домодедово", amount: 920, date: "28 мая, 14:32", icon: "Car" },
  { id: "T-5820", type: "outcome", label: "Поездка ВДНХ → Центр", amount: 340, date: "26 мая, 09:15", icon: "Navigation" },
  { id: "T-5799", type: "income", label: "Поездка Юг → Внуково", amount: 1100, date: "24 мая, 17:50", icon: "Car" },
  { id: "T-5780", type: "outcome", label: "Поездка Центр → Шереметьево", amount: 850, date: "22 мая, 06:30", icon: "Navigation" },
  { id: "T-5761", type: "income", label: "Поездка Сокольники → Центр", amount: 280, date: "20 мая, 11:00", icon: "Car" },
  { id: "T-5740", type: "topup", label: "Пополнение кошелька", amount: 2000, date: "18 мая, 10:00", icon: "ArrowDownCircle" },
];

const cards = [
  { brand: "Visa", last4: "4242", color: "var(--grad-1)", expires: "12/26" },
  { brand: "Mastercard", last4: "8891", color: "var(--grad-2)", expires: "09/25" },
];

export default function WalletPage() {
  const [addCard, setAddCard] = useState(false);
  const [topup, setTopup] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");

  const balance = 3450;
  const income = transactions.filter((t) => t.type === "income" || t.type === "topup").reduce((s, t) => s + t.amount, 0);
  const outcome = transactions.filter((t) => t.type === "outcome").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="px-4 pt-2 space-y-4">
      {/* Balance card */}
      <div
        className="rounded-3xl p-5 relative overflow-hidden"
        style={{ background: "var(--grad-1)" }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: "white" }} />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10" style={{ background: "white" }} />
        <p className="text-white/70 text-sm font-medium">Баланс кошелька</p>
        <p className="text-white font-display text-4xl font-900 mt-1 mb-4">₽ {balance.toLocaleString("ru")}</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/15 rounded-2xl p-3">
            <p className="text-white/70 text-xs mb-0.5">Получено</p>
            <p className="text-white font-bold">+₽{income.toLocaleString("ru")}</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-2xl p-3">
            <p className="text-white/70 text-xs mb-0.5">Потрачено</p>
            <p className="text-white font-bold">-₽{outcome.toLocaleString("ru")}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "ArrowUpCircle", label: "Вывести", color: "#4ADE80" },
          { icon: "ArrowDownCircle", label: "Пополнить", color: "#FF6B1A", action: () => setTopup(true) },
          { icon: "SendHorizonal", label: "Перевести", color: "#A78BFA" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="card-glass rounded-2xl p-3 flex flex-col items-center gap-1.5 hover:bg-white/5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${btn.color}20` }}>
              <Icon name={btn.icon} size={20} style={{ color: btn.color }} />
            </div>
            <span className="text-white/60 text-xs">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Topup modal */}
      {topup && (
        <div className="card-glass rounded-2xl p-4 space-y-3 animate-fade-in" style={{ border: "1px solid rgba(255,107,26,0.3)" }}>
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold text-sm">Пополнить кошелёк</p>
            <button onClick={() => setTopup(false)}><Icon name="X" size={16} className="text-white/40" /></button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[500, 1000, 2000].map((a) => (
              <button
                key={a}
                onClick={() => setTopupAmount(String(a))}
                className="py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: topupAmount === String(a) ? "var(--grad-1)" : "rgba(255,255,255,0.06)",
                  color: topupAmount === String(a) ? "white" : "rgba(255,255,255,0.5)",
                }}
              >
                ₽{a}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={topupAmount}
            onChange={(e) => setTopupAmount(e.target.value)}
            placeholder="Своя сумма"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/30 outline-none focus:border-orange-500/50"
          />
          <button className="btn-gradient w-full py-3 rounded-xl text-sm text-white font-semibold">
            Пополнить ₽{topupAmount || "..."}
          </button>
        </div>
      )}

      {/* Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">Карты</h3>
          <button onClick={() => setAddCard(!addCard)} className="text-xs" style={{ color: "#FF6B1A" }}>
            + Добавить
          </button>
        </div>
        <div className="space-y-2">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl p-4 flex items-center gap-3" style={{ background: card.color }}>
              <Icon name="CreditCard" size={24} className="text-white" />
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{card.brand} •••• {card.last4}</p>
                <p className="text-white/70 text-xs">Действует до {card.expires}</p>
              </div>
              {i === 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-white/20 text-white">Основная</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h3 className="text-white font-semibold text-sm mb-3">История операций</h3>
        <div className="card-glass rounded-2xl overflow-hidden">
          {transactions.map((t, i) => (
            <div
              key={t.id}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-all"
              style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    t.type === "income" ? "rgba(74,222,128,0.15)"
                    : t.type === "topup" ? "rgba(6,182,212,0.15)"
                    : "rgba(248,113,113,0.15)",
                }}
              >
                <Icon
                  name={t.icon}
                  size={16}
                  style={{
                    color:
                      t.type === "income" ? "#4ADE80"
                      : t.type === "topup" ? "#06B6D4"
                      : "#F87171",
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{t.label}</p>
                <p className="text-white/30 text-xs">{t.date}</p>
              </div>
              <p
                className="text-sm font-bold flex-shrink-0"
                style={{
                  color:
                    t.type === "income" ? "#4ADE80"
                    : t.type === "topup" ? "#06B6D4"
                    : "#F87171",
                }}
              >
                {t.type === "outcome" ? "-" : "+"}₽{t.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
