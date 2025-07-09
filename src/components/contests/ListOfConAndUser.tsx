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
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContests } from "@/lib/utils";
import ErrorComponent, { Loading } from "../common/Stauts";
import { Rank } from "@/types/contestTypes";
import { useEffect, useState } from "react";
import { getRankings } from "@/services/contestServices";

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
    return <div className="">Error</div>;
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
const StyledBadge = styled(Badge)(({}) => ({
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
// Minimal Skeleton component (if shadcn/ui Skeleton is not available)

export function Rankings({}) {
  const [ranking, setRanking] = useState<Rank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await getRankings();
        console.log("Ranking data:", res);
        setRanking(res);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorComponent />;
  }
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
          <ListItem key={user.telegram_id}>
            <ListItemAvatar>
              <StyledBadge
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                color="primary"
                badgeContent={user.rank}
              >
                <Avatar>
                  {/* If you have user.img, use it. Otherwise, fallback to initials or a default. */}
                  {user.imgurl ? (
                    <img
                      src={user.imgurl}
                      alt={user.name}
                      style={{ objectFit: "contain" }}
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    user.name?.[0] || "U"
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
              primary={`#${user.rank} ${user.name}`}
              secondary={`Points: ${user.total_points}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
