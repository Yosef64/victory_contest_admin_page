import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Contest } from "../models";
import { Link, redirect } from "react-router-dom";

const contests: Contest[] = [
  {
    contest_id: "1344",
    date: new Date(2024, 5, 12),

    total_time: "5",
    title: "Victory Math contest #12",
    description: "somet thing is somethign and you better not to miss it!",
    questions: [],
    grade: "Grade 11",
    subject: "Maths",
  },
];
type GradeProps = {
  grade: { title: string; year: number | JSX.Element }[];
};
export function ListOfContest({ grade }: GradeProps) {
  const filteredContest = contests.filter((contest) => {
    if (grade.length === 0) return true;
    return grade.some((element) => element.title === contest.grade);
  });
  return (
    <Box sx={{}}>
      {filteredContest.map((contest) => {
        return (
          <Link to={`/dashboard/contest/${contest.contest_id}`}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "#EEEDECFF",
                },
                cursor: "pointer",
                bgcolor: "white",
                boxShadow: "0 0 1px #9c9898",
              }}
            >
              <CardHeader
                title={contest.title}
                subheader="Contest Description"
                sx={{
                  "& .MuiCardHeader-title": {
                    fontFamily: "'Public Sans', sans-seri",
                    fontWeight: 700,
                    lineHeight: 1.57143,
                    fontSize: 20,
                    textOverflow: "ellipsis",
                  },
                  "& .MuiCardHeader-subheader": {
                    margin: "0px",
                    lineHeight: 1.57143,
                    fontSize: 15,
                    fontFamily: '"Public Sans", sans-serif',
                    fontWeight: 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "rgb(99, 115, 129)",
                  },
                }}
                action={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip
                      title="Problems"
                      sx={{
                        fontFamily: "'Public Sans',sans-serif",
                        fontWeight: 700,
                        backgroundColor: "black",
                      }}
                    >
                      <IconButton
                        sx={{
                          color: "#00AB55",
                          "&:hover": { backgroundColor: "#00AB5514" },
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="MuiBox-root css-0 iconify iconify--ph"
                          width="0.9em"
                          height="0.9em"
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
                      </IconButton>
                    </Tooltip>

                    <IconButton
                      sx={{
                        color: "#00AB55",
                        "&:hover": { backgroundColor: "#00AB5514" },
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="0.8em"
                        height="0.8em"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g fill="none">
                          <path
                            fill="currentColor"
                            d="M4 4.001h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
                            opacity=".16"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 4H4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M9 15L20 4m-5 0h5v5"
                          ></path>
                        </g>
                      </svg>
                    </IconButton>
                  </Box>
                }
              />
            </Card>
          </Link>
        );
      })}
    </Box>
  );
}

const users = [
  {
    id: 1,
    img: "/assets/leetcode.jpg",
    name: "Yospeh Alemu",
  },
  {
    id: 2,
    img: "/assets/leetcode.jpg",
    name: "Yohannes Maye",
  },
  {
    id: 3,
    img: "/assets/leetcode.jpg",
    name: "Tadese Wered",
  },
  {
    id: 3,
    img: "/assets/leetcode.jpg",
    name: "Tadese Wered",
  },
  {
    id: 3,
    img: "/assets/leetcode.jpg",
    name: "Tadese Wered",
  },
  {
    id: 3,
    img: "/assets/leetcode.jpg",
    name: "Tadese Wered",
  },
];
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 4,
    top: 14,
    border: `1px solid black`,
    backgroundColor: "white",
    padding: "0 4px",
    color: "black",
    fontFamily: "'Public Sans', sans-serif",
    fontWeight: 600,
  },
}));
export function Rankings({}) {
  return (
    <Paper sx={{ backgroundColor: "white", p: 2, borderRadius: 4 }}>
      <Box>
        <Typography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontSize: 19,
            fontWeight: 700,
            lineHeight: 1.55556,
            display: "block",
          }}
        >
          Ranking
        </Typography>
        <Typography
          sx={{
            margin: "4px 0px 0px",
            lineHeight: 1.57143,
            fontSize: 15,
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: 400,
            color: "rgb(99, 115, 129)",
            display: "block",
          }}
        >
          There are 748 users with ratings
        </Typography>
      </Box>
      <List>
        {users.map((user) => {
          return (
            <ListItem>
              <ListItemAvatar>
                <StyledBadge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  color="primary"
                  badgeContent={4}
                >
                  <Avatar>
                    <img
                      src={user.img}
                      alt="Elon Musk"
                      style={{ objectFit: "contain" }}
                      width="100%"
                      height="100%"
                    />
                  </Avatar>
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "'Public Sans', sans-serif",
                  },
                  "& .MuiTypography-body1": {
                    fontWeight: 600,
                    fontSize: 16,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
                primary={user.name}
                secondary="Rating: 4.8/5"
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
