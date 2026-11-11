
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: 0,
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
      await api.post("/products/add", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      alert("Product added successfully!");
      navigate("/admin/products");
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
          Add Product
        </h2>

        {msg && (
          <p className="text-red-500 mb-4">{msg}</p>
        )}

        <form onSubmit={handleSubmit}>
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              type={
                key === "price" || key === "stock"
                  ? "number"
                  : "text"
              }
              value={form[key]}
              onChange={handleChange}
              placeholder={key}
              required={key !== "description" && key !== "image"}
              className="w-full p-2 mb-4 border rounded"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
