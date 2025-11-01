"use client";
import React, {useState} from "react";

const LoginPage = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

    if (!username.trim){
        setError("Vennligst skriv brukernavn")
        return;
    }

    if (!password.trim){
        setError("Vennligst skriv passord")
        return;
    }

    if (password !== password){
        setError("Passordene matcher ikke")
        return;
    }
}

return {

    }
}
