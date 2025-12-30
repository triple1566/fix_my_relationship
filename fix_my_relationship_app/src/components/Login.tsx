import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axios/api";
import { useState } from "react";

const Login = () => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getServerState() {
    const res = await api.get("/");
    return res.data;
  }

  interface loginInfo {
    UserEmail: string;
    UserPassword: string;
  }

  async function getJwtToken(data: loginInfo) {
    const res = await api.post("/login", data);
    return res.data;
  }

  const serverState = useQuery({
    queryKey: ["ServerState"],
    queryFn: getServerState,
  });

  const jwtToken = useMutation({
    mutationFn: getJwtToken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jwt"] });
    },
  });

  console.log("Server state is now: " + serverState.data?.ServerState);

  if (serverState.isLoading) {
    return <div>Loading server status...</div>;
  }

  if (serverState.isError || !serverState.data?.ServerState) {
    return <div>Server is unavailable right now.</div>;
  }

  return (
    <>
      {serverState.data?.ServerState === "true" ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <h1>
              FOR DEBUGGING! server running is: {serverState.data?.ServerState}
            </h1>
            <h1>FOR DEBUGGING! jwtToken is: {jwtToken.data?.jwt}</h1>
            <CardDescription>
              Log in and start fixing your dating life
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              onClick={() =>
                jwtToken.mutate({ UserEmail: email, UserPassword: password })
              }
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default Login;
