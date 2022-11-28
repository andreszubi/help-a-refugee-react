// import {useContext, useEffect, useState} from "react";
// import {SessionContextUser} from "../contexts/SessionContextUser";
// import {Divider, Input } from 'antd';

// const ListingsSearchUser = ({ query, setQuery}) => {
//     const {token, currentUser, setCurrentUser} = useContext(SessionContextHost);
//     // const [country, setCountry] = useState("");
//     // const [city, setCity] = useState("");
//     // const [typeOfRoom, setTypeOfRoom] = useState("");
//     // const [ placesAvailable, setPlacesAvailable] = useState("");
//     // const [ image, setImage] = useState("")
//     // const [listings, setListings] = useState([])
//     const [isLoading, setIsLoading] = useState(true)

//     const loadingTime = () => {
//         if (currentUser) {
//             setIsLoading(false)
//         } else {
//             setIsLoading(true)
//         }
//     }

//     const handleChange = (event) => {
//         event.preventDefault();
//         setQuery(event.target.value)
//     };
//     return (
//         <>

//         </>
//     )

// const fetchListings = async () => {
//     const response = await fetch ("http://localhost:5005/user/user/listings" , {
//         method: "GET",
//         headers: {
//             Authorization : `Bearer ${token}`,
//             "Content-Type" : "application/json"
//         },
//     })
//     const parsed = await response.json();
//     setListings(parsed)
// }
// }
