export const MenuListItems: {
  id: number;
  title: string;
  icon: JSX.Element;
  path: string;
}[] = [
  {
    id: 0,
    title: "Home",
    path: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="mr-4 h-5 w-5 align-middle"
        width="1.5em"
        height="1.5em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3zm5 15h-2v-6H9v6H7v-7.81l5-4.5l5 4.5z"
        ></path>
        <path
          fill="currentColor"
          d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z"
          opacity=".3"
        ></path>
      </svg>
    ),
  },
  {
    id: 1,
    title: "Questions",
    path: "/dashboard/questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="mr-4 h-5 w-5 align-middle"
        width="1.5em"
        height="1.5em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 256"
      >
        <g fill="currentColor">
          <path
            d="M152 128a24 24 0 1 1-24-24a24 24 0 0 1 24 24"
            opacity=".2"
          ></path>
          <path d="M200 152a31.84 31.84 0 0 0-19.53 6.68l-23.11-18A31.65 31.65 0 0 0 160 128c0-.74 0-1.48-.08-2.21l13.23-4.41A32 32 0 1 0 168 104c0 .74 0 1.48.08 2.21l-13.23 4.41A32 32 0 0 0 128 96a32.6 32.6 0 0 0-5.27.44L115.89 81A32 32 0 1 0 96 88a32.6 32.6 0 0 0 5.27-.44l6.84 15.4a31.92 31.92 0 0 0-8.57 39.64l-25.71 22.84a32.06 32.06 0 1 0 10.63 12l25.71-22.84a31.91 31.91 0 0 0 37.36-1.24l23.11 18A31.65 31.65 0 0 0 168 184a32 32 0 1 0 32-32m0-64a16 16 0 1 1-16 16a16 16 0 0 1 16-16M80 56a16 16 0 1 1 16 16a16 16 0 0 1-16-16M56 208a16 16 0 1 1 16-16a16 16 0 0 1-16 16m56-80a16 16 0 1 1 16 16a16 16 0 0 1-16-16m88 72a16 16 0 1 1 16-16a16 16 0 0 1-16 16"></path>
        </g>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Contests",
    path: "/dashboard/contest",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="mr-4 h-5 w-5 align-middle"
        width="1.5em"
        height="1.5em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 256"
        style={{ fill: "currentColor" }} // Use style for any specific styles you need
      >
        <g fill="currentColor">
          <path
            d="M176 56a24 24 0 1 1-24-24a24 24 0 0 1 24 24"
            opacity=".2"
          ></path>
          <path d="M152 88a32 32 0 1 0-32-32a32 32 0 0 0 32 32m0-48a16 16 0 1 1-16 16a16 16 0 0 1 16-16m67.31 100.68c-.61.28-7.49 3.28-19.67 3.28c-13.85 0-34.55-3.88-60.69-20a169.3 169.3 0 0 1-15.41 32.34a104.3 104.3 0 0 1 31.31 15.81C173.92 186.65 184 207.35 184 232a8 8 0 0 1-16 0c0-41.7-34.69-56.71-54.14-61.85c-.55.7-1.12 1.41-1.69 2.1c-19.64 23.8-44.25 36.18-71.63 36.18a92 92 0 0 1-9.34-.43a8 8 0 0 1 1.6-16c25.92 2.59 48.47-7.49 67-30c12.49-15.14 21-33.61 25.25-47c-38.92-22.66-63.78-3.37-64.05-3.16a8 8 0 1 1-10-12.48c1.5-1.2 37.22-29 89.51 6.57c45.47 30.91 71.93 20.31 72.18 20.19a8 8 0 1 1 6.63 14.56Z"></path>
        </g>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Users",
    path: "/dashboard/users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="mr-4 h-5 w-5 align-middle"
        width="1.5em"
        height="1.5em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        style={{ fill: "currentColor" }} // Use style for any specific styles you need
      >
        <circle cx="12" cy="6" r="4" fill="currentColor"></circle>
        <path
          fill="currentColor"
          d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
          opacity=".5"
        ></path>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Approve Admin",
    path: "/dashboard/admins",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="mr-4 h-5 w-5 align-middle"
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Add Contest",
    path: "/dashboard/addcontest",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="mr-4 h-5 w-5 align-middle"
        width="1.5em"
        height="1.5em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 48 48"
        style={{ fill: "currentColor" }} // Use style for any specific styles you need
      >
        <defs>
          <mask id="iconify-react-754">
            <g
              fill="none"
              stroke="#fff"
              stroke-linejoin="round"
              stroke-width="4"
            >
              <rect
                width="36"
                height="36"
                x="6"
                y="6"
                fill="#555"
                rx="3"
              ></rect>
              <path stroke-linecap="round" d="M24 16v16m-8-8h16"></path>
            </g>
          </mask>
        </defs>
        <path
          fill="currentColor"
          d="M0 0h48v48H0z"
          mask="url(#iconify-react-754)"
        ></path>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Add Question",
    path: "/dashboard/addquestion",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="mr-4 h-5 w-5 align-middle"
        width="1.5em"
        height="1.5em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 48 48"
        style={{ fill: "currentColor" }} // Use style for any specific styles you need
      >
        <defs>
          <mask id="iconify-react-754">
            <g
              fill="none"
              stroke="#fff"
              stroke-linejoin="round"
              stroke-width="4"
            >
              <rect
                width="36"
                height="36"
                x="6"
                y="6"
                fill="#555"
                rx="3"
              ></rect>
              <path stroke-linecap="round" d="M24 16v16m-8-8h16"></path>
            </g>
          </mask>
        </defs>
        <path
          fill="currentColor"
          d="M0 0h48v48H0z"
          mask="url(#iconify-react-754)"
        ></path>
      </svg>
    ),
  },
];
