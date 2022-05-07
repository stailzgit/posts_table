import React from "react";
import LoaderSearch from "./Loader";
//MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import BackspaceIcon from "@mui/icons-material/Backspace";
//MUI Components
import {
  IconButton,
  InputBase,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

const Filters = React.memo((props) => {
  console.log("Filters");
  const {
    search,
    onSearchChange,
    resetSearch,
    limit,
    setLimit,
    isPostsLoading,
    isEmptySearch,
  } = props;

  const onResetClick = () => {
    if (search === "") return;
    resetSearch();
  };

  return (
    <div className="filters__wrap">
      {/********** Поиск **********/}
      <Paper
        sx={{
          backgroundColor: "#5A5C66",
          borderRadius: "0px",
          width: "480px",
          minWidth: "240px",
          display: "flex",
        }}
      >
        <InputBase
          value={search}
          onChange={onSearchChange}
          sx={{ ml: 3, color: "#fff", width: "100%" }}
          placeholder="Поиск"
        />
        <IconButton onClick={onResetClick}>
          {isPostsLoading && <LoaderSearch />}
          {!isPostsLoading && search && <BackspaceIcon htmlColor="#ed8282" />}
          {!isPostsLoading && !search && <SearchIcon htmlColor="#fff" />}
        </IconButton>
      </Paper>

      {/********** Количество постов **********/}
      <FormControl
        size="small"
        sx={{
          m: 0.5,
          minWidth: 80,
          position: "relative",
          display: `${isEmptySearch ? "none" : "block"}`,
        }}
      >
        <InputLabel>Показать</InputLabel>
        <Select
          defaultValue={10}
          value={limit}
          id="outlined-read-only-input"
          label="Показать"
          onChange={(event) => setLimit(event.target.value)}
          sx={{ minWidth: 80 }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>Все</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});

export default Filters;
