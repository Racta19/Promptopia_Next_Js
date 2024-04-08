"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");

    const [userPost, setUserPost] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${params?.id/posts}`);
            const data = await response.json()

            setUserPost(data);
        }

        if(params?.id) fetchPost();
    }, [params.id]);

    return (<Profile name={name} desc={`Exploring ${name}'s prompts collection`} data={userPost} />);
}

export default UserProfile;