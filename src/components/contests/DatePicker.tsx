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
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Contest } from "../../types/models";

interface TimePickerComponentProps {
  timeChangeHandler: (newValue: Dayjs | null) => void;
  value?: Dayjs | null;
  format?: string;
}

export function TimePickerComponent({
  timeChangeHandler,
  value,
  format = "hh:mm A",
}: TimePickerComponentProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        onChange={timeChangeHandler}
        value={value}
        format={format}
        ampm={true}
        slotProps={{
          textField: {
            sx: {
              height: 50,
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

interface DatePickerDemoProps {
  contest: Contest;
  setContest: React.Dispatch<React.SetStateAction<Contest>>;
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
            format(new Date(contest.date), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          style={{ fontFamily: "'Public Sans',sans-serif" }}
          mode="single"
          selected={contest.date ? new Date(contest.date) : undefined}
          onSelect={(newValue) => {
            if (!newValue) return;
            const localDateString = newValue.toLocaleDateString("en-CA");
            setContest({ ...contest, date: localDateString });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
