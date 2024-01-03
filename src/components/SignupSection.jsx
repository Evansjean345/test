import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Loader from "../utils/Loader";

export default function SignupSection() {
  //gestion
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleLoader = () => {
    setLoader(!loader);
    setTimeout(() => {
      setLoader(loader);
    }, 7000);
  };

  const navigate = useNavigate();

  //
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilPic, setProfilPic] = useState("");
  const [profile, setProfile] = useState("");

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Le nom est obligatoire"),
    email: Yup.string()
      .email(`L'adresse email n'est pas valide`)
      .required("L'adresse email est obligatoire"),
    password: Yup.string().required(
      "Le mot de passe doit contenir au moins 4 caractères"
    ),
    isAdmin: Yup.string().required(),
    imgUrl: Yup.mixed().required("l'image est requise"),
  });

  const onChangeFile = (e) => {
    setProfilPic(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProfilPic(file);
    setProfile(url);
  };

  const handleOpen = () => setOpen(!open);
  const handleError = () => setError(!error);

  const changeOnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    for (let i = 0; i < profilPic.length; i++) {
      formData.append(`profilPic`, profilPic[i]);
    }

    setFullname("");
    setEmail("");
    setPassword("");

    axios
      .post("https://tame-veil-tuna.cyclic.app/user/signup", formData)
      .then((res) => {
        console.log(res);
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
        handleError();
      });

    console.log(formData);
    handleLoader();
  };

  return (
    <>
      <section class="bg-white ">
        <div class="flex justify-center min-h-screen">
          <div
            class="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          ></div>

          <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div class="w-full">
              <h1 class="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
                Obtenez Votre Compte Gratuit Dès Maintenant.
              </h1>

              <p class="mt-4 text-gray-500 ">
                Commençons par vous préparer afin que vous puissiez vérifier
                votre compte personnel et commencer à configurer votre profil.
              </p>

              <div class="mt-6">
                <h1 class="text-gray-500 ">Sélectionnez le type de compte</h1>

                <div class="mt-3 md:flex md:items-center md:-mx-2">
                  <button class="flex justify-center w-full px-6 py-3 text-white bg-[#db6013] rounded-lg md:w-auto md:mx-2 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span class="mx-2">administrateur</span>
                  </button>
                  <Link>
                    <button class="flex justify-center w-full px-6 py-3 mt-4 text-[#db6013] border border-[#db6013] rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>

                      <span class="mx-2">client</span>
                    </button>
                  </Link>
                </div>
              </div>
              {/* Formulaire Start */}
              <Formik
                initialValues={{
                  fullname: fullname,
                  email: email,
                  password: password,
                  profilPic: profilPic,
                }}
                validationSchema={validationSchema}
                onSubmit={changeOnClick}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <form
                    class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
                    encType="multipart/form-data"
                    onSubmit={changeOnClick}
                  >
                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 "
                        htmlFor="name"
                        enctype
                      >
                        Prénoms
                      </label>
                      <Field
                        type="text"
                        placeholder="entrez votre nom"
                        name="fulname"
                        value={fullname}
                        onChange={(e) => {
                          setFullname(e.target.value);
                        }}
                        onBlur={handleBlur}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-[#db6013]  focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.name && errors.name && (
                        <div className="w-full border flex  py-1 bg-green-200 text-gray-600 border-green-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 "
                        htmlFor="email"
                      >
                        Adresse mail
                      </label>
                      <Field
                        type="email"
                        placeholder="johnsnow@example.com"
                        name="email"
                        value={email}
                        onBlur={handleBlur}
                        onChange={(e) => setEmail(e.target.value)}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 focus:border-[#db6013]  focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.email && errors.email && (
                        <div className="w-full border flex  py-1 bg-green-200 text-gray-600 border-green-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        class="block mb-2 text-sm text-gray-600 "
                        htmlFor="password"
                      >
                        Mot de passe
                      </label>
                      <Field
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onBlur={handleBlur}
                        onChange={(e) => setPassword(e.target.value)}
                        class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-[#db6013]  focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                      {touched.password && errors.password && (
                        <div className="w-full border flex  py-1 bg-green-200 text-gray-600 border-green-500 px-6 mt-1 rounded-lg text-sm">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <br />

                    {loader ? (
                      <div
                        className="w-72 flex items-center justify-center h-4 px-4 py-8
                      "
                      >
                        {" "}
                        <Loader />
                      </div>
                    ) : (
                      <button
                        class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#db6013] rounded-lg hover:bg-[#db6013] focus:outline-none focus:ring focus:ring-[#db6013] focus:ring-opacity-50"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <span>S'enregistrer </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 rtl:-scale-x-100"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </form>
                )}
              </Formik>
              {/* Formulaire End */}
              <br />
              <br />
              <p
                class={
                  open
                    ? "mt-16 text-sm text-center text-gray-400"
                    : "mt-6 text-sm text-center text-gray-400"
                }
              >
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/login"
                  class="text-[#db6013] focus:outline-none focus:underline hover:underline"
                >
                  Se connecter
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        {/* commande confirmée */}
        <Dialog open={open} handler={handleOpen} size="xl">
          <DialogHeader>Votre Compte a bien été crée avec succès</DialogHeader>
          <DialogBody divider className="text-semibold">
            Nous vous prions de cliquer sur le bouton-ci dessous afin que vous
            puissez vous connecter
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                navigate("/login");
              }}
            >
              <span>se connecter</span>
            </Button>
          </DialogFooter>
        </Dialog>
        {/* commande refusée*/}
        <Dialog open={error} handler={handleError} size="xl">
          <DialogHeader>
            Veuillez remplir tous les champs pour créer un compte
          </DialogHeader>
          <DialogBody divider className="text-bold">
            Notez bien : vous ne pouvez pas utilisé le même nom d'utilisateur ,
            la même addresse mail ou le même numéro de telephone pour deux
            comptes
          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="red" onClick={handleError}>
              <span>Fermer</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </section>
    </>
  );
}
