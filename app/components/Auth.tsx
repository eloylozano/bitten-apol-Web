import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface AuthFormProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthForm = ({ setIsLoggedIn }: AuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const data = isRegister
        ? { firstName, lastName, email, password }
        : { email, password };

      const response = await axios.post(url, data);

      const { token, user } = response.data;

      localStorage.setItem("token", token); // Guarda el token en localStorage
      setIsLoggedIn(true);
      router.push("/account"); // Redirige a la página de cuenta
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isRegister ? "Register" : "Login"}</button>
      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </form>
  );
};

export default AuthForm;
