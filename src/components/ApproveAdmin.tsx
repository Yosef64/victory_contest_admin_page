import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Eror, { Loading } from "@/components/common/Stauts";
import { Admin } from "@/types/models";
import { approveAdmin, getAllAdmins } from "@/lib/utils";

const headers = ["Name", "Email", "password", "status"];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function ApproveAdmin() {
  const [admins, setadmins] = useState<Admin[]>([]);
  const [status, setStatus] = useState("pending");
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { admins } = await getAllAdmins();

        setadmins(admins);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };
    fetchAdmins();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{}}>
        <Typography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontSize: 25,
            fontWeight: 700,
            mb: 1,
          }}
        >
          Admins
        </Typography>
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "rgb(145, 158, 171)",
            fontFamily: '"Public Sans", sans-serif',
          }}
        >
          All
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // bgcolor: "gray",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <TextField
          label=""
          placeholder="Search..."
          id="outlined-start-adornment"
          sx={{
            m: 1,
            width: "25ch",
            // height: 20,
            height: 50,

            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "&.Mui-focused fieldset": {
                border: "1px solid gray",
                width: 300,
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.7em"
                      height="0.7em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                      style={{ fill: "currentColor" }}
                    >
                      <path
                        fill="currentColor"
                        d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
                      />
                    </svg>
                  </IconButton>
                </InputAdornment>
              ),
              style: { height: 50 },
            },
          }}
          inputProps={{
            style: { fontFamily: '"Public Sans",sans-serif' },
          }}
        />
      </Box>
      {/* <Box> */}

      <TableContainer
        elevation={0}
        component={Paper}
        sx={{
          flex: 1,
          borderRadius: 3,
          width: "99%",
        }}
      >
        {status === "success" ? (
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <StyledTableCell
                    key={index}
                    sx={{
                      fontFamily: "'Public Sans',sans-serif",
                      fontSize: "0.9rem",
                    }}
                    align={header == "Name" ? "left" : "right"}
                  >
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((row, index) => (
                <Row key={index} student={row} />
              ))}
            </TableBody>
          </Table>
        ) : status === "pending" ? (
          <Loading />
        ) : (
          <Eror />
        )}
      </TableContainer>
      {/* </Box> */}
    </Box>
  );
}

function Row({ student }: { student: Admin }) {
  const [approved, setApproved] = useState(false);
  const handleApprove = async () => {
    try {
      await approveAdmin(student.email, { isApproved: true });
      setApproved(true);
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <StyledTableRow
        sx={{
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f7f7f5" },
        }}
      >
        {/* <TableCell>
          
        </TableCell> */}

        <StyledTableCell
          // component="th"
          scope="row"
          align="right"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <IconButton aria-label="expand row" size="small">
              <Avatar src={student.imgurl} />
            </IconButton>
            <Typography sx={{ fontFamily: "'Public Sans',sans-serif" }}>
              {student.name}
            </Typography>
          </Box>
        </StyledTableCell>
        <StyledTableCell align="right">
          <div>
            <p>{student.email}</p>
          </div>
        </StyledTableCell>
        <StyledTableCell align="right">
          <div>
            <p>{student.password}</p>
          </div>
        </StyledTableCell>
        <StyledTableCell
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
          align="right"
        >
          {student.isApproved || approved ? (
            "Approved"
          ) : (
            <div>
              <button onClick={handleApprove}>Not approved</button>
            </div>
          )}
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}
