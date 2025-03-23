import { CircularProgress } from "@mui/material";

export default function Eror() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-2">
        <p>Somthing went wrong</p>
        <button className="bg-red-500 text-white rounded-lg px-5 font-sans">
          Refresh
        </button>
      </div>
    </div>
  );
}
export function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircularProgress sx={{ color: "green" }} />
    </div>
  );
}
