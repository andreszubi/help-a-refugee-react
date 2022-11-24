import { useEffect, useState, useContext } from "react";
import NavBarUser from "../components/NavBarUser";
import { SessionContextUser } from "../contexts/SessionContextUser";

const UserProfilePage = () => {
  const { user } = useContext(SessionContextUser);

  // useEffect(() => {}, []);
  // if (currentToken) {
  //     console.log(currentToken);
  // }

  //   const [email, setEmail] = useState();
  //   const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <NavBarUser />

      <div>Profile Page</div>
      <h3>user.firstName</h3>
      <h3>user.lastName</h3>
      <h3>user.email</h3>
      <h3>user.aboutMe</h3>
    </div>
  );
};

export default UserProfilePage;
