import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent, { Loading } from "../common/Stauts";
import { getContests, getRankings } from "@/services/contestServices";
import { StyledBadge } from "../ui/styled-badge";
import { CalendarIcon, Circle } from "lucide-react";

type ListOfContestProps = {
  grade: { title: string; year: number | JSX.Element }[];
  subject: { title: string; year: number | JSX.Element }[];
};
export function ListOfContest({ grade, subject }: ListOfContestProps) {
  const { data: contests, status } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => await getContests(),
  });
  if (status === "pending") {
    return <Loading />;
  }
  if (status === "error") {
    return <ErrorComponent />;
  }
  const selectedGrades = grade.map((g) => g.title);
  const selectedSubjects = subject.map((s) => s.title);
  const filteredContest = contests.filter((contest) => {
    const gradeMatch =
      selectedGrades.length === 0 || selectedGrades.includes(contest.grade);
    const subjectMatch =
      selectedSubjects.length === 0 ||
      selectedSubjects.includes(contest.subject);
    return gradeMatch && subjectMatch;
  });
  return (
    <Box sx={{}}>
      {filteredContest.map((contest) => {
        return (
          <Link to={`/dashboard/contest/${contest.id}`}>
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
                mb: 2,
              }}
            >
              <CardHeader
                title={contest.title}
                subheader={(() => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const contestDate = contest.date
                    ? new Date(contest.date)
                    : null;
                  let status = "unknown";
                  if (contestDate) {
                    contestDate.setHours(0, 0, 0, 0);
                    status = contestDate >= today ? "active" : "dead";
                  }
                  return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CalendarIcon size={16} style={{ color: "#00AB55" }} />
                        <span
                          style={{
                            fontSize: 14,
                            color: "#637381",
                            fontFamily: '"Public Sans", sans-serif',
                          }}
                        >
                          {contest.date
                            ? new Date(contest.date).toLocaleDateString()
                            : "No date"}
                        </span>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Circle
                          size={12}
                          style={{
                            color: status === "active" ? "#00AB55" : "#FF5630",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 14,
                            color: "#637381",
                            fontFamily: '"Public Sans", sans-serif',
                            textTransform: "capitalize",
                          }}
                        >
                          {status}
                        </span>
                      </Box>
                    </Box>
                  );
                })()}
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
                // Removed the action icons as per your request
                action={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "center",
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

export function Rankings({}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await getRankings();
      // getRankings returns { rankings: Rank[] }
      return res.leaderboard;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }
  const ranking = data || [];
  return (
    <div className="p-2 rounded-md bg-white">
      <div>
        <p className="font-public-sans font-bold text-lg">Ranking</p>
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
          There are {ranking.length} users with ratings
        </Typography>
      </div>
      <List>
        {ranking.map((user) => (
          <ListItem key={user.user_id}>
            <ListItemAvatar>
              <StyledBadge
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                color="primary"
                badgeContent={user.rank}
              >
                <Avatar>
                  {user.imgurl ? (
                    <img
                      src={user.imgurl}
                      alt={user.user_name}
                      style={{ objectFit: "contain" }}
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    user.user_name?.[0] || "U"
                  )}
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
              primary={`${user.user_name}`}
              secondary={`Points: ${user.score}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
