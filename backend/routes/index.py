"""
API для маршрутов поездок: получение, создание, удаление (v2).
"""
import json
import os
import psycopg2

SCHEMA = "t_p74916045_ride_share_app"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    # GET /routes — список маршрутов (с фильтрацией)
    if method == "GET":
        from_city = params.get("from", "").strip()
        to_city = params.get("to", "").strip()

        conn = get_conn()
        cur = conn.cursor()

        conditions = ["status = 'active'"]
        values = []

        if from_city:
            conditions.append("LOWER(from_city) LIKE LOWER(%s)")
            values.append(f"%{from_city}%")
        if to_city:
            conditions.append("LOWER(to_city) LIKE LOWER(%s)")
            values.append(f"%{to_city}%")

        where = " AND ".join(conditions)
        cur.execute(
            f"SELECT id, driver_name, car, from_city, to_city, price, seats, trip_date, trip_time, comment, rating, created_at "
            f"FROM {SCHEMA}.routes WHERE {where} ORDER BY created_at DESC LIMIT 50",
            values,
        )
        rows = cur.fetchall()
        conn.close()

        routes = [
            {
                "id": r[0],
                "driver": r[1],
                "car": r[2],
                "from": r[3],
                "to": r[4],
                "price": r[5],
                "seats": r[6],
                "date": r[7],
                "time": r[8],
                "comment": r[9],
                "rating": float(r[10]),
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"routes": routes}, ensure_ascii=False)}

    # POST /routes — создать маршрут
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        required = ["from_city", "to_city", "price", "seats", "trip_date", "trip_time"]
        for field in required:
            if not body.get(field):
                return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": f"Поле {field} обязательно"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.routes (driver_name, car, from_city, to_city, price, seats, trip_date, trip_time, comment) "
            f"VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (
                body.get("driver_name", "Водитель"),
                body.get("car", ""),
                body["from_city"],
                body["to_city"],
                int(body["price"]),
                int(body["seats"]),
                body["trip_date"],
                body["trip_time"],
                body.get("comment", ""),
            ),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {"statusCode": 201, "headers": CORS, "body": json.dumps({"id": new_id, "ok": True})}

    # DELETE /routes?id=123 — снять маршрут
    if method == "DELETE":
        route_id = params.get("id")
        if not route_id:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "id обязателен"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.routes SET status = 'cancelled' WHERE id = %s",
            (int(route_id),),
        )
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": CORS, "body": json.dumps({"error": "Method not allowed"})}