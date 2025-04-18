import { format } from "date-fns";
import React from "react";
import prisma from "../lib/db";
interface iappProps {
  selectedDate: Date;
  userName: string;
  meetingDuration: number;
}

const getData = async (userName: string) => {
  const data = await prisma.availability.findFirst({
    where: {
      day: "Friday",
      User: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      User: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });
  return data;
};

const TimeSlot = ({ selectedDate, userName, meetingDuration }: iappProps) => {
  console.log(selectedDate, userName, meetingDuration);
  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{" "}
        <span className="text-sm from-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
    </div>
  );
};

export default TimeSlot;
