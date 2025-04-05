import LineChart_Multiple from "@/components/dashboard/LineChart_Multiple";
import PieChart_Donut from "@/components/dashboard/PieChart_Donut";
import React, { useState, useEffect } from "react";
import { format, addDays, addMonths, addYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SalesSummary from "@/components/dashboard/SalesSummary";
import PieChart_Purchases from "@/components/dashboard/PieChart_Purchases";
import ProfitLoss from "@/components/dashboard/ProfitLoss";
import BestSellingByType from "@/components/dashboard/BestSellingByType";
import CostSummary from "@/components/dashboard/CostSummary";
import OrderSummary from "@/components/dashboard/OrderSummary";
import BestSellingByCat from "@/components/dashboard/BestSellingByCat";
import BestSellers from "@/components/dashboard/BestSellers";

const Dashboard = () => {
  // ตั้งค่าสตาร์ทและเอนด์เดทเริ่มต้นเป็น 1 สัปดาห์ล่าสุด
  const [date, setDate] = useState({
    from: addDays(new Date(), -7), // ตั้งเริ่มต้น 7 วันก่อน
    to: new Date(), // วันที่ปัจจุบัน
  });
  const [groupBy, setGroupBy] = useState("day"); // สถานะสำหรับการเลือก groupBy

  // ฟังก์ชันสำหรับการคำนวณวันที่เริ่มต้นตาม groupBy
  useEffect(() => {
    let startDate;
    if (groupBy === "month") {
      startDate = addMonths(new Date(), -6); // ถ้าเลือกเดือนให้เอาย้อนหลัง 6 เดือน
    } else if (groupBy === "year") {
      startDate = addYears(new Date(), -3); // ถ้าเลือกปีให้เอาย้อนหลัง 3 ปี
    } else {
      startDate = addDays(new Date(), -7); // ถ้าเลือกเป็นวันให้ย้อนกลับไป 7 วัน
    }
    setDate((prevDate) => ({
      from: startDate,
      to: new Date(),
    }));
  }, [groupBy]);

  // ฟังก์ชันสำหรับการเลือกวันที่จากปฏิทิน
  const handleDateSelect = (range) => {
    setDate({
      from: range?.from || addDays(new Date(), -7), // ถ้า `from` ไม่มี ให้ใช้ 7 วันก่อนหน้า
      to: range?.to || range?.from || new Date(), // ถ้า `to` ไม่มี ให้ใช้ `from` หรือวันที่ปัจจุบัน
    });
  };

  // ฟังก์ชันสำหรับการเลือกกลุ่มข้อมูล
  const handleGroupByChange = (value) => {
    setGroupBy(value); // เปลี่ยนค่า groupBy
  };

  return (
    <div className="grid grid-cols-4 gap-3 auto-rows-max ">
      <div className="col-span-4 ">
        <div className="flex gap-2 mx-2 items-center justify-center"> 
          <Select value={groupBy} onValueChange={handleGroupByChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="groupBy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
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
                onSelect={handleDateSelect} // ใช้ฟังก์ชันนี้ในการเลือกวันที่
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="col-span-1 row-span-3 ">
        <BestSellers
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
        />
      </div>
      <div className="col-span-1 row-span-1 ">
        <SalesSummary
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
        />
      </div>
      <div className="col-span-1 row-span-1 ">
        <ProfitLoss
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
        />
      </div>
      <div className="col-span-1 row-span-2 ">
        <PieChart_Purchases
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
        />
      </div>
      <div className="col-span-1 row-span-1 ">
        <CostSummary
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
        />
      </div>
      <div className="col-span-1 row-span-1 ">
        <OrderSummary />
      </div>
      <div className="col-span-2 row-span-3 ">
        <LineChart_Multiple
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
          groupBy={groupBy} // ส่งค่า groupBy ที่เลือกไปให้ Chart
        />
      </div>
      <div className="col-span-1 row-span-3">
        <BestSellingByCat
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
        />
      </div>
      <div className="col-span-1 row-span-2">
        <BestSellingByType
          startDate={format(date.from, "yyyy-MM-dd")}
          endDate={format(date.to, "yyyy-MM-dd")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
