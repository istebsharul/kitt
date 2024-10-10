"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateProps {
    labelValue: string;
    date: Date | undefined; // Accept date as a prop
    setDate: (date: Date | undefined) => void; // Accept setDate as a prop
}

export function DatePickerDemo({ labelValue, date, setDate }: DateProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        `relative w-full h-full flex flex-col items-start text-md text-gray-600 ${date ? 'justify-end' : ''} text-left font-normal px-4 py-[0.6rem]`,
                        !date && "text-muted-foreground"
                    )}
                >
                    {/* Animated Label */}
                    <label
                        className={cn(
                            "absolute transition-all duration-300 ease-in-out text-gray-500 z-10",
                            date ? "text-xs top-2 left-10" : "text-md top-[1.2rem] left-10"
                        )}
                    >
                        {labelValue}
                    </label>
                    <div className="flex items-center">
                        <CalendarIcon className={`absolute ${date ? "top-[2.2rem]" : "top-[1.4rem]"} mr-2 h-4 w-4 text-gray-300`} />
                        <div className={`absolute left-10 top-8 text-gray-700 `}>{date && format(date, "dd/MM/yyyy")}</div>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate} // Pass the selected date back
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}