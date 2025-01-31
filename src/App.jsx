import { useEffect, useState } from "react";
import axios from "axios";


import "./App.css";

function App() {
  return (
    <div className="mx-auto">
      <MenuApp />
      <Postingan />
      <Story />
      <div className="container mx-auto md:container max-w-96 flex flex-col gap-4 my-4" >
        {users.map((user) => {
          return <Post key={user.username} {...user} />;
        })}
      </div>
    </div>
  );
}

import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
const MenuApp = () => {
  return (
    <div>
      <nav className="w-full flex flex-row justify-between bg-white text-blue-500 p-4 px-12 items-center border-0 border-gray-200 border-solid shadow-sm">
        <a href="/">
          <h1 className="text-2xl font-bold">LOKANARA</h1>
        </a>
        <div className="flex flex-row justify-center items-center gap-4">
          <a href="#beranda" className="p-1 text-2xl hover:animate-pulse">{<FontAwesomeIcon icon={faHouse} />} </a>
          <a href="#berita" className="p-1 text-2xl hover:animate-pulse">{<FontAwesomeIcon icon={faNewspaper} />} </a>
          <a href="#profile" className="p-1 text-2xl hover:animate-pulse">{<FontAwesomeIcon icon={faUser} />} </a>
        </div>
      </nav>
    </div>
  )
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartBeat } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Instagram } from 'react-content-loader'

const SkeletonIG = () => <Instagram />

const users = [
  {
    id: 1,
    name: "Kalam",
    username: "kekalam",
    profile: "https://picsum.photos/50/50",
    isVerified: true,
    status: "online",
    image: "https://picsum.photos/600/400",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, rerum. Amet, ipsum.",
    like: 12
  },
  {
    id: 2,
    name: "Khoirul",
    username: "kh0ir",
    profile: "https://picsum.photos/50/50",
    isVerified: false,
    status: "offline",
    image: "https://picsum.photos/600/400",
    bio: "Bukan sulap bukan bukan sihir",
    like: 3
  },
  {
    id: 3,
    name: "Asep",
    username: "septo",
    profile: "https://picsum.photos/50/50",
    isVerified: true,
    status: "online",
    image: "https://picsum.photos/600/400",
    bio: "Sedang ngapain?",
    like: 5
  }

]
/**
 * Post component
 *
 * @param {Object} data - Data for the post, including user information and image url
 * @returns {JSX.Element} JSX element representing a post
 */
const Post = (data) => {
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imgContent, setImgContent] = useState("");
  const [imgProfile, setImgProfile] = useState("");

  useEffect(() => {
    setCount(data.like);
  }, [data.like]);

  useEffect(() => {
    fetchImageContent(data.image);
    fetchImageProfile(data.profile);
  }, [data.image, data.profile]);

  const fetchImageProfile = (url) => {
    axios
      .get(url)
      .then((response) => {
        setImgProfile(response.request.responseURL);
      })
      .catch((error) => console.error(error));
  }
  const fetchImageContent = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setImgContent(response.request.responseURL);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {loading ? <SkeletonIG /> : (
        <div className="border-2 border-gray-200 hover:shadow-xl cursor-pointer rounded-2xl">
          <div className="p-2 px-4 flex flex-row gap-4 align-middle items-center" id="nametag">
            <img src={imgProfile} alt="profile" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-0">
              <div className="flex flex-row gap-2">
                <a href="#"><h2 className="font-bold">{data.username}</h2></a>
                <span className="text-blue-400"> {data.isVerified ? <FontAwesomeIcon icon={faCircleCheck} /> : ""}</span>
              </div>

              <p className={data.status === "online" ? "italic text-blue-500" : "italic text-gray-400"}>{data.status}</p>
            </div>
          </div>
          <div className="w-full h-full">
            <a
              onDoubleClick={() => {
                setLike(!like);
                like ? setCount(count - 1) : setCount(count + 1);
              }}
            >

              <img
                src={imgContent}
                loading="lazy"
                className="w-full bg-cover "
                alt="post image"
              />


            </a>
          </div>
          <div className="p-4 text-start">
            <p>
              {data.bio}
            </p>
            <div className="flex flex-row gap-2">


              <button className="px-2 py-1 mt-2 border-2 border-gray-200 border-solid rounded-2xl text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => {
                  setLike(!like);
                  like ? setCount(count - 1) : setCount(count + 1);
                }}
              >
                {like ? <FontAwesomeIcon icon={faHeartBeat} beat /> : <FontAwesomeIcon icon={faHeart} />} {count}
              </button>
              <button className="px-2 py-1 mt-2 border-2 border-gray-200 border-solid rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white">
                <FontAwesomeIcon icon={faComment} /> 0
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  );
};

/**
 * A component that renders a posting form with a textarea, a file button, and a posting button.
 * The textarea is used to input the posting content, and the file button is used to select an image to upload.
 * The posting button is used to post the content and image to the server.
 */
const Postingan = () => {
  return (
    <div className="container mx-auto md:container max-w-96 flex flex-col gap-4 my-8" >
      <textarea id="postingan" className="w-full h-28 border-1 border-gray-200 border-solid rounded-2xl p-2" placeholder="Apa yang kamu pikirkan?" spellCheck="false"></textarea>
      {/* <button onClick={() => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();
        fileInput.addEventListener('change', (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            const image = document.createElement('img');
            image.src = reader.result;
            document.getElementById('nametag').appendChild(image);
          };
          reader.readAsDataURL(file);
        });
      }}>+</button> */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => console.log(document.getElementById('postingan').value)}>Posting</button>
    </div>
  );
};

const Story = () => {
  const users = [
    {
      username: "rararara",
      story: "https://picsum.photos/50/50",
      isVerified: true,
      iswatched: true
    },
    {
      username: "petak1illan",
      story: "https://picsum.photos/50/50",
      isVerified: false,
      iswatched: false
    },
    {
      username: "yasmin",
      story: "https://picsum.photos/50/50",
      isVerified: false,
      iswatched: false
    },
    {
      username: "grindra",
      story: "https://picsum.photos/50/50",
      isVerified: false,
      iswatched: false
    },
    {
      username: "amelia12",
      story: "https://picsum.photos/50/50",
      isVerified: false,
      isShowed: false
    },
    {
      username: "dharmakyun",
      story: "https://picsum.photos/50/50",
      isVerified: false,
      isShowed: false
    },
  ]
  // const [isShowed, setIsShowed] = useState(false);
  // const [imgStory, setImgStory] = useState("");


  const StoryCard = (user) => {
    // const fetchImageContent = (url) => {
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       setImgStory(response.request.responseURL);
    //     })
    //     .catch((error) => console.error(error));
    // };

    // useEffect(() => {
    //   fetchImageContent(user.story);

    // }, [user.story]);

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <img src={user.story} className="max-w-20 max-h-20 rounded-full bg-cover" alt="Story" />

          {user.iswatched && (
            <div className="absolute top-0 right-0">
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
            </div>
          )}
        </div>
        <p className="text-sm mt-2">{user.username}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="md:container container mx-auto max-w-96">
        <div className="flex flex-row gap-4 overflow-x-auto mx-auto">
          {users.map((user) => {
            return <StoryCard key={user.username} {...user} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
