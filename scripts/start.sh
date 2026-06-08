#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Starting Pre-Legal backend on port 8000..."
cd "$ROOT/backend"
uv run uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
echo $BACKEND_PID > "$ROOT/scripts/.backend.pid"

echo "Starting Pre-Legal frontend on port 3000..."
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$ROOT/scripts/.frontend.pid"

echo ""
echo "  Backend:  http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo "  Login:    http://localhost:3000/login"
echo ""
echo "Run ./scripts/stop.sh to stop both servers."

wait
