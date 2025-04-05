import React, { useState, useEffect } from "react";
import {
  format,
  isSameDay,
  isSameWeek,
  startOfMonth,
  startOfYear,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  subDays,
  addMonths,
  subMonths,
  addYears,
  subYears,
  endOfMonth,
  endOfYear,
  endOfWeek,
} from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getDashProfitLoss } from "@/api/dashProfitLoss";
import useCafeStore from "@/store/cafe-store";
import ShowRevenue from "@/components/dashProfitLoss/ShowRevenue";
import ShowCost from "@/components/dashProfitLoss/ShowCost";
import ShowProfitLoss from "@/components/dashProfitLoss/ShowProfitLoss";
import LineChartProfitLoss from "@/components/dashProfitLoss/LineChartProfitLoss";
import TableRevenue from "@/components/dashProfitLoss/TableRevenue";
import TableCost from "@/components/dashProfitLoss/TableCost";

const isSameRange = (date, rangeType) => {
  const today = new Date();
  if (!date?.from || !date?.to) return false;

  switch (rangeType) {
    case "today":
      return isSameDay(date.from, today) && isSameDay(date.to, today);
    case "week":
      return (
        isSameDay(date.from, startOfWeek(today, { weekStartsOn: 1 })) &&
        isSameDay(date.to, today)
      );
    case "month":
      return (
        isSameDay(date.from, startOfMonth(today)) && isSameDay(date.to, today)
      );
    case "year":
      return (
        isSameDay(date.from, startOfYear(today)) && isSameDay(date.to, today)
      );
    default:
      return false;
  }
};
const DashProfitLoss = () => {
  const token = useCafeStore((s) => s.token);

  const [date, setDate] = useState({ from: new Date(), to: new Date() });
  const [groupBy, setGroupBy] = useState("hour");

  const [dataApi, setDataApi] = useState({});

  const handleDateSelect = (range) => {
    if (range?.from) {
      setDate({
        from: range?.from || new Date(),
        to: range?.to || range?.from || new Date(),
      });
    }
  };

  const handleGroupByChange = (rangeType) => {
    switch (rangeType) {
      case "today":
        setGroupBy("hour");
        break;
      case "week":
        setGroupBy("day");
        break;
      case "month":
        setGroupBy("day");
        break;
      case "year":
        setGroupBy("month");
        break;
      default:
        setGroupBy("hour");
    }
  };

  const adjustDate = (direction) => {
    setDate((prevDate) => {
      let newFrom, newTo;

      switch (groupBy) {
        case "hour": // วันนี้ -> เพิ่ม/ลดวันเดียว
          newFrom =
            direction === "prev"
              ? subDays(prevDate.from, 1)
              : addDays(prevDate.from, 1);
          newTo = newFrom;
          break;

        case "day":
          if (
            isSameDay(
              prevDate.from,
              startOfWeek(prevDate.from, { weekStartsOn: 1 })
            )
          ) {
            // สัปดาห์ -> จันทร์-อาทิตย์
            newFrom =
              direction === "prev"
                ? startOfWeek(subWeeks(prevDate.from, 1), { weekStartsOn: 1 })
                : startOfWeek(addWeeks(prevDate.from, 1), { weekStartsOn: 1 });
            newTo = endOfWeek(newFrom, { weekStartsOn: 1 });
          } else {
            // เดือน -> ต้นเดือน-สิ้นเดือน
            newFrom =
              direction === "prev"
                ? startOfMonth(subMonths(prevDate.from, 1))
                : startOfMonth(addMonths(prevDate.from, 1));
            newTo = endOfMonth(newFrom);
          }
          break;

        case "month": // ปี -> ต้นปี-สิ้นปี
          newFrom =
            direction === "prev"
              ? startOfYear(subYears(prevDate.from, 1))
              : startOfYear(addYears(prevDate.from, 1));
          newTo = endOfYear(newFrom);
          break;

        default:
          return prevDate;
      }

      return { from: newFrom, to: newTo };
    });
  };

  useEffect(() => {
    const startDate = format(date.from, "yyyy-MM-dd");
    const endDate = format(date.to, "yyyy-MM-dd");
    getDashProfitLoss(token, startDate, endDate)
      .then((res) => {
        //console.log(res.data);
        setDataApi(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date, token]);

  return (
    <div>
      <div className="flex justify-between my-2">
        <div className="flex gap-2">
          <Button
            variant={isSameRange(date, "today") ? "default" : "outline"}
            onClick={() => {
              const today = new Date();
              setDate({ from: today, to: today });
              handleGroupByChange("today");
            }}
          >
            วันนี้
          </Button>
          <Button
            variant={isSameRange(date, "week") ? "default" : "outline"}
            onClick={() => {
              const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
              setDate({ from: weekStart, to: new Date() });
              handleGroupByChange("week");
            }}
          >
            สัปดาห์นี้
          </Button>
          <Button
            variant={isSameRange(date, "month") ? "default" : "outline"}
            onClick={() => {
              const startOfThisMonth = startOfMonth(new Date());
              setDate({ from: startOfThisMonth, to: new Date() });
              handleGroupByChange("month");
            }}
          >
            เดือนนี้
          </Button>
          <Button
            variant={isSameRange(date, "year") ? "default" : "outline"}
            onClick={() => {
              const startOfThisYear = startOfYear(new Date());
              setDate({ from: startOfThisYear, to: new Date() });
              handleGroupByChange("year");
            }}
          >
            ปีนี้
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="free" onClick={() => adjustDate("prev")}>
            <ChevronLeft />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date.from || undefined}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="free" onClick={() => adjustDate("next")}>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 auto-rows-max">
        <div>
          <ShowRevenue data={dataApi.totalRevenue} />
        </div>
        <div>
          <ShowCost data={dataApi.totalCost} />
        </div>
        <div>
          <ShowProfitLoss data={dataApi.profitOrLoss} name={dataApi.status} />
        </div>
        <div className="col-span-4">
          <LineChartProfitLoss
            startDate={format(date.from, "yyyy-MM-dd")}
            endDate={format(date.to, "yyyy-MM-dd")}
            groupBy={groupBy}
          />
        </div>
        <div className="col-span-2">
          <TableRevenue
            startDate={format(date.from, "yyyy-MM-dd")}
            endDate={format(date.to, "yyyy-MM-dd")}
          />
        </div>
        <div className="col-span-2">
          <TableCost
            startDate={format(date.from, "yyyy-MM-dd")}
            endDate={format(date.to, "yyyy-MM-dd")}
          />
        </div>
      </div>
    </div>
  );
};

export default DashProfitLoss;
