import NavBar from "./NavBar";

function RefugeeSignup() {
    return (
        <div className="Refugee-Signup">
            <NavBar />

            <h1>Refugee-Signup</h1>
            <form>
                <label>Email: <input type="email" name="email" /></label>

                <label>Password: <input type="password" name="hashedPassword" /></label>

                <label>First Name: <input type="text" name="firstName" /></label>

                <label>Last Name: <input type="text" name="lastName" /></label>

                <label>Country: <input type="text" name="country" /> </label>

                <label>City: <input type="text" name="city" /></label>

                <label>Profile Picture: <input type="file" name="image" /></label>

                <button type="button">Submit</button>

            </form>

     </div>
    )
}

export default RefugeeSignup;