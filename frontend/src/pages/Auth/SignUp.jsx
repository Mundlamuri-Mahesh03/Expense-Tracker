import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName || !email || !password) {
      setError("Please enter all fields");
    }
    if (!validateEmail(email)) {
      setError("Please enter valid email address");
    }
    if (!password) {
      setError("Please enter the password");
    }
    if (!fullName) {
      setError("Please enter your name");
    }

    setError("");

    // signup

    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt:0 flex flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          {/* <ProfilePhotoSelector /> */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Input
              value={fullName}
              label="Full Name"
              onChange={({ target }) => setFullName(target.value)}
              type="text"
              placeholder="John"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="johndeo@gmail.com"
              type="text"
              label="Email Address"
            />
          </div>
          <div classname="col-span-2">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Min 8 Characters"
              type="password"
              label="Password"
            />
          </div>
          {error && <p className="text-rose-500 text-xs pb-2.5">{error}</p>}
          <button className="btn-primary" type="submit">
            SIGNUP
          </button>
          <p>
            {" "}
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
