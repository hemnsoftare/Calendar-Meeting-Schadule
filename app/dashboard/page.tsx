import React from "react";
import { notFound } from "next/navigation";
import { requireUser } from "../lib/hook";
import prisma from "../lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmptyState } from "../components/dashboard/EmptyState";
import { ExternalLink, Link2, Pen, Settings, Trash, User2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      userName: true,
      EventType: {
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          url: true,
          videoCallSoftware: true,
          isActive: true,
          eventPrice: true,
          User: {
            select: {
              userName: true,
            },
          },
        },
      },
    },
  });
  if (!data) return notFound();
  return data;
};
const page = async () => {
  const user = await requireUser();
  const data = await getData(user.user?.id || "");
  return (
    <>
      {" "}
      <div className="flex items-center justify-between px-2">
        <div className="sm:grid gap-1 hidden">
          <h1 className="font-heading text-3xl md:text-4xl">Event Types</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage your event types.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">Create New Event</Link>
        </Button>
      </div>
      {data.EventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below."
          buttonText="Add Event Type"
          href="/dashboard/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.EventType.map((event) => (
            <div
              key={event.id}
              className="overflow-hidden shadow rounded-lg relative"
            >
              <div className="absolute top-2 right-2 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size={"icon"}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Event</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/${event.User?.userName}/${event.url}`}>
                        <ExternalLink className="mr-2 size-4" />
                        Preview
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/${event.User?.userName}/${event.url}`}>
                        <Link2 className="mr-2 size-4" />
                        Copy
                      </Link>
                    </DropdownMenuItem>{" "}
                    <DropdownMenuItem>
                      <Link href={`/${event.User?.userName}/${event.url}`}>
                        <Pen className="mr-2 size-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/${event.User?.userName}/${event.url}`}>
                        <Trash className="mr-2 size-4" />
                        Delete
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link href={"/"} className="flex items-center p-5">
                <div className="shrink-0">
                  <User2 className="s0ze-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-muted-foreground">
                      {event.duration} musnise meeting
                    </dt>
                    <dd className="text-lg font-medium">{event.title}</dd>
                  </dl>
                </div>
              </Link>
              <div className="bg-muted px-5 py-2 flex items-center justify-between">
                <Switch />
                <Button> Edit Event</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default page;
