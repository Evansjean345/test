import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../services/account.service";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Loader from "../utils/Loader";

export default function LoginSection() {
  //modal
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    setTimeout(() => {
      setOpen(open);
    }, 5000);
  };
  const handleError = () => setError(!error);
  //auth
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    handleOpen();
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tame-veil-tuna.cyclic.app/user/login",
        formData
      );
      const token = response.data.token;
      const userId = response.data.userId;
      Cookies.set("jwt", token, { expires: 3 });
      login({ userId, token });
      console.log(userId, token);
    } catch (error) {
      console.log(error);
      handleError();
    }
    if (isAuthenticated()) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div class="bg-white">
        <div class="flex justify-center h-screen">
          <div
            class="hidden bg-cover   lg:block lg:w-2/3"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            }}
          >
            <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 class="text-2xl font-bold text-white sm:text-3xl">
                  Connexion
                </h2>

                <p class="max-w-xl mt-3 text-gray-300">
                  Connectez-vous pour accéder à votre compte et passer une
                  commande. Si vous n'avez pas encore de compte, inscrivez-vous
                  gratuitement dès maintenant. Une fois connecté, vous pourrez
                  suivre l'état de votre commande et gérer vos informations
                  personnelles.
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div class="flex-1">
              <div class="text-center">
                <div class="flex justify-center mx-auto">
                  <img
                    class="w-auto h-12 sm:h-16"
                    src="/logo/logo-no-text.png"
                    alt=""
                  />
                </div>

                <p class="mt-3 text-gray-500">
                  Enregistrez vous pour accédez à votre compte
                </p>
              </div>

              <div class="mt-8">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label for="email" class="block mb-2 text-sm text-gray-600">
                      email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="....."
                      value={formData.email}
                      onChange={handleChange}
                      class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div class="mt-6">
                    <div class="flex justify-between mb-2">
                      <label for="password" class="text-sm text-gray-600">
                        Mot de passe
                      </label>
                      {/*
                        <a
                        href="#"
                        class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        oublié
                      </a> */}
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={handleChange}
                      class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  {open ? (
                    <div className="w-96  flex items-center justify-center h-4 px-4 py-8 absolute">
                      <Loader />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      class="w-full mt-6 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#db6013] rounded-lg hover:bg-[#ba571a] focus:outline-none  focus:ring-opacity-50"
                    >
                      Se connceter
                    </button>
                  )}
                </form>

                <p
                  class={
                    open
                      ? "mt-16 text-sm text-center text-gray-400"
                      : "mt-6 text-sm text-center text-gray-400"
                  }
                >
                  Vous n'avez pas de compte{" "}
                  <Link
                    to="/signup"
                    class="text-[#db6013] focus:outline-none focus:underline hover:underline"
                  >
                    S'enregistrer
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* commande refusée*/}
      <Dialog open={error} handler={handleError} size="xl">
        <DialogHeader>Erreur de connexion</DialogHeader>
        <DialogBody divider className="text-bold">
          Le nom d'utilisateur et le mot de passe ne correspondent pas veuillez
          réesayer
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="red" onClick={handleError}>
            <span>Fermer</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
