import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Axios from "axios";

export default function Register() {
  const [passwordreg, setPasswordreg] = useState("");
  const [emailreg, setEmailreg] = useState("");
  const [nameReg, setNamereg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      email: emailreg,
      password: passwordreg,
      name: nameReg,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <Flex align='center' justify='center'>
      <Box 
      textAlign="center"
      px ={4}
      >
        <Heading>Register with Us</Heading>

        <form>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => {
                setNamereg(e.target.value);
              }}
            />
          </FormControl>
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
            Register
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
