#!/usr/bin/env python3
"""
Check whether the date of one event (default: "Birthday") in ImportantDates.md is in the past.

- Not in the past (today counts as not past): change nothing, output changed=false.
- In the past: move the date one year ahead (and keep adding years while it is still
  in the past), output changed=true, old_date and new_date.

Only the date string on that one line is replaced; everything else in the file
(indentation, line endings, trailing newline or not) is left exactly as it was.

Usage:
  python3 bump_birthday.py <path to ImportantDates.md>

Environment variables:
  EVENT_NAME  Event to check, default "Birthday"
  TIMEZONE    Time zone used to decide what "today" is, default "Europe/Stockholm"
  TODAY       For testing only: override "today" (YYYY-MM-DD)
"""

import datetime as dt
import os
import re
import sys
from zoneinfo import ZoneInfo


def add_years(date: dt.date, years: int) -> dt.date:
    try:
        return date.replace(year=date.year + years)
    except ValueError:
        # February 29 in a non-leap year becomes February 28
        return date.replace(year=date.year + years, day=28)


def set_output(**values: str) -> None:
    output_file = os.environ.get("GITHUB_OUTPUT")
    lines = "".join(f"{key}={value}\n" for key, value in values.items())
    if output_file:
        with open(output_file, "a", encoding="utf-8") as f:
            f.write(lines)
    else:
        print(lines, end="")


def fail(message: str) -> None:
    print(f"::error::{message}")
    sys.exit(1)


def main() -> None:
    if len(sys.argv) != 2:
        fail("Usage: bump_birthday.py <path to ImportantDates.md>")

    path = sys.argv[1]
    event = os.environ.get("EVENT_NAME") or "Birthday"
    timezone = os.environ.get("TIMEZONE") or "Europe/Stockholm"

    if os.environ.get("TODAY"):
        today = dt.date.fromisoformat(os.environ["TODAY"])
    else:
        today = dt.datetime.now(ZoneInfo(timezone)).date()

    with open(path, encoding="utf-8", newline="") as f:
        text = f.read()

    # 1. Find the top-level (non-indented) "- Birthday" line
    head = re.search(rf"^[-*+][ \t]+{re.escape(event)}[ \t]*\r?$", text, re.M)
    if not head:
        fail(f'Top-level event "{event}" not found in {path}')

    # 2. Its child items run until the next non-indented, non-empty line (the next event)
    next_top = re.compile(r"^\S", re.M).search(text, head.end())
    block_end = next_top.start() if next_top else len(text)

    # 3. Find "  - date:: YYYY-MM-DD" among the child items
    date_line = re.compile(
        r"^[ \t]+[-*+][ \t]+date::[ \t]*(\d{4}-\d{2}-\d{2})", re.M
    ).search(text, head.end(), block_end)
    if not date_line:
        fail(f'No "date:: YYYY-MM-DD" line found under "{event}" in {path}')

    old_date = dt.date.fromisoformat(date_line.group(1))

    if old_date >= today:
        print(f"{event} date {old_date} is not in the past (today is {today} in {timezone}). Nothing to do.")
        set_output(changed="false", old_date=old_date.isoformat())
        return

    years = 0
    new_date = old_date
    while new_date < today:
        years += 1
        new_date = add_years(old_date, years)

    text = text[: date_line.start(1)] + new_date.isoformat() + text[date_line.end(1) :]
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text)

    print(f"{event} date {old_date} is in the past (today is {today} in {timezone}). Moved to {new_date}.")
    set_output(changed="true", old_date=old_date.isoformat(), new_date=new_date.isoformat())


if __name__ == "__main__":
    main()
