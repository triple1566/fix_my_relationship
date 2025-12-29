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
import { useQuery } from "@tanstack/react-query";
import { api } from "./axios/api";

const Login = () => {
  async function getServerState() {
    const res = await api.get("/");
    return res.data;
  }

  const serverState = useQuery({
    queryKey: ["ServerState"],
    queryFn: getServerState,
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
                    placeholder="m@example.com"
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
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
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
