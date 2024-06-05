"use client";
import { ReactNode, createContext, useContext, useState } from 'react';
import { useToast } from './ui/use-toast';

interface FormData {
    fullname: string;
    email: string;
    subject: string;
    description: string;
    [key: string]: string;
}

interface UserContextType {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    isEmailValid: boolean;
    setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: any) => void;
    isAnyFieldEmpty: () => boolean;
    validateEmail: (email: string) => boolean;
    sendMail: (e: any) => void;
}

const UserContext = createContext<UserContextType>({
    formData: {
        fullname: "",
        email: "",
        subject: "",
        description: "",
    },
    setFormData: () => { },
    isEmailValid: false,
    setIsEmailValid: () => { },
    handleInputChange: (e: any) => { },
    isAnyFieldEmpty: () => false,
    validateEmail: (email: string) => false,
    sendMail: (e: any) => { },
});

export const useEmailFields = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { toast } = useToast();
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        fullname: "",
        email: "",
        subject: "",
        description: "",
    });


    const isAnyFieldEmpty = () => {
        for (const key in formData) {
            if (formData[key].trim() === "") {
                return true;
            }
        }
        return false;
    };

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'email') {
            setIsEmailValid(validateEmail(value));
        }
    };

    const sendMail = async (e: any) => {
        e.preventDefault();
        console.log("Form Data is ", formData);

        const response = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast({
                title: 'Email Send Successfully',
            });
        } else {
            toast({
                title: 'Email Sending Failed',
            });
        }
        console.log(await response.json());
        setFormData({
            fullname: "",
            email: "",
            subject: "",
            description: "",
        });
    };

    return (
        <UserContext.Provider value={{
            formData, setFormData, isEmailValid, setIsEmailValid, handleInputChange, isAnyFieldEmpty, validateEmail, sendMail
        }}>
            {children}
        </UserContext.Provider>
    );
};