import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Contest } from "../models";

interface TimePickerComponentProps {
  timeChangeHandler: (newValue: Dayjs | null) => void; // Specify the type for timeChangeHandler
}
export function TimePickerComponent({
  timeChangeHandler,
}: TimePickerComponentProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        onChange={timeChangeHandler}
        defaultValue={dayjs("2022-04-17T15:30")}
        slotProps={{
          textField: {
            sx: {
              height: 50, // Adjust height as needed
              "& .MuiInputBase-root": {
                height: "95%",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

export function DatePickerDemo({ setContest, contest }: DatePickerDemoProps) {
  return (
    <Popover>
      <PopoverTrigger className="h-[50px]" asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !contest.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {contest.date ? (
            format(new Date(contest.date), "PPP") // Format contest.date for display
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          style={{ fontFamily: "'Public Sans',sans-serif" }}
          mode="single"
          selected={contest.date ? new Date(contest.date) : undefined} // Convert contest.date to Date object
          onSelect={(newValue) => {
            if (!newValue) return;

            console.log(newValue);
            const localDateString = newValue.toLocaleDateString("en-CA");
            console.log("formated", localDateString);
            setContest({ ...contest, date: localDateString });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

interface DatePickerDemoProps {
  contest: Contest;
  setContest: React.Dispatch<React.SetStateAction<Contest>>;
}
