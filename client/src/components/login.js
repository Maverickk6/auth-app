import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as ReachLink,
} from "react-router-dom";
import Axios from "axios";
import Register from "./register";

export default function Login() {
  const [passwordreg, setPasswordreg] = useState("");
  const [emailreg, setEmailreg] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: emailreg,
      password: passwordreg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <Router>
      <Flex align="center" justify="center">
        <Box textAlign="center">
          <Heading>Sign In to Your Account</Heading>

          <form>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmailreg(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPasswordreg(e.target.value);
                }}
                placeholder="Enter Your Password"
              />
            </FormControl>
            <Box>
              <Text mt={4}>
                {" "}
                Dont have an account ?{" "}
                <Link as={ReachLink} to="/register">
                  Register with us
                </Link>
              </Text>
            </Box>
            <Button mt={5} onClick={login}>
              Sign In
            </Button>
          </form>
        </Box>
      </Flex>
      <Switch>
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );

 
}
