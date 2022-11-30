import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";



const useAdmin = (email, head) => {
    const { logOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    const [isAdminLoading, setIsAdminLoading] = useState(true);

    const navigate = useNavigate();



    useEffect(() => {
        if (email) {
            fetch(`https://serversite-liart.vercel.app/user/admin/${email}`, {
                headers: {
                    auth: `bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    // if (!data?.isAdmin && !head) {
                    //     logOut();
                    // }
                    setIsAdmin(data?.isAdmin);
                    setIsAdminLoading(false);
                });
        }
    }, [email, navigate, logOut, head]);

    return [isAdmin, isAdminLoading,];
};

export default useAdmin;