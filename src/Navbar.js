import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardFooter,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import axios from "axios";
import { AuthContext } from "./services/account.service";

function Navbar() {
  //data
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const { getUserInfo, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, [getUserInfo]);

  useEffect(() => {
    axios
      .get("https://tame-veil-tuna.cyclic.app/entrepot")
      .then((res) => {})
      .catch((err) => console.log(err));
  }, []);

  const handleOpen = () => setOpen(!open);
  const handleOpenTwo = () => setOpenTwo(!open);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://tame-veil-tuna.cyclic.app/entrepot`)
      .then((item) => setData(item.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {};

  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const valid = (
    <Chip
      variant="ghost"
      color="green"
      size="sm"
      value="colis livré"
      icon={
        <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
      }
    />
  );

  const invalid = (
    <Chip
      variant="ghost"
      color="yellow"
      size="sm"
      value="en attente"
      icon={
        <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-yellow-900" />
      }
    />
  );

  return (
    <div className="px-8">
      <div className="flex px-8 mt-8 justify-between flex-nowrap">
        <div className="flex flex-nowrap space-x-4">
          <div className="flex py-1 border cursor-pointer transition-all hover:scale-95 border-[#f6783a] px-3 rounded-3xl text-xs items-center justify-center font-semibold text-[#4d646f] flex-nowrap">
            <img
              alt=""
              className="h-8 w-8"
              src="https://static.vecteezy.com/ti/vecteur-libre/p1/8773843-television-vecteur-de-noix-de-cajou-isole-sur-fond-blanc-television-illustration-graphique-icone-vectoriel.jpg"
            />
            &nbsp; Cajou
          </div>
          <div className="flex py-1 border cursor-pointer transition-all hover:scale-95 border-[#f6783a] px-3 rounded-3xl text-xs items-center justify-center font-semibold text-[#4d646f] flex-nowrap">
            <img
              alt=""
              className="h-5 w-5"
              src="https://cdn-icons-png.flaticon.com/512/5501/5501101.png"
            />
            &nbsp; Cacao
          </div>
          <div className="flex py-1 cursor-pointer transition-all hover:scale-95 border border-[#f6783a] px-3 rounded-3xl text-xs items-center justify-center font-semibold text-[#4d646f] flex-nowrap">
            <img
              alt=""
              className="h-7 w-8"
              src="https://socfin.com/wp-content/uploads/2021/10/SOCFIN_ICONS_HEVEA-150x150-1.png"
            />
            &nbsp; Hévea
          </div>
          <div className="flex py-1 cursor-pointer transition-all hover:scale-95 border border-[#f6783a] px-3 rounded-3xl text-xs items-center justify-center font-semibold text-[#4d646f] flex-nowrap">
            <img
              alt=""
              className="h-5 w-5"
              src="https://cdn-icons-png.flaticon.com/512/4264/4264812.png"
            />
            &nbsp; Karité
          </div>
        </div>
        <div className="flex flex-nowrap  space-x-8">
          <div className="flex px-3 mx-8 rounded-xl cursor-pointer hover:scale-95 transition-all shadow-2xl shadow-[#5075bb] py-1 items-center justify-center bg-blue-700 text-white">
            <img alt="" className="w-8 h-8" src="/images/notification.png" />
            12
          </div>
          <div className="flex mx-8 cursor-pointer hover:scale-95 transition-all items-center justify-center">
            <img
              alt=""
              className="h-6 w-6 rounded-md"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAJ1BMVEXuKDn+/v4AJJYCI5b///3/+//tHizneYRserj+//sAGJQAGZQAFpNx+ERTAAADP0lEQVR4nO2cwXLaQBBEzYrEie3//94YV1C07llpEZpQvby+mBqPDvOqpyWE4GX6VLloWuqIwsev84/fpwydT6fXny95gglMHsvk7ZPJ2ZJJiTTJtOstYcebrU92DgwTmBzIhDyp5X3ekfmkeGuL9+7kMvHcnVwm+GQkJnNohuFZvZB81WOvL2ASM/HNE3wCky2Fl1v/pm1quwMmMRPPPMlj4nttn8dksN0pU9kY+KtnXR9j7c4hGs0nR2iwPDlE+CRmQp4oE3xSizxR4ZOYCXmiTPAJTHqYsDvKBJ/ABCa3i3sFKnwCE5jsZ0KeKBN8ApMeJuyOMsEnMIHJPibkiTLBJzCBye3iXoEKn8Cklwm7o0zwCUxgso8JeaJM8AlMYHK7uLZX4ROY9DJhd5QJPoHJlnhmWEWexEzwCUxgso8JeaJM8AlMepiwO8oEn8AEJvuYkCfKBJ/ABCb7mJAntbinpGJ3YibsjjLBJ6Mwaf8W31Xx7/iV7y3SCpPxfwMTn8Ck1jxKqIrLaoe2jM6k3bLOxDNPcpngE5j0MPHdHTl/tDX1tVz+evsEJjB5LBPPPGnn673y9QlMYPJ4JsZ5Ur69pa3eBq8X2v/x9knpRyCt7WNh8hz32e5l4vuZ1/ag6wjarb67U9IEExXffVPhk5GYTGmCSczEM09ymeCTWu+2TC5pWI0SFjpapOC7O7lM8AlMxmVSjxLNJ1JIfw9VJp55otMuB45Ns6zGLhrJJzCBSQ6TdssgeXKoBvEJTP4DE3ZHmeATmMBkHxPypJb3PaX5sqssFRbiJ/HDgu/urCPYUZgrvp8X5zHxzZNcJt4+6cyTNoKBmBxzjonkuzu5TPAJTGCyjwl5okzwCUyehMl83dVfaLcMkid9TMpqYT7G915BHpOn2p0bmLA7I/mketdbzRUWOr+D4J0nOUzwSczEN0/wiTLJEUxU3hmbI+88yWPi6ZNy1XWUslRVmKKWqlB1wCRm4rk7eUwG+WyU3fnSek7eI1+f5DHxzZM8JvhERZ6Mz2R5ztnuiFveB8uTI5jgE5j0MvHcnfZla7Ow/jzofIyvT2ACk8czMc8TmU3U1zHAs6B5THzf7+Qxsd2dP08d/VLvAhEjAAAAAElFTkSuQmCC"
            />
          </div>
          <div className="flex px-4 py-2 hover:scale-95 transition-all rounded-xl cursor-pointer bg-[#f0f0f0] items-center justify-center text-[#455a64] text-sm font-semibold">
            <div className="bg-[#d7d6d6] px-2 py-1 rounded-md">
              <img src="/images/avatar.png" alt="" className="h-6 w-6" />
            </div>
            &nbsp; &nbsp; {userInfo?.fullname}
          </div>
        </div>
      </div>
      <div className="flex px-8 justify-between flex-nowrap py-8 text-[#455a64] text-sm">
        <div className="flex flex-nowrap space-x-4">
          <span className="hover:text-[#f6783a] cursor-pointer transition-all">
            Tableau de bord
          </span>
          <span>></span>
          <span className="hover:text-[#f6783a] cursor-pointer transition-all">
            Administration
          </span>
        </div>
        <div>
          <Link to="/create">
            <div className="flex w-full font-semibold py-4 px-8 hover:scale-90 transition-all rounded-xl bg-[#fad8c7] text-[#f6783a]  cursor-pointer items-center">
              Créez un entrepot
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-no-wrap">
        {/* Sidebar starts */}
        {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
        <div className="w-80 rounded-t-xl absolute sm:relative bg-[#f2f0f0] shadow h-[300vh] flex-col justify-between hidden sm:flex">
          <div className="px-8 py-8">
            <ul className="">
              <Link to="/">
                <li className="flex w-full justify-between font-semibold py-4 px-2 rounded-xl bg-[#fad8c7] text-[#f6783a]  cursor-pointer items-center mb-8">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-grid"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <rect x={4} y={4} width={6} height={6} rx={1} />
                      <rect x={14} y={4} width={6} height={6} rx={1} />
                      <rect x={4} y={14} width={6} height={6} rx={1} />
                      <rect x={14} y={14} width={6} height={6} rx={1} />
                    </svg>
                    <span className="text-sm  ml-2">Listes des entrepots</span>
                  </div>
                </li>
              </Link>
              <Link to="/create">
                <li className="flex w-full justify-between   hover:py-4 hover:px-2 hover:rounded-xl hover:bg-[#fad8c7] hover:text-[#f6783a] font-semibold text-[#455a64] transition-all cursor-pointer items-center mb-8 ">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-puzzle"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                    </svg>
                    <span className="text-sm  ml-2">Creez un entrepot</span>
                  </div>
                </li>
              </Link>
              <Link to="/modify">
                <li className="flex w-full justify-between  hover:py-4 hover:px-2 hover:rounded-xl hover:bg-[#fad8c7] hover:text-[#f6783a] font-semibold text-[#455a64] transition-all  cursor-pointer items-center mb-8">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-compass"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="8 16 10 10 16 8 14 14 8 16" />
                      <circle cx={12} cy={12} r={9} />
                    </svg>
                    <span className="text-sm  ml-2">Modifier un entrepot</span>
                  </div>
                </li>
              </Link>
              <Link to="/login">
                <li className="flex w-full justify-between  hover:py-4 hover:px-2 hover:rounded-xl hover:bg-[#fad8c7] hover:text-[#f6783a] font-semibold text-[#455a64] transition-all cursor-pointer items-center mb-8">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-code"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="7 8 3 12 7 16" />
                      <polyline points="17 8 21 12 17 16" />
                      <line x1={14} y1={4} x2={10} y2={20} />
                    </svg>
                    <span className="text-sm  ml-2">se deconnecter</span>
                  </div>
                </li>
              </Link>
              {/**
            <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
              <Link to="/blog">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-puzzle"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                  </svg>
                  <span className="text-sm  ml-2">Blog</span>
                </div>
              </Link>
            </li>
            <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-8">
              <Link to="/carriere">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-stack"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                    <polyline points="4 12 12 16 20 12" />
                    <polyline points="4 16 12 20 20 16" />
                  </svg>
                  <span className="text-sm  ml-2">Carriere</span>
                </div>
              </Link>
            </li>
            <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center">
              <Link to="/contact">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-settings"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx={12} cy={12} r={3} />
                  </svg>
                  <span className="text-sm  ml-2">Contact</span>
                </div>
              </Link>
            </li> */}
            </ul>
          </div>
        </div>
        {/* Nav Mobile */}
        <div
          className="w-64 z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out"
          id="mobile-nav"
        >
          <div
            className="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer"
            id="mobile-toggler"
            onclick="sidebarHandler()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-adjustments"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx={6} cy={10} r={2} />
              <line x1={6} y1={4} x2={6} y2={8} />
              <line x1={6} y1={12} x2={6} y2={20} />
              <circle cx={12} cy={16} r={2} />
              <line x1={12} y1={4} x2={12} y2={14} />
              <line x1={12} y1={18} x2={12} y2={20} />
              <circle cx={18} cy={7} r={2} />
              <line x1={18} y1={4} x2={18} y2={5} />
              <line x1={18} y1={9} x2={18} y2={20} />
            </svg>
          </div>
          <div className="px-8">
            <div className="h-16 w-full flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={144}
                height={30}
                viewBox="0 0 144 30"
              >
                <path
                  fill="#5F7DF2"
                  d="M80.544 9.48c1.177 0 2.194.306 3.053.92.86.614 1.513 1.45 1.962 2.507.448 1.058.673 2.247.673 3.568 0 1.303-.233 2.473-.699 3.51-.465 1.037-1.136 1.851-2.012 2.444-.876.592-1.885.888-3.028.888-1.405 0-2.704-.554-3.897-1.663v4.279h2.64v3.072h-9.14v-3.072h2.26V12.78H70.45V9.657h6.145v1.663l.209-.21c1.123-1.087 2.369-1.63 3.74-1.63zm17.675 0c1.176 0 2.194.306 3.053.92.859.614 1.513 1.45 1.961 2.507.449 1.058.673 2.247.673 3.568 0 1.303-.233 2.473-.698 3.51-.466 1.037-1.136 1.851-2.012 2.444-.876.592-1.886.888-3.028.888-1.405 0-2.704-.554-3.898-1.663v4.279h2.64v3.072h-9.14v-3.072h2.26V12.78h-1.904V9.657h6.144v1.663l.21-.21c1.122-1.087 2.368-1.63 3.739-1.63zM24.973 1c1.13 0 2.123.433 2.842 1.133 0 .004 0 .008.034.012 1.54 1.515 1.54 3.962-.034 5.472-.035.029-.069.058-.069.089-.719.65-1.712 1.05-2.773 1.05-.719 0-1.37.061-1.985.184-2.363.474-3.8 1.86-4.28 4.13-.114.489-.18 1.02-.2 1.59l-.003.176.001-.034.002.034c.022.505-.058 1.014-.239 1.495l-.076.182.064-.157c.106-.28.18-.575.217-.881l.008-.084-.026.195c-.286 1.797-1.858 3.188-3.754 3.282l-.204.005h-.103l-.103.002h-.034c-.65.012-1.232.072-1.78.181-2.328.473-3.765 1.863-4.279 4.139-.082.417-.142.863-.163 1.339l-.008.362v.23c0 2.02-1.603 3.681-3.661 3.861L4.16 29l-.48-.01c-.958-.073-1.849-.485-2.499-1.113-1.522-1.464-1.573-3.808-.152-5.33l.152-.154.103-.12c.719-.636 1.677-1.026 2.704-1.026.754 0 1.404-.062 2.02-.184 2.362-.475 3.8-1.86 4.28-4.126.136-.587.17-1.235.17-1.942 0-.991.411-1.896 1.027-2.583.069-.047.137-.097.172-.15.068-.051.102-.104.17-.159.633-.564 1.498-.925 2.408-.978l.229-.007h.034c.068 0 .171.003.274.009.616-.014 1.198-.074 1.746-.18 2.328-.474 3.766-1.863 4.279-4.135.082-.44.142-.912.163-1.418l.008-.385v-.132c0-2.138 1.78-3.872 4.005-3.877zm-.886 10c1.065 0 1.998.408 2.697 1.073.022.011.03.024.042.036l.025.017v.015c1.532 1.524 1.532 3.996 0 5.52-.034.03-.067.06-.067.09-.7.655-1.665 1.056-2.697 1.056-.7 0-1.332.062-1.932.186-2.298.477-3.696 1.873-4.163 4.157-.133.591-.2 1.242-.2 1.95 0 1.036-.399 1.975-1.032 2.674l-.1.084c-.676.679-1.551 1.055-2.441 1.13l-.223.012-.366-.006c-.633-.043-1.3-.254-1.865-.632-.156-.096-.296-.201-.432-.315l-.2-.177v-.012c-.734-.735-1.133-1.72-1.133-2.757 0-2.078 1.656-3.793 3.698-3.899l.198-.005h.133c.666-.007 1.266-.069 1.832-.185 2.265-.476 3.663-1.874 4.163-4.161.08-.442.139-.916.159-1.424l.008-.387v-.136c0-2.153 1.731-3.899 3.896-3.904zm3.882 11.025c1.375 1.367 1.375 3.583 0 4.95s-3.586 1.367-4.96 0c-1.345-1.367-1.345-3.583 0-4.95 1.374-1.367 3.585-1.367 4.96 0zm94.655-12.672c1.405 0 2.628.323 3.669.97 1.041.648 1.843 1.566 2.406 2.756.563 1.189.852 2.57.87 4.145h-9.954l.03.251c.132.906.476 1.633 1.03 2.18.605.596 1.386.895 2.343.895 1.058 0 2.09-.525 3.097-1.574l3.301 1.066-.203.291c-.69.947-1.524 1.67-2.501 2.166-1.075.545-2.349.818-3.821.818-1.473 0-2.774-.277-3.904-.831-1.13-.555-2.006-1.34-2.628-2.355-.622-1.016-.933-2.21-.933-3.58 0-1.354.324-2.582.971-3.682s1.523-1.961 2.628-2.583c1.104-.622 2.304-.933 3.599-.933zm13.955.126c1.202 0 2.314.216 3.339.648v-.47h3.034v3.91h-3.034l-.045-.137c-.317-.848-1.275-1.272-2.875-1.272-1.21 0-1.816.339-1.816 1.016 0 .296.161.516.483.66.321.144.791.262 1.409.355 1.735.22 3.102.536 4.1.946 1 .41 1.697.919 2.095 1.524.398.605.597 1.339.597 2.202 0 1.405-.48 2.5-1.441 3.282-.96.783-2.266 1.174-3.917 1.174-1.608 0-2.7-.321-3.275-.964V23h-3.098v-4.596h3.098l.032.187c.116.547.412.984.888 1.311.53.364 1.183.546 1.962.546.762 0 1.324-.087 1.688-.26.364-.174.546-.476.546-.908 0-.296-.076-.527-.228-.692-.153-.165-.447-.31-.883-.438-.435-.127-1.102-.27-2-.431-1.997-.313-3.433-.82-4.31-1.517-.875-.699-1.313-1.64-1.313-2.825 0-1.21.455-2.162 1.365-2.856.91-.695 2.11-1.042 3.599-1.042zm-69.164.178v10.27h1.98V23h-8.24v-3.072h2.032V12.78h-2.031V9.657h6.259zm-16.85-5.789l.37.005c1.94.05 3.473.494 4.6 1.335 1.198.892 1.797 2.185 1.797 3.878 0 1.168-.273 2.15-.819 2.945-.546.796-1.373 1.443-2.482 1.943l3.085 5.776h2.476V23h-5.827l-4.317-8.366h-2.183v5.116h2.4V23H39.646v-3.25h2.628V7.118h-2.628v-3.25h10.918zm61.329 0v16.06h1.892V23h-8.24v-3.072h2.082v-13h-2.082v-3.06h6.348zm-32.683 9.04c-.812 0-1.462.317-1.949.951-.486.635-.73 1.49-.73 2.565 0 1.007.252 1.847.756 2.52.503.673 1.161 1.01 1.974 1.01.838 0 1.481-.312 1.93-.934.448-.622.672-1.504.672-2.647 0-1.092-.228-1.942-.685-2.552-.457-.61-1.113-.914-1.968-.914zm17.675 0c-.813 0-1.463.317-1.95.951-.486.635-.73 1.49-.73 2.565 0 1.007.253 1.847.756 2.52.504.673 1.162 1.01 1.974 1.01.838 0 1.481-.312 1.93-.934.449-.622.673-1.504.673-2.647 0-1.092-.229-1.942-.686-2.552-.457-.61-1.113-.914-1.967-.914zM14.1 0C16.267 0 18 1.743 18 3.894v.01c0 2.155-1.733 3.903-3.9 3.903-4.166 0-6.3 2.133-6.3 6.293 0 2.103-1.667 3.817-3.734 3.9l-.5-.009c-.933-.075-1.8-.49-2.433-1.121C.4 16.134 0 15.143 0 14.1c0-2.144 1.733-3.903 3.9-3.903 4.166 0 6.3-2.133 6.3-6.294C10.2 1.751 11.934.005 14.1 0zm108.32 12.184c-.76 0-1.372.22-1.834.66-.46.44-.75 1.113-.87 2.018h5.561c-.118-.795-.442-1.44-.97-1.936-.53-.495-1.158-.742-1.886-.742zM49.525 7.118h-2.26v4.444h1.829c2.023 0 3.034-.754 3.034-2.26 0-.728-.233-1.274-.698-1.638-.466-.364-1.1-.546-1.905-.546zm15.821-3.593c.635 0 1.183.231 1.644.692.462.462.692 1.01.692 1.644 0 .677-.23 1.238-.692 1.682-.46.445-1.009.667-1.644.667-.643 0-1.195-.23-1.656-.692-.462-.461-.692-1.013-.692-1.657 0-.634.23-1.182.692-1.644.46-.461 1.013-.692 1.656-.692zM5.991 1.171c1.345 1.563 1.345 4.095 0 5.658-1.374 1.561-3.585 1.561-4.96 0-1.375-1.563-1.375-4.095 0-5.658 1.375-1.561 3.586-1.561 4.96 0z"
                />
              </svg>
            </div>
            <ul className="mt-12">
              <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-grid"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={6} height={6} rx={1} />
                    <rect x={14} y={4} width={6} height={6} rx={1} />
                    <rect x={4} y={14} width={6} height={6} rx={1} />
                    <rect x={14} y={14} width={6} height={6} rx={1} />
                  </svg>
                  <span className="text-sm  ml-2">Dashboard</span>
                </div>
                <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                  5
                </div>
              </li>
              <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-puzzle"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                  </svg>
                  <span className="text-sm  ml-2">Products</span>
                </div>
                <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                  8
                </div>
              </li>
              <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-compass"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="8 16 10 10 16 8 14 14 8 16" />
                    <circle cx={12} cy={12} r={9} />
                  </svg>
                  <span className="text-sm  ml-2">Performance</span>
                </div>
              </li>
              <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-code"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="7 8 3 12 7 16" />
                    <polyline points="17 8 21 12 17 16" />
                    <line x1={14} y1={4} x2={10} y2={20} />
                  </svg>
                  <span className="text-sm  ml-2">Deliverables</span>
                </div>
              </li>
              <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-puzzle"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                  </svg>
                  <span className="text-sm  ml-2">Invoices</span>
                </div>
                <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
                  25
                </div>
              </li>
              <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-stack"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="12 4 4 8 12 12 20 8 12 4" />
                    <polyline points="4 12 12 16 20 12" />
                    <polyline points="4 16 12 20 20 16" />
                  </svg>
                  <span className="text-sm  ml-2">Inventory</span>
                </div>
              </li>
              <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-settings"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx={12} cy={12} r={3} />
                  </svg>
                  <span className="text-sm  ml-2">Settings</span>
                </div>
              </li>
            </ul>
            <div className="flex justify-center  mt-48 mb-4 w-full">
              <div className="relative ">
                <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-search"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={10} cy={10} r={7} />
                    <line x1={21} y1={21} x2={15} y2={15} />
                  </svg>
                </div>
                <input
                  className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="px-8 border-t border-gray-700">
            <ul className="w-full flex items-center justify-between bg-gray-800">
              <li className="cursor-pointer text-white pt-5 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-bell"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
              </li>
              <li className="cursor-pointer text-white pt-5 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-messages"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                  <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                </svg>
              </li>
              <li className="cursor-pointer text-white pt-5 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-settings"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <circle cx={12} cy={12} r={3} />
                </svg>
              </li>
              <li className="cursor-pointer text-white pt-5 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-archive"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x={3} y={4} width={18} height={4} rx={2} />
                  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                  <line x1={10} y1={12} x2={14} y2={12} />
                </svg>
              </li>
            </ul>
          </div>
        </div>
        {/* Sidebar ends */}
        {/* Remove class [ h-64 ] when adding a card block */}
        <section class="container px-4 mx-auto py-12 h-[100vh]">
          <div class="flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200  md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 ">
                    <thead class="bg-gray-50  font-semibold font-mono">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm  text-left rtl:text-right text-gray-500"
                        >
                          <div class="flex items-center gap-x-3">
                            <button class="flex items-center gap-x-2">
                              <span>Libellé</span>

                              <svg
                                class="h-3"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  stroke-width="0.1"
                                />
                                <path
                                  d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  stroke-width="0.1"
                                />
                                <path
                                  d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  stroke-width="0.3"
                                />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm  text-left rtl:text-right text-gray-500 "
                        >
                          Supercifie
                        </th>
                        <th
                          scope="col"
                          class="px-16 py-3.5 text-sm  text-left rtl:text-right text-gray-500"
                        >
                          Placer
                        </th>
                        <th
                          scope="col"
                          class="px-16 py-3.5 text-sm  text-left rtl:text-right text-gray-500"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 font-semibold">
                      {currentData.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td class="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                              <div class=" items-center gap-x-3 text-indigo-500">
                                <span>{item.libelle}</span>
                              </div>
                            </td>
                            <td class="px-4 py-4 text-sm font-semibold text-[#455a64]  whitespace-nowrap">
                              {item.superficie}
                            </td>
                            <td class="px-16 py-4 text-sm text-[#455a64]  whitespace-nowrap">
                              {item.place}
                            </td>
                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                              <div class="flex items-center gap-x-6">
                                <Button
                                  onClick={() => {
                                    axios
                                      .delete(
                                        `https://tame-veil-tuna.cyclic.app/entrepot/${item._id}`
                                      )
                                      .then((res) => console.log(res))
                                      .catch((error) => console.log(error));
                                    handleOpenTwo();
                                  }}
                                  size="sm"
                                  color="red"
                                >
                                  supprimé
                                </Button>

                                <Button className="flex items-center" size="sm">
                                  <Link to="/modify">modifié</Link>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <CardFooter className="flex  items-center justify-between border-t border-blue-gray-50 p-4 bg-white">
                    <Button
                      variant="outlined"
                      color="blue-gray"
                      size="sm"
                      onClick={prePage}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-2">
                      {numbers.map((n, i) => {
                        return (
                          <>
                            <IconButton
                              key={n}
                              className={`${
                                currentPage === n
                                  ? "border border-blue-300"
                                  : ""
                              }`}
                              variant="outlined"
                              color="blue-gray"
                              size="sm"
                              onClick={() => {
                                changePage(n);
                              }}
                            >
                              {n}
                            </IconButton>
                          </>
                        );
                      })}
                    </div>
                    <Button
                      variant="outlined"
                      color="blue-gray"
                      size="sm"
                      onClick={nextPage}
                    >
                      Next
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Dialog open={open} handler={handleOpen} size="xl">
          <DialogHeader>Opération réussie</DialogHeader>
          <DialogBody divider className="text-semibold">
            Les changements ont bien été enregistrés
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleOpen();
                window.location.reload();
              }}
            >
              <span>Fermer</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <Dialog open={openTwo} handler={handleOpenTwo} size="xl">
          <DialogHeader>Opération réussie</DialogHeader>
          <DialogBody divider className="text-semibold">
            L'entrepot a bien été supprimé
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleOpenTwo();
                window.location.reload();
              }}
            >
              <span>Fermer</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default Navbar;