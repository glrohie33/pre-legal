#!/usr/bin/env bash

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STOPPED=0

stop_pid_file() {
  local pidfile="$1"
  local name="$2"
  if [ -f "$pidfile" ]; then
    PID=$(cat "$pidfile")
    if kill -0 "$PID" 2>/dev/null; then
      kill "$PID"
      echo "Stopped $name (PID $PID)"
      STOPPED=$((STOPPED + 1))
    fi
    rm -f "$pidfile"
  fi
}

stop_pid_file "$ROOT/scripts/.backend.pid"  "backend"
stop_pid_file "$ROOT/scripts/.frontend.pid" "frontend"

if [ $STOPPED -eq 0 ]; then
  echo "No running servers found (PID files missing or processes already stopped)."
fi
