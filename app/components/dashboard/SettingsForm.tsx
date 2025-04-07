"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { settingsActions } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "@/app/lib/zodSchemes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { toast } from "sonner";

const SettingsForm = ({
  email,
  fullName,
  profileImage,
}: {
  email: string;
  fullName: string;
  profileImage: string;
}) => {
  const [currentImage, setcurrentImage] = useState(profileImage);
  const [lastResult, action] = useActionState(settingsActions, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldRevalidate: "onBlur",
    shouldValidate: "onBlur",
  });
  const handleDelelteImage = () => {
    setcurrentImage("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-2">
            <Label>Full name</Label>
            <Input
              name={fields.fullname.name}
              defaultValue={fullName}
              placeholder="hemn software"
            />
            <div className="text-red-500 text-sm">{fields.fullname.errors}</div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              name={fields.email.name}
              readOnly
              defaultValue={email}
              placeholder="hemnfarhad14@gmail.com"
            />
            <div className="text-red-500 text-sm">{fields.email.errors}</div>
          </div>
          <div className="grid gap-y-5">
            <Label> Profile Image</Label>
            {currentImage ? (
              <div className="relative size-16">
                <input
                  type="hidden"
                  name={fields.profileImage.name}
                  key={fields.profileImage.key}
                  value={currentImage}
                ></input>
                <Image
                  src={currentImage}
                  alt="Profile Image"
                  width={24}
                  height={24}
                  className="size-16 rounded-full"
                />
                <Button
                  variant={"destructive"}
                  size={"icon"}
                  className="-top-3 rounded-full -right-3 absolute"
                  onClick={handleDelelteImage}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setcurrentImage(res[0].url);
                    toast.success("Image uploaded successfully!");
                  }}
                  endpoint="imageUploader"
                  onUploadError={(error: Error) => {
                    console.error("Upload failed:", error);
                    toast.error("Image upload failed. Please try again.");
                  }}
                ></UploadDropzone>
                <p className="text-red-500 ">{fields.profileImage.errors}</p>
              </>
            )}
          </div>
          <br />
        </CardContent>
        <CardFooter>
          <SubmitButton text="save changes"></SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SettingsForm;
