import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMsg("");

    try {
      const res = await api.post("/auth/login", form);
      console.log(res,"data");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId",res.data.user.id);
      setMsg("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMsg(
        error.response?.data?.message ||
          "An error occurred. Please try again."
      );
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {msg && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}