import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { ReactNode, useEffect, useState } from "react";

export function AlertDialogBox({
  children,

  handler,
}: {
  children: ReactNode;
  action: string;
  handler: Function;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSave = async (action: string) => {
    setisLoading(true);
    try {
      await handler(action, null, null, null);
      setOpen(false);
    } catch (error) {
      setError(false);
    } finally {
      setisLoading(false);
    }
  };
  console.log(isLoading, error);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            contest and remove from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#00AB55] hover:bg-[#00AB55] text-white font-bold"
            onClick={() => handleSave("delete")}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DialogBox({
  children,
  action,
  handler,
}: {
  children: ReactNode;
  action: string;
  handler: Function;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleTimeSave = async (time: {
    start_time: string;
    end_time: string;
  }) => {
    try {
      await handler(action, time, null, null);
      setOpen(false);
    } catch (error) {
      setError(true);
    } finally {
      setisLoading(false);
    }
  };

  const handleContestAnnounce = async (file: File, message: string) => {
    setisLoading(true);
    try {
      await handler(action, null, null, { file, message });

      setOpen(false);
    } catch (error) {
      setError(true);
    } finally {
      setisLoading(false);
    }
  };
  const handleForClone = async (info: {
    title: string;
    description: string;
  }) => {
    setisLoading(true);
    try {
      await handler(action, null, info, null);
      setOpen(false);
    } catch (error) {
      setError(true);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === "update"
              ? "Update Time"
              : action === "clone"
              ? "Update Info"
              : "Choose Image"}
          </DialogTitle>
          <DialogDescription>
            Make changes here. Click the button when you're done.
          </DialogDescription>
          {error && <div className="">something Went wrong!</div>}
        </DialogHeader>
        {action === "update" ? (
          <DialogContentForUpdateTime
            isLoading={isLoading}
            handleSubmit={handleTimeSave}
          />
        ) : action === "clone" ? (
          <DialogContentForClone
            isLoading={isLoading}
            handleForClone={handleForClone}
          />
        ) : (
          <DialogForAnnounce
            isLoading={isLoading}
            handleContestAnnounce={handleContestAnnounce}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function DialogContentForUpdateTime({
  handleSubmit,
  isLoading,
}: {
  handleSubmit: (time: {
    start_time: string;
    end_time: string;
  }) => Promise<void>;
  isLoading: boolean;
}) {
  const [time, setTime] = useState({ start_time: "", end_time: "" });

  return (
    <>
      <div className="flex space-x-2 items-center justify-center">
        <Input
          onChange={(e) => setTime({ ...time, start_time: e.target.value })}
          id="name"
          placeholder="start time"
          className=""
        />

        <Input
          onChange={(e) => setTime({ ...time, end_time: e.target.value })}
          id="username"
          placeholder="end time"
        />
      </div>

      <DialogFooter>
        <Button
          className="bg-[#00AB55] text-white font-bold hover:bg-[#00AB55]"
          onClick={() => handleSubmit(time)}
        >
          {isLoading ? "Updating" : "Update"}
        </Button>
      </DialogFooter>
    </>
  );
}
function DialogContentForClone({
  handleForClone,
  isLoading,
}: {
  handleForClone: (info: {
    title: string;
    description: string;
  }) => Promise<void>;
  isLoading: boolean;
}) {
  const [info, setInfo] = useState({ title: "", description: "" });
  return (
    <>
      <div className="flex flex-col space-y-2 items-center justify-center">
        <input
          type="text"
          id="company"
          className="bg-gray-50 h-12 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00AB55] focus:border-[#00AB55] block w-full p-2.5 focus:outline-none"
          placeholder="Contest Title"
          onChange={(e) => setInfo({ ...info, title: e.target.value })}
          required
        />

        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#00AB55] focus:border-[#00AB55]  focus:outline-none"
          placeholder="Write descrition..."
          onChange={(e) => setInfo({ ...info, description: e.target.value })}
        ></textarea>
      </div>

      <DialogFooter>
        <Button
          className="bg-[#00AB55] text-white font-bold hover:bg-[#00AB55]"
          disabled={isLoading}
          onClick={() => handleForClone(info)}
        >
          {isLoading ? "Cloning" : "Clone"}
        </Button>
      </DialogFooter>
    </>
  );
}
function DialogForAnnounce({
  handleContestAnnounce,
  isLoading,
}: {
  handleContestAnnounce: (file: File, message: string) => void; // Assuming this is the intended type
  isLoading: boolean;
}) {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (selectedFile) {
      const newUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(newUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={handleFileChange}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
        {previewUrl && (
          <div className="mt-4  flex justify-center">
            <img
              src={previewUrl}
              alt="Selected preview"
              className="w-12 h-12  rounded-full"
            />
          </div>
        )}
      </div>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#00AB55] focus:border-[#00AB55]  focus:outline-none"
        placeholder="Write descrition..."
        onChange={(e) => {
          setMessage(e.target.value), console.log(e.target.value);
        }}
      ></textarea>

      <DialogFooter>
        <Button
          className="bg-[#00AB55] text-white font-bold hover:bg-[#00AB55]"
          disabled={isLoading}
          onClick={() => handleContestAnnounce(file!, message)}
        >
          {isLoading ? "saving" : "Announce"}
        </Button>
      </DialogFooter>
    </>
  );
}
