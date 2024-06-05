"use client";
import { useEmailFields } from "@/components/context";
import { buttonStyle, inputStyle, labelStyle, mainHeading } from "@/components/style";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formLinks } from "@/lib/formLinks";

export default function Home() {
  const { formData, isEmailValid, handleInputChange, isAnyFieldEmpty, sendMail } = useEmailFields();
  const isButtonDisabled = isAnyFieldEmpty() || !isEmailValid;

  return (
    <section className="bg-slate-900 w-[100%] min-h-[100vh] py-12 lg:py-7 px-8 lg:px-20">
      <div className="w-[95%] md:[w-80%] lg:w-[60%] mx-auto">
        <h2 className={`${mainHeading}`}>NextJS Email Sender</h2>
        <form onSubmit={sendMail}>
          {formLinks.map((formLink) => (
            <>
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
            </>
          ))}

          <div className="flex justify-center items-center">
            <Button type="submit" disabled={isButtonDisabled} className={`${buttonStyle}`}>Send Email</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
