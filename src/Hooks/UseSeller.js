import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const useSeller = (email, head) => {

    const [isSeller, setSeller] = useState(false);
    const [issellerLoading, setIselerLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (email) {
            fetch(`https://serversite-liart.vercel.app/user/seller/${email}`, {
                headers: {
                    auth: `bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {

                    console.log(data)
                    // if (!data?.isSeller && !head) {
                    //     navigate("/wrong");

                    // }
                    setSeller(data?.isSeller);
                    setIselerLoading(false);
                });
        }
    }, [email, navigate, head]);

    return [isSeller, issellerLoading,];
};

export default useSeller;