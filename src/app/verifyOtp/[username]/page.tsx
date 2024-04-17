"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import PageTitle from "@/components/PageTitle";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  username: z.string(),
});

export function VerifyOtp() {
  const params = useParams<{ username: string }>();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
      username: "",
    },
  });
  //submit button handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      data.username = params.username;
      console.log("data from front end of verify otp", data);
      await axios.post("/api/verifyMail", data).then((res) => {
        console.log(res);
        console.log("Success");
        router.push("/login");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" fixed flex flex-col m-auto items-center p-16 rounded-2xl shadow-2xl ">
      <Form {...form}>
        <PageTitle title="Vetify OTP" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default VerifyOtp;
