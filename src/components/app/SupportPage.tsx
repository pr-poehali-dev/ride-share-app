import { useState } from "react";
import Icon from "@/components/ui/icon";

const faqs = [
  { q: "Как торговаться за цену?", a: "Нажми кнопку «Торг» при выборе маршрута, введи свою сумму и отправь предложение водителю. Он может принять или предложить встречную цену." },
  { q: "Как стать водителем?", a: "Перейди в профиль → выбери роль «Водитель» → загрузи документы на автомобиль. Верификация занимает до 24 часов." },
  { q: "Безопасны ли поездки?", a: "Все водители проходят верификацию документов. Ты можешь поделиться маршрутом с близкими через кнопку «Поделиться» в активном заказе." },
  { q: "Как получить возврат?", a: "Отмена до 15 минут до поездки — возврат 100%. После — 50%. Создай заявку в чате поддержки." },
  { q: "Где хранятся деньги?", a: "В защищённом кошельке приложения. Вывод на карту — до 3 рабочих дней." },
];

const messages = [
  { from: "support", text: "Привет! Я Алёна из службы поддержки РидеМэтч. Чем могу помочь? 👋", time: "12:01" },
  { from: "user", text: "Хочу вернуть деньги за отменённую поездку", time: "12:03" },
  { from: "support", text: "Понимаю! Уточни, пожалуйста, номер заказа. Посмотрю в системе прямо сейчас.", time: "12:03" },
];

export default function SupportPage() {
  const [tab, setTab] = useState<"chat" | "faq">("chat");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(messages);

  const sendMsg = () => {
    if (!msg.trim()) return;
    setChat([...chat, { from: "user", text: msg, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) }]);
    setMsg("");
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { from: "support", text: "Спасибо, обрабатываю твой запрос. Обычно это занимает 2-3 минуты ⏳", time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1200);
  };

  return (
    <div className="px-4 pt-2 space-y-4 flex flex-col">
      {/* Status */}
      <div
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
        <div>
          <p className="text-white text-sm font-semibold">Поддержка онлайн</p>
          <p className="text-white/40 text-xs">Среднее время ответа — 2 минуты</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(6,182,212,0.15)" }}>
            <Icon name="Phone" size={15} style={{ color: "#06B6D4" }} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 card-glass rounded-2xl">
        {[{ id: "chat", label: "💬 Чат" }, { id: "faq", label: "❓ FAQ" }].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "chat" | "faq")}
            className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: tab === t.id ? "var(--grad-1)" : "transparent",
              color: tab === t.id ? "white" : "rgba(255,255,255,0.4)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Chat */}
      {tab === "chat" && (
        <div className="flex flex-col space-y-3">
          <div className="space-y-2 min-h-64">
            {chat.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {m.from === "support" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mr-2 flex-shrink-0 self-end"
                    style={{ background: "var(--grad-2)" }}
                  >
                    А
                  </div>
                )}
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-2xl"
                  style={{
                    background: m.from === "user" ? "var(--grad-1)" : "rgba(255,255,255,0.07)",
                    borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  }}
                >
                  <p className="text-white text-sm leading-relaxed">{m.text}</p>
                  <p className="text-white/40 text-xs mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 sticky bottom-0">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Написать сообщение..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-orange-500/50"
            />
            <button
              onClick={sendMsg}
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--grad-1)" }}
            >
              <Icon name="Send" size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* FAQ */}
      {tab === "faq" && (
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="card-glass rounded-2xl overflow-hidden">
              <button
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="text-white text-sm font-medium">{faq.q}</span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className="text-white/40 flex-shrink-0 ml-2 transition-transform duration-200"
                  style={{ transform: expanded === i ? "rotate(180deg)" : "none" }}
                />
              </button>
              {expanded === i && (
                <div className="px-4 pb-4 animate-fade-in">
                  <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}

          <div
            className="rounded-2xl p-4 flex items-center gap-3 mt-2"
            style={{ background: "rgba(255,107,26,0.08)", border: "1px solid rgba(255,107,26,0.2)" }}
          >
            <Icon name="FileText" size={20} style={{ color: "#FF6B1A" }} />
            <div>
              <p className="text-white text-sm font-semibold">Не нашёл ответ?</p>
              <p className="text-white/40 text-xs">Напиши нам в чат — ответим за 2 мин</p>
            </div>
            <button onClick={() => setTab("chat")} className="ml-auto btn-gradient px-4 py-2 rounded-xl text-xs text-white font-semibold">
              Чат
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
