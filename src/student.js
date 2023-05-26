import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function BasicTable() {
  const [studentData, setStudentData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [gender, setGender] = useState("");
  const [mark, setMark] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const getStudents = async () => {
    const studentdata = await axios.get(
      `http://localhost:8080/api/student/getallstudent/?page=${page}&gender=${gender}&totalMark=${mark}&searchValue=${searchValue}`
    );
    setStudentData(studentdata.data.results);
    setTotalPage(studentdata.data.totalPages);
    console.log(studentdata.data);
  };
  useEffect(() => {
    getStudents();
  }, [page, gender, mark, searchValue]);

  const handleReset = () => {
    setGender("");
    setMark("");
  };
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };
  console.log("SearchValue", searchValue);
  console.log("gender", gender);
  console.log("mark", mark);
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginTop: "2rem",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter the name here"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => handleChangeSearch(e)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              {/* <SearchIcon /> */}
            </IconButton>
            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              {/* <DirectionsIcon /> */}
            </IconButton>
          </Paper>
          <div>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{ minWidth: "100px", marginLeft: "1rem" }}
            >
              Reset
            </Button>
          </div>
          <div>
            <TextField
              id="outlined-select-gender"
              select
              label="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ minWidth: "100px", marginLeft: "1rem" }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </div>
          <div>
            <TextField
              id="outlined-select-gender"
              width="100px"
              select
              label="Mark Range"
              defaultValue=""
              value={mark}
              onChange={(e) => setMark(e.target.value)}
              sx={{ minWidth: "100px", marginLeft: "1rem" }}
            >
              <MenuItem value="90">90 and above </MenuItem>
              <MenuItem value="89">Below 90</MenuItem>
            </TextField>
          </div>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{ backgroundColor: "Highlight", color: "ActiveCaption" }}
            >
              <TableRow>
                <TableCell>CampusId</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Standard</TableCell>
                <TableCell align="right">TotalMark</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData?.map((row) => (
                <TableRow
                  key={row.campusId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.campusId}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.standard}</TableCell>
                  <TableCell align="right">{row.totalMark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={(event, page) => setPage(parseInt(page))}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
