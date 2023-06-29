import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import Model from "./components/Model";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClick = (data) => {
    setLoading(true);
    axios
      .post("http://localhost:8080/form", data)
      .then((res) => {
        setIsopen(true);
        setMessage(res?.data?.message);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setIsopen(true);
      })
      .finally(() => setLoading(false));
    reset({ name: "", register_no: "", githubLink: "" });
  };

  return (
    <Fragment>
      <Model
        isOpen={isOpen}
        setIsopen={setIsopen}
        message={message}
        setMessage={setMessage}
        setError={setError}
        error={error}
      />
      <div className="bg-black/40 min-h-screen p-10">
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit(handleClick)}
            className="dark:text-[#fff]"
          >
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body gap-5">
                <h1 className="card-title justify-center items-center">
                  HomeWork Submittion Form
                </h1>
                <div className="grid gap-3">
                  <label htmlFor="name" className="label">
                    Your Name:
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your Name"
                    className={`input input-sm h-10 ${
                      errors.name
                        ? "border-red-500 dark:border-red-700"
                        : "border-black/50 dark:border-white"
                    } w-full max-w-xs`}
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors?.name?.message}</p>
                  )}
                </div>
                <div className="grid gap-3">
                  <label htmlFor="registerno" className="label">
                    Your Register Number:
                  </label>
                  <input
                    type="number"
                    {...register("register_no", {
                      required: "Register number is required",
                    })}
                    placeholder="Register Number"
                    className={`input input-sm h-10 ${
                      errors.register_no
                        ? "border-red-500 dark:border-red-700"
                        : "border-black/50 dark:border-white"
                    } w-full max-w-xs`}
                  />
                  {errors.register_no && (
                    <p className="text-red-600">
                      {errors?.register_no?.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <label htmlFor="githubLink" className="label">
                    Github Link:
                  </label>
                  <input
                    type="text"
                    {...register("githubLink", {
                      required: "GitHub link is required",
                    })}
                    placeholder="GitHub Link"
                    className={`input input-sm h-10 ${
                      errors.githubLink
                        ? "border-red-500 dark:border-red-700"
                        : "border-black/50 dark:border-white"
                    } w-full max-w-xs`}
                  />
                  {errors.githubLink && (
                    <p className="text-red-600">
                      {errors?.githubLink?.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <label htmlFor="type" className="label">
                    HomeWork Type
                  </label>
                  <select
                    {...register("type", {
                      required: "Type of an Homework is required",
                    })}
                    className={`select ${
                      errors.type
                        ? "border-red-500 dark:border-red-700"
                        : "border-black/50 dark:border-white"
                    }`}
                  >
                    <option value="form">Form</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-600">{errors?.type?.message}</p>
                  )}
                </div>
                {loading ? (
                  <button
                    className="btn disabled:bg-black disabled:cursor-not-allowed"
                    disabled
                  >
                    <BeatLoader color="#fff" />
                  </button>
                ) : (
                  <button className="btn btn-primary">Submit</button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
