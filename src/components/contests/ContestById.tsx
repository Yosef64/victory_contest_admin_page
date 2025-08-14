import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Trophy, Clock, Building } from "lucide-react";
import dayjs from "dayjs";

// shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

// Services and utilities
import { getContestById, updateContest, deleteContest, announceContest, cloneContest, testBackendConnection } from "@/services/contestServices";
import { getAllStudents, getGradesAndSchools } from "@/services/studentServices";
import { transformSubmission } from "@/lib/helpers";
import { Student } from "@/types/models";
import { DialogBox } from "../common/DialogBox";
import { UpdateContestDialog } from "./UpdateContestDialog";
import QuestionTable from "../questions/QuestionTable";
import { getSubmissionByContest } from "@/lib/utils";

// Assets
import leetcodeImage from "../../assets/leetcode.jpg";

export default function ContestById() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tabValue, setTabValue] = React.useState(0);
  const [school, setSchool] = useState("all");
  const [city, setCity] = useState("all");
  const [schools, setSchools] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const { id } = useParams();

  const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
  const [updateContestDialogOpen, setUpdateContestDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [announceDialogOpen, setAnnounceDialogOpen] = useState(false);

  const { data: contest, status } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => await getContestById(id!),
  });

  // Debug: Log contest data when it changes
  useEffect(() => {
    if (contest) {
      console.log('Contest data loaded:', contest);
      console.log('Questions count:', contest.questions?.length || 0);
      console.log('Questions:', contest.questions);
    }
  }, [contest]);

  // Test backend connectivity
  useEffect(() => {
    const testConnection = async () => {
      const isConnected = await testBackendConnection();
      if (!isConnected) {
        toast.error("Backend connection failed. Please check if the backend is running.");
      }
    };
    testConnection();
  }, []);

  // Fetch schools and cities from contest-backend-go
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGradesAndSchools();
        setSchools(response.schools || []);
        setCities(response.cities || []);
      } catch (error) {
        console.error("Error fetching schools and cities:", error);
        toast.error("Failed to fetch schools and cities");
      }
    };
    fetchData();
  }, []);

  // Fetch cities from actual contestants in this contest
  useEffect(() => {
    const fetchContestCities = async () => {
      if (contest?.id) {
        try {
          const submissions = await getSubmissionByContest(contest.id);
          const contestantCities = new Set<string>();
          
          // Get unique cities from contestants
          for (const submission of submissions) {
            if (submission.student?.student_id) {
              // Try to find student info to get city
              try {
                const students = await getAllStudents();
                const student = students.find(s => 
                  s.telegram_id === submission.student.student_id || 
                  (s as any).id === submission.student.student_id ||
                  s.name === submission.student.name
                );
                if (student?.city) {
                  contestantCities.add(student.city);
                }
              } catch (error) {
                console.warn("Could not fetch student info for city:", error);
              }
            }
          }
          
          // Update cities with contest-specific cities
          const contestCities = Array.from(contestantCities).filter(city => city && city.trim() !== '');
          if (contestCities.length > 0) {
            setCities(prevCities => {
              const combined = [...new Set([...prevCities, ...contestCities])];
              return combined;
            });
          }
        } catch (error) {
          console.error("Error fetching contest cities:", error);
        }
      }
    };
    
    fetchContestCities();
  }, [contest?.id]);

  const handleSelect = (value: string) => {
    setSchool(value);
  };

  const handleSelectCity = (value: string) => {
    setCity(value);
  };

  const handleDeleteContest = async () => {
    if (!contest) return;
    try {
      await deleteContest(contest.id!);
      toast.success("Contest deleted successfully");
      navigate("/dashboard/contest");
    } catch (error) {
      console.error("Error deleting contest:", error);
      toast.error("Failed to delete contest");
    }
  };

  const handleActionMade = async (
    action: string,
    time?: { start_time: string; end_time: string },
    info?: { title: string; description: string }
  ) => {
    if (!contest) return;

    try {
      if (action === "announce") {
        await announceContest(contest, { file: null, message: "Contest announced!" });
        toast.success("Contest announced successfully");
      } else if (action === "clone") {
        await cloneContest(contest, info!);
        toast.success("Contest cloned successfully");
      } else if (action === "update" && time) {
        await updateContest(contest, {
          start_time: time.start_time,
          end_time: time.end_time,
        });
        toast.success("Contest updated successfully");
      }
      
      // Invalidate and refetch contest data after successful action
      queryClient.invalidateQueries({ queryKey: ["contest", id] });
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
      toast.error(`Failed to ${action} contest`);
    }
  };

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleConfirmDelete = async () => {
    handleCloseDeleteDialog();
    await handleDeleteContest();
  };

  const handleQuestionDeleted = (deletedQuestionId: string) => {
    console.log(deletedQuestionId);
    toast.success("Question deleted successfully");
    queryClient.invalidateQueries({ queryKey: ["contest", id] });
  };

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (status === "error" || !contest) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Contest</h2>
          <p className="text-gray-600">Failed to load contest details. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contest</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contest? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contest Details</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
            <a href="/dashboard/contest" className="hover:text-green-600 transition-colors">
              Contest
            </a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{contest.title}</span>
          </nav>
        </div>

        {/* Contest Info Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {contest.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {contest.description}
                </CardDescription>
              </div>
              <Menubar className="bg-transparent border-none">
                <MenubarMenu>
                  <MenubarTrigger className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="h-5 w-5" />
                  </MenubarTrigger>
                  <MenubarContent className="w-48">
                    <MenubarItem onClick={() => setAnnounceDialogOpen(true)}>
                      Announce Contest
                    </MenubarItem>
                    <MenubarItem onClick={() => setCloneDialogOpen(true)}>
                      Clone Contest
                    </MenubarItem>
                    <MenubarItem onClick={() => setUpdateContestDialogOpen(true)}>
                      Update Contest Details
                    </MenubarItem>
                    <MenubarItem 
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      onClick={handleOpenDeleteDialog}
                    >
                      Delete Contest
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Start Time</p>
                  <p className="text-sm text-gray-600">
                    {contest.start_time ? dayjs(contest.start_time).format("MMM D, YYYY HH:mm") : "Not set"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">End Time</p>
                  <p className="text-sm text-gray-600">
                    {contest.end_time ? dayjs(contest.end_time).format("MMM D, YYYY HH:mm") : "Not set"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Subject</p>
                  <p className="text-sm text-gray-600">{contest.subject || "Not set"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Prize</p>
                  <p className="text-sm text-gray-600">{contest.prize || "Not set"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
            <CardDescription>Filter contestants by school and city</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select School</label>
                <Select onValueChange={handleSelect} value={school}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Schools" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Schools</SelectLabel>
                      <SelectItem value="all">All Schools</SelectItem>
                      {schools.map((schoolName, index) => (
                        <SelectItem key={index} value={schoolName}>
                          {schoolName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select City</label>
                <Select onValueChange={handleSelectCity} value={city}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cities</SelectLabel>
                      <SelectItem value="all">All Cities</SelectItem>
                      {cities.map((cityName, index) => (
                        <SelectItem key={index} value={cityName}>
                          {cityName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={tabValue.toString()} onValueChange={(value) => setTabValue(parseInt(value))} className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="0">Standings</TabsTrigger>
                <TabsTrigger value="1">Problems</TabsTrigger>
              </TabsList>
            </CardHeader>
            <div className="p-6">
              <TabsContent value="0">
                <Standing school={school} city={city} contest={contest} />
              </TabsContent>
              <TabsContent value="1">
                {contest?.questions && contest.questions.length > 0 ? (
                  <QuestionTable
                    questions={contest.questions}
                    onQuestionDeleted={handleQuestionDeleted}
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No questions found for this contest.</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Questions count: {contest?.questions?.length || 0}
                    </p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <DialogBox
        action="announce"
        open={announceDialogOpen}
        onClose={() => setAnnounceDialogOpen(false)}
        handler={handleActionMade}
        contest={contest}
      />
      <DialogBox
        action="clone"
        open={cloneDialogOpen}
        onClose={() => setCloneDialogOpen(false)}
        handler={handleActionMade}
        contest={contest}
      />

      <UpdateContestDialog
        open={updateContestDialogOpen}
        onClose={() => setUpdateContestDialogOpen(false)}
        contest={contest}
        onUpdate={async (contestId, updates) => {
          if (!contest) return;
          try {
            console.log('Before update - Contest questions:', contest.questions);
            console.log('Update data:', updates);
            console.log('Contest ID:', contestId);
            
            // Ensure we're not losing questions during update
            if (contest.questions && contest.questions.length > 0) {
              console.log('Questions exist before update, count:', contest.questions.length);
            } else {
              console.warn('No questions found before update!');
            }
            
            await updateContest(contest, updates);
            
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["contest", id] });
            
            // Wait a bit for the refetch to complete
            setTimeout(() => {
              console.log('After update - Refreshed contest data');
              // Force a refetch to ensure we get the latest data
              queryClient.refetchQueries({ queryKey: ["contest", id] });
            }, 1000);
            
            toast.success("Contest updated successfully");
          } catch (error) {
            console.error('Error updating contest:', error);
            toast.error("Failed to update contest");
            throw error;
          }
        }}
      />
    </div>
  );
}

// Updated tableHeader to include "Time Taken" and "Prize"
const tableHeader = [
  "Rank",
  "Contestant",
  "Solved",
  "Penalty",
  "Time Taken",
  "Prize",
];

interface StandingProps {
  school: string;
  city: string;
  contest?: any;
}

function Standing({ school, city, contest }: StandingProps) {
  const { id } = useParams();
  const [studentsMap, setStudentsMap] = useState<Record<string, Student>>({});

  // Fetch student data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getAllStudents();
        const map = students.reduce((acc: Record<string, Student>, student) => {
          if (student.telegram_id) acc[student.telegram_id] = student;
          if ((student as any).id) acc[(student as any).id as string] = student;
          if (student.name) acc[student.name] = student;
          return acc;
        }, {} as Record<string, Student>);
        setStudentsMap(map);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const { data: submissions = [], status } = useQuery({
    queryKey: ["submissions_by_contest", id],
    queryFn: async () => getSubmissionByContest(id!),
  });

  if (status === "pending") {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading submissions</p>
      </div>
    );
  }

  // Safety: ensure only submissions for this contest id are included
  const contestSubmissions = submissions.filter((s) => s.contest_id === id);
  const rows = transformSubmission(contestSubmissions);

  // compute time taken in minutes based on contest start_time
  let contestStartMs = 0;
  try {
    if (contest?.start_time) {
      const startTimeDate = new Date(contest.start_time);
      if (!isNaN(startTimeDate.getTime())) {
        contestStartMs = startTimeDate.getTime();
      }
    }
  } catch (error) {
    console.warn('Error parsing contest start_time:', error);
    contestStartMs = 0;
  }
  
  const rowsWithTime = rows.map((r) => {
    let submissionMs = 0;
    try {
      if (r.submission_time) {
        const submissionDate = new Date(r.submission_time);
        if (!isNaN(submissionDate.getTime())) {
          submissionMs = submissionDate.getTime();
        }
      }
    } catch (error) {
      console.warn('Error parsing submission_time:', error);
      submissionMs = 0;
    }
    
    const diffMs = submissionMs && contestStartMs ? Math.max(0, submissionMs - contestStartMs) : 0;
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    const time_taken = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return { ...r, time_taken };
  });

  // Filter submissions; if no filters, show all
  const filteredRows = rowsWithTime.filter((row) => {
    if (school === "all" && city === "all") return true;
    const student = studentsMap[row.student_id] || studentsMap[row.name];
    if (!student) return false;
    const matchesSchool = school === "all" || student.school === school;
    const matchesCity = city === "all" || student.city === city;
    return matchesSchool && matchesCity;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeader.map((header, index) => (
                <TableHead
                  key={index}
                  className={
                    header === "Rank" || header === "Contestant"
                      ? "text-left"
                      : "text-right"
                  }
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRowComponent
                key={index}
                rank={{ ...row, index }}
                contestPrize={contest?.prize || "N/A"}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface TableRowProps {
  rank: {
    index: number;
    name: string;
    solved: number;
    penalty: number;
    time_taken?: string;
  };
  contestPrize: string;
}

function TableRowComponent({ rank, contestPrize }: TableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {(() => {
          const suffix =
            rank.index === 0
              ? "st"
              : rank.index === 1
                ? "nd"
                : rank.index === 2
                  ? "rd"
                  : "th";
          return (rank.index + 1).toString() + suffix;
        })()}
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={leetcodeImage} alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="font-medium">{rank.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">{rank.solved}</TableCell>
      <TableCell className="text-right">{rank.penalty}</TableCell>
      <TableCell className="text-right">{rank.time_taken || "N/A"}</TableCell>
      <TableCell className="text-right">{contestPrize}</TableCell>
    </TableRow>
  );
}
