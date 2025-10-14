import React, {useState} from "react"

const RegisterPage = () => {
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("") 
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")
        setSuccess("")
    }
}