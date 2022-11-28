import { useState } from "react";
import http from "../../util/http";
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
import { useNavigate } from "react-router-dom";

export const PasswordInput = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (e: any) => void;
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input type={show ? "text" : "password"} onChange={onChange} />
        <InputRightElement
          onClick={handleShow}
          children={
            show ? (
              <RiEyeCloseLine cursor="pointer" />
            ) : (
              <RiEyeLine cursor="pointer" />
            )
          }
        />
      </InputGroup>
    </FormControl>
  );
};

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const data = {
      name,
      username,
      email,
      password,
      confirm_password: confirmPassword,
    };
    try {
      const response = await http.post("/auth/register", data);
      localStorage.setItem("token", response.data.data.token);
      navigate("/");
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  return (
    <Center>
      <Stack>
        <form onSubmit={handleRegister}>
          <Flex direction="column" w="360px" gap="3" pt="10">
            <Heading textAlign="center">Binotify</Heading>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <PasswordInput
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              label="ConfirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Flex>
          <Text fontStyle="italic" fontSize="sm">
            Already have an account?{" "}
            <Link color="blue" href="/login">
              Log In
            </Link>
          </Text>
          <Button colorScheme="teal" mt="2" type="submit">
            Register
          </Button>
        </form>
      </Stack>
    </Center>
  );
};

export default Register;
