import { useState } from "react";
import Icon from "@/components/ui/icon";
import CityInput from "@/components/app/CityInput";
import { createRoute } from "@/api/routes";

interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  seats: number;
  time: string;
  date: string;
  comment: string;
  car: string;
  status: "active" | "done";
}

interface PublishRouteProps {
  onClose?: () => void;
  onPublish?: (route: Route) => void;
}

const DATES = ["Сегодня", "Завтра", "Послезавтра"];
const CARS = ["Toyota Camry", "Hyundai Solaris", "Kia Rio", "Lada Vesta", "Volkswagen Polo", "Skoda Octavia", "Ford Focus", "Nissan Almera"];

export default function PublishRoute({ onClose, onPublish }: PublishRouteProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [saving, setSaving] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("Сегодня");
  const [time, setTime] = useState("09:00");
  const [seats, setSeats] = useState(2);
  const [price, setPrice] = useState("");
  const [car, setCar] = useState(CARS[0]);
  const [comment, setComment] = useState("");
  const [published, setPublished] = useState(false);

  const canStep1 = from.trim().length >= 2 && to.trim().length >= 2;
  const canStep2 = date && time && seats > 0;
  const canStep3 = price && parseInt(price) > 0;

  const handlePublish = async () => {
    setSaving(true);
    try {
      const result = await createRoute({
        driver_name: "Александр Громов",
        car,
        from_city: from,
        to_city: to,
        price: parseInt(price),
        seats,
        trip_date: date,
        trip_time: time,
        comment,
      });
      const route: Route = {
        id: `RM-${result.id}`,
        from, to, price: parseInt(price),
        seats, time, date, comment, car,
        status: "active",
      };
      setPublished(true);
      if (onPublish) onPublish(route);
    } finally {
      setSaving(false);
    }
  };

  if (published) {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-in">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "var(--grad-1)" }}
        >
          <Icon name="CheckCircle" size={40} className="text-white" />
        </div>
        <div className="text-center">
          <h3 className="text-white font-bold text-xl">Маршрут опубликован!</h3>
          <p className="text-white/50 text-sm mt-1">
            {from} → {to} • {date} в {time}
          </p>
          <p className="text-white/30 text-xs mt-1">Пассажиры уже видят твой маршрут</p>
        </div>
        <div className="card-glass rounded-2xl p-4 w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Цена</span>
            <span className="text-white font-bold">₽{price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Мест</span>
            <span className="text-white font-bold">{seats}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Автомобиль</span>
            <span className="text-white font-bold">{car}</span>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => { setPublished(false); setStep(1); setFrom(""); setTo(""); setPrice(""); setComment(""); }}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
          >
            Новый маршрут
          </button>
          {onClose && (
            <button onClick={onClose} className="flex-1 btn-gradient py-3 rounded-2xl text-sm font-semibold text-white">
              Готово
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
              style={{
                background: step >= s ? "var(--grad-1)" : "rgba(255,255,255,0.08)",
                color: step >= s ? "white" : "rgba(255,255,255,0.3)",
              }}
            >
              {step > s ? <Icon name="Check" size={14} /> : s}
            </div>
            {s < 3 && (
              <div
                className="flex-1 h-0.5 rounded-full transition-all duration-300"
                style={{ background: step > s ? "var(--grad-1)" : "rgba(255,255,255,0.08)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Route */}
      {step === 1 && (
        <div className="space-y-3 animate-fade-in">
          <div>
            <p className="text-white font-semibold text-base mb-1">Маршрут</p>
            <p className="text-white/40 text-xs">Откуда и куда едешь?</p>
          </div>
          <CityInput
            value={from}
            onChange={setFrom}
            placeholder="Откуда"
            icon={<div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />}
          />
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            <button
              onClick={() => { const t = from; setFrom(to); setTo(t); }}
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,107,26,0.12)", border: "1px solid rgba(255,107,26,0.2)" }}
            >
              <Icon name="ArrowUpDown" size={13} style={{ color: "#FF6B1A" }} />
            </button>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>
          <CityInput
            value={to}
            onChange={setTo}
            placeholder="Куда"
            icon={<Icon name="MapPin" size={14} style={{ color: "#FF6B1A" }} />}
          />
          <button
            onClick={() => setStep(2)}
            disabled={!canStep1}
            className="btn-gradient w-full py-3 rounded-2xl text-white font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Далее
          </button>
        </div>
      )}

      {/* Step 2 — Date / time / seats */}
      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <p className="text-white font-semibold text-base mb-1">Дата и время</p>
            <p className="text-white/40 text-xs">{from} → {to}</p>
          </div>

          <div>
            <p className="text-white/50 text-xs mb-2">Дата отправления</p>
            <div className="flex gap-2">
              {DATES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDate(d)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: date === d ? "var(--grad-1)" : "rgba(255,255,255,0.06)",
                    color: date === d ? "white" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/50 text-xs mb-2">Время отправления</p>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
              <Icon name="Clock" size={15} className="text-white/40" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none text-sm"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>

          <div>
            <p className="text-white/50 text-xs mb-2">Количество мест для пассажиров</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all hover:bg-white/10"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)" }}
              >
                −
              </button>
              <div className="flex-1 text-center">
                <p className="text-white font-bold text-3xl">{seats}</p>
                <p className="text-white/30 text-xs">{seats === 1 ? "место" : seats <= 4 ? "места" : "мест"}</p>
              </div>
              <button
                onClick={() => setSeats(Math.min(7, seats + 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all hover:bg-white/10"
                style={{ background: "var(--grad-1)", color: "white" }}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-2xl text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
            >
              Назад
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!canStep2}
              className="btn-gradient flex-1 py-3 rounded-2xl text-white font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Далее
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Price / car / comment */}
      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <p className="text-white font-semibold text-base mb-1">Цена и детали</p>
            <p className="text-white/40 text-xs">{from} → {to} • {date} в {time}</p>
          </div>

          <div>
            <p className="text-white/50 text-xs mb-2">Цена за одного пассажира</p>
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3">
              <span className="text-white/50 font-semibold">₽</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Например 1 200"
                className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-sm font-semibold"
              />
            </div>
            {price && parseInt(price) > 0 && (
              <p className="text-xs mt-1" style={{ color: "#4ADE80" }}>
                Итого с {seats} пассажиров: ₽{(parseInt(price) * seats).toLocaleString("ru")}
              </p>
            )}
          </div>

          <div>
            <p className="text-white/50 text-xs mb-2">Автомобиль</p>
            <div className="grid grid-cols-2 gap-2">
              {CARS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCar(c)}
                  className="py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-all"
                  style={{
                    background: car === c ? "rgba(255,107,26,0.2)" : "rgba(255,255,255,0.04)",
                    color: car === c ? "#FF6B1A" : "rgba(255,255,255,0.5)",
                    border: car === c ? "1px solid rgba(255,107,26,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/50 text-xs mb-2">Комментарий (необязательно)</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Например: беру только с багажом, некурящих"
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none resize-none focus:border-orange-500/40"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-2xl text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
            >
              Назад
            </button>
            <button
              onClick={handlePublish}
              disabled={!canStep3 || saving}
              className="btn-gradient flex-1 py-3 rounded-2xl text-white font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Публикуем...
                </>
              ) : "Опубликовать"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}