// import {useContext, useEffect, useState} from "react"
// import {SessionContextHost} from "../contexts/SessionContextHost"

// function HostProfile() {
//     const {token, currentUser, setCurrentUser} = useContext(SessionContextHost);
//     const [country, setCountry] = useState("");
//     const [city, setCity] = useState("");
//     const [typeOfRoom, setTypeOfRoom] = useState("");
//     const [ placesAvailable, setPlacesAvailable] = useState("");
//     const [ image, setImage] = useState("")
//     const [listings, setListings] = useState([])
//     const [isLoading, setIsLoading] = useState(true)

//     const loadingTime = () => {
//         if (currentUser) {
//             setIsLoading(false)
//         } else {
//             setIsLoading(true)
//         }
//     }

//     const fetchListings = async () => {
//         const response = await fetch ("http://localhost:5005/host/listings" , {
//             method: "GET",
//             headers: {
//                 Authorization : `Bearer ${token}`,
//                 "Content-Type" : "application/json"
//             },
//         })
//         const parsed = await response.json();
//         setListings(parsed)
//     }
