import React, { useState, useEffect } from "react";
import Login from "./components/login";
//import Axios from "axios";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box alignItems="center" px={4}>
      <Login />;
    </Box>
  );
}

export default App;
