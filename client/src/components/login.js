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
} from "@chakra-ui/react";
import Axios from "axios";

export default function Login() {
  const [passwordreg, setPasswordreg] = useState("");
  const [emailreg, setEmailreg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/login", {
      email: emailreg,
      password: passwordreg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <Flex>
      <Box textAlign="center">
        <Heading>Sign In to Your Account</Heading>
        <Text>At half Price</Text>
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
          <Button mt={5} onClick={register}>
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
