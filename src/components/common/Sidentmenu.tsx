// src/components/layout/MenuList.ts
import {
  LayoutDashboard,
  Users,
  MessageSquareWarning,
  BarChart2,
  ShieldCheck,
  PlusSquare,
  FilePlus,
} from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
export function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 256"
      className={className}
    >
      <g fill="currentColor">
        <path
          d="M152 128a24 24 0 1 1-24-24a24 24 0 0 1 24 24"
          opacity=".2"
        ></path>
        <path d="M200 152a31.84 31.84 0 0 0-19.53 6.68l-23.11-18A31.65 31.65 0 0 0 160 128c0-.74 0-1.48-.08-2.21l13.23-4.41A32 32 0 1 0 168 104c0 .74 0 1.48.08 2.21l-13.23 4.41A32 32 0 0 0 128 96a32.6 32.6 0 0 0-5.27.44L115.89 81A32 32 0 1 0 96 88a32.6 32.6 0 0 0 5.27-.44l6.84 15.4a31.92 31.92 0 0 0-8.57 39.64l-25.71 22.84a32.06 32.06 0 1 0 10.63 12l25.71-22.84a31.91 31.91 0 0 0 37.36-1.24l23.11 18A31.65 31.65 0 0 0 168 184a32 32 0 1 0 32-32m0-64a16 16 0 1 1-16 16a16 16 0 0 1 16-16M80 56a16 16 0 1 1 16 16a16 16 0 0 1-16-16M56 208a16 16 0 1 1 16-16a16 16 0 0 1-16 16m56-80a16 16 0 1 1 16 16a16 16 0 0 1-16-16m88 72a16 16 0 1 1 16-16a16 16 0 0 1-16 16"></path>
      </g>
    </svg>
  );
}
export function ContestIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 256"
      className={className}
    >
      <g fill="currentColor">
        <path
          d="M176 56a24 24 0 1 1-24-24a24 24 0 0 1 24 24"
          opacity=".2"
        ></path>
        <path d="M152 88a32 32 0 1 0-32-32a32 32 0 0 0 32 32m0-48a16 16 0 1 1-16 16a16 16 0 0 1 16-16m67.31 100.68c-.61.28-7.49 3.28-19.67 3.28c-13.85 0-34.55-3.88-60.69-20a169.3 169.3 0 0 1-15.41 32.34a104.3 104.3 0 0 1 31.31 15.81C173.92 186.65 184 207.35 184 232a8 8 0 0 1-16 0c0-41.7-34.69-56.71-54.14-61.85c-.55.7-1.12 1.41-1.69 2.1c-19.64 23.8-44.25 36.18-71.63 36.18a92 92 0 0 1-9.34-.43a8 8 0 0 1 1.6-16c25.92 2.59 48.47-7.49 67-30c12.49-15.14 21-33.61 25.25-47c-38.92-22.66-63.78-3.37-64.05-3.16a8 8 0 1 1-10-12.48c1.5-1.2 37.22-29 89.51 6.57c45.47 30.91 71.93 20.31 72.18 20.19a8 8 0 1 1 6.63 14.56Z"></path>
      </g>
    </svg>
  );
}

export const menuList: NavGroup[] = [
  {
    title: "Manage",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Questions",
        path: "/dashboard/questions",
        icon: QuestionIcon, // Use custom icon
      },
      {
        title: "Contests",
        path: "/dashboard/contest",
        icon: ContestIcon, // Use custom icon
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: Users,
      },
    ],
  },
  {
    title: "Create",
    items: [
      {
        title: "Add Contest",
        path: "/dashboard/addcontest",
        icon: PlusSquare,
      },
      {
        title: "Add Question",
        path: "/dashboard/addquestion",
        icon: FilePlus,
      },
    ],
  },
  {
    title: "Insights",
    items: [
      {
        title: "Analytics",
        path: "/dashboard/analytics",
        icon: BarChart2,
      },
      {
        title: "Feedback",
        path: "/dashboard/feedback",
        icon: MessageSquareWarning,
      },
      {
        title: "Approve Admins",
        path: "/dashboard/admins",
        icon: ShieldCheck,
      },
    ],
  },
];
