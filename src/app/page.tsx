"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { buttonStyle, inputStyle, labelStyle, mainHeading } from "@/components/style";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formLinks } from "@/lib/formLinks";

export default function Home() {
  const { toast } = useToast();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    subject: "",
    description: "",
  });

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

  const isAnyFieldEmpty = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        return true;
      }
    }
    return false;
  };

  const isButtonDisabled = isAnyFieldEmpty() || !isEmailValid;

  const sendMail = async (e: any) => {
    e.preventDefault();
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
    <section className="bg-slate-900 w-[100%] min-h-[100vh] py-12 lg:py-7 px-8 lg:px-20">
      <div className="w-[95%] md:[w-80%] lg:w-[60%] mx-auto">
        <h2 className={`${mainHeading}`}>NextJS Email Sender</h2>
        <form onSubmit={sendMail}>
          {formLinks.map((formLink) => (
            <div key={formLink.id}>
              {formLink.content === "simple" ? (
                <div key={formLink.id}>
                  <Label htmlFor={formLink.id} className={`${labelStyle}`}>{formLink.label}</Label>
                  <Input name={formLink.id} className={`${inputStyle}`} type={formLink.type} placeholder={formLink.placeholder} value={formData[formLink.id]} onChange={handleInputChange} />
                </div>
              ) : (
                <div key={formLink.id}>
                  <Label htmlFor={formLink.id} className={`${labelStyle}`}>{formLink.label}</Label>
                  <Textarea name={formLink.id} className={`${inputStyle}`} placeholder={formLink.placeholder} maxLength={formLink.maxLength} value={formData[formLink.id]} onChange={handleInputChange} />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center items-center">
            <Button type="submit" disabled={isButtonDisabled} className={`${buttonStyle}`}>Send Email</Button>
          </div>
        </form>
      </div>
    </section >
  );
}
