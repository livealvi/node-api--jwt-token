import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8080/bookings?email=" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h3>You have: {bookings.length} bookings</h3>
      {bookings.map((book) => (
        <li>
          name: {book.name} - from:{" "}
          {new Date(book.checkIn).toDateString("dd/MM/yyyy")} - to:{" "}
          {new Date(book.checkOut).toDateString("dd/MM/yyyy")}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
