import { useContext, useEffect, useState } from "react";
import { SessionContextUser } from "../contexts/SessionContextUser";
import NavBarUser from "../components/NavBarUser";
import {
  ActionIcon,
  Autocomplete,
  Button,
  Card,
  createStyles,
  Modal,
  Skeleton,
  Text,
} from "@mantine/core";

const UserProfile = () => {
  const { token, currentPayload, setCurrentPayload } =
    useContext(SessionContextUser);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  // const [hashedPassword, setHashedPassword] = useState(has);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [image, setImage] = useState(image.image);
  const [aboutMe, setAboutMe] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadingTime = () => {
    if (currentPayload.user._id) {
      const fetchUser = async () => {
        const response = await fetch(
          `http://localhost:5005/user/user/${currentPayload.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const parsed = await response.json();
        console.log(parsed);
        setEmail(parsed.email);
        setFirstName(parsed.firstName);
        setLastName(parsed.lastName);
        setAboutMe(parsed.aboutMe);
        console.log(parsed);
      };
      fetchUser();
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  // const fetchUser = currentPayload(
  //   "GET",
  //   "user/:id",
  //   setEmail,
  //   setFirstName,
  //   setLastName,
  //   setAboutMe
  // );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:5005/user/user/edit/${currentPayload.user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, firstName, lastName, aboutMe }),
      }
    );
    const updatedUser = await response.json();
    console.log(updatedUser);
    setCurrentPayload(updatedUser);
    setIsEditing(false);
  };

  useEffect(() => {
    loadingTime();
  }, [currentPayload]);

  if (!currentPayload) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBarUser />
      <h2>
        {isLoading
          ? "Loading..."
          : `Welcome to your profile, ${currentPayload.user.firstName}`}
      </h2>
      <Skeleton visible={isLoading}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text fz="lg">First Name: {currentPayload.user.firstName}</Text>
          <Text>Last Name: {currentPayload.user.lastName}</Text>
          <Text>Email: {currentPayload.user.email}</Text>
          <Text>About me:{currentPayload.user.aboutMe}</Text>
          <Button
            color="grape"
            radius="xl"
            size="xs"
            compact
            uppercase
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          {/* <ActionIcon
            color="red"
            size="lg"
            radius="xs"
            variant="light"
            onClick={() => deleteBeer(beer._id)}
          >
            <IconTrash size={26} />
          </ActionIcon> */}
        </Card>
      </Skeleton>
      <Modal
        opened={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit profile"
      >
        <form onSubmit={handleSubmit}>
          <label>
            First Name :
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label>
            Last Name :
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            About me:
            <input
              value={aboutMe}
              onChange={(event) => setAboutMe(event.target.value)}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;

//*WHATS on host prof*//
// import { useContext, useEffect, useState } from "react";
// import { SessionContextUser } from "../contexts/SessionContextUser";

// function UserProfile() {
//   const { token, currentPayload } = useContext(SessionContextUser);
//   const [visibleForm, setVisibleForm] = useState(false);
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [aboutMe, setAboutMe] = useState("");
//   // const [ image, setImage] = useState("")
//   const [user, setUser] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const loadingTime = () => {
//     if (currentPayload) {
//       setIsLoading(false);
//     } else {
//       setIsLoading(true);
//     }
//   };

//   const fetchUser = async () => {
//     const response = await fetch("http://localhost:5005/user/:id", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const parsed = await response.json();
//     setUser(parsed);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await fetch("http://localhost:5005/user/edit/:id", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ email, firstName, lastName, aboutMe, image }),
//     });
//     fetchUser();
//   };

//   const deleteProfile = async (id, event) => {
//     event.preventDefault();
//     const response = await fetch(`http://localhost:5005/user/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     const parsed = await response.json();
//     fetchUser();
//   };

//   const setVisibilityForm = () => {
//     setVisibleForm(!visibleForm);
//   };

//   useEffect(() => {
//     loadingTime();
//   }, [currentPayload]);
//   useEffect(() => {
//     if (!isLoading) {
//       fetchUser();
//     }
//   }, [isLoading]);

//   return (
//     <div className="background-img">
//       <h1>
//         {" "}
//         {isLoading
//           ? "Loading..."
//           : `Welcome to your profile, ${currentPayload.user.firstName}`}
//       </h1>

//       {visibleForm && (
//         <div className="PublishListing">
//           <div>
//             <h1>Edit Profile</h1>
//             <form onSubmit={(event) => handleSubmit(event)}>
//               <label>
//                 First Name: {currentPayload.user.firstName}
//                 <input
//                   type="text"
//                   name="firstName"
//                   required
//                   onChange={(event) => setFirstName(event.target.value)}
//                 />
//               </label>

//               <label>
//                 Last Name: {currentPayload.user.lastName}
//                 <input
//                   type="text"
//                   name="lastName"
//                   required
//                   onChange={(event) => setLastName(event.target.value)}
//                 />
//               </label>

//               <label>
//                 Email: {currentPayload.user.email}
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   onChange={(event) => setEmail(event.target.value)}
//                 />
//               </label>

//               <label>
//                 About Me: {currentPayload.user.aboutMe}
//                 <input
//                   type="text"
//                   name="aboutMe"
//                   required
//                   onChange={(event) => setAboutMe(event.target.value)}
//                 />
//               </label>

//               <label>
//                 Image:{currentPayload.user.image}
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={(event) => setImage(event.target.value)}
//                 />
//               </label>

//               <button className="button" type="submit">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//       <button type="button" onClick={setVisibilityForm}>
//         {visibleForm ? "Hide form" : "Edit Profile"}
//       </button>
//       <div className="profile">
//         {user.map(({ _id, firstName, lastName, email, aboutMe, image }) => (
//           <div key={_id} className="userProf">
//             <img src={image} alt="userImg" className="userImg" />
//             <p>First Name: {firstName}</p>
//             <p>Last Name: {lastName}</p>
//             <p>Email: {email}</p>
//             <p>About me: {aboutMe}</p>
//             <button
//               type="button"
//               onClick={(event) => deleteProfile(_id, event)}
//             >
//               Delete Profile
//             </button>
//             {/* <button>Check details</button> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default UserProfile;
