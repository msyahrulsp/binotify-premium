import { useState } from "react";
import http from "../../util/http";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { PasswordInput } from "./Register";

const Login = () => {
  const navigate = useNavigate();
  const [userCred, setUserCred] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const data = {
      user: userCred,
      password: password,
    };
    try {
      const response = await http.post("/auth/login", data);
      localStorage.setItem("token", response.data.data.token);
      navigate("/");
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <Center>
      <Stack w="370px" px="3">
        <form onSubmit={handleLogin}>
          <Flex direction="column" gap="3" pt="10">
            <Heading textAlign="center">Binotify</Heading>
            <FormControl>
              <FormLabel>Email / Username</FormLabel>
              <Input
                type="text"
                onChange={(e: any) => setUserCred(e.target.value)}
              />
            </FormControl>
            <PasswordInput
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
          <Text fontStyle="italic" fontSize="sm">
            Don't have an account?{" "}
            <Link color="blue" href="/register">
              Register an account
            </Link>
          </Text>
          <Button colorScheme="teal" mt="2" type="submit">
            Login
          </Button>
        </form>
      </Stack>
    </Center>
  );
};

export default Login;
