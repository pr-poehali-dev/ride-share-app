const BASE = "https://functions.poehali.dev/babdcb91-34fd-4ed0-82ab-1087d771a19a";

export interface Route {
  id: number;
  driver: string;
  car: string;
  from: string;
  to: string;
  price: number;
  seats: number;
  date: string;
  time: string;
  comment: string;
  rating: number;
}

export async function fetchRoutes(from?: string, to?: string): Promise<Route[]> {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  const res = await fetch(`${BASE}?${params.toString()}`);
  const data = await res.json();
  return data.routes ?? [];
}

export async function createRoute(payload: {
  driver_name: string;
  car: string;
  from_city: string;
  to_city: string;
  price: number;
  seats: number;
  trip_date: string;
  trip_time: string;
  comment: string;
}): Promise<{ id: number; ok: boolean }> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteRoute(id: number): Promise<void> {
  await fetch(`${BASE}?id=${id}`, { method: "DELETE" });
}
