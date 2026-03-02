"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Heart } from "./heart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

// 1. Schema
const formSchema = z.object({
  fullname: z.string().min(2, "Vui lòng nhập họ và tên"),
  attendance: z.enum(["yes", "no"]),
  guests: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.attendance === "yes" && !data.guests) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Vui lòng chọn số lượng",
      path: ["guests"],
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const AttendanceField = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="attendance"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="font-light text-sm">
            Bạn sẽ tham dự chứ?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-2"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-light cursor-pointer text-sm">
                  Có, tôi sẽ tham dự
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-light cursor-pointer text-sm">
                  Tôi bận, rất tiếc không thể tham dự
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

// useWatch chỉ trigger re-render component này khi attendance thay đổi
const GuestsField = () => {
  const { control } = useFormContext<FormValues>();
  const attendance = useWatch({ control, name: "attendance" });

  if (attendance === "no") {
    return (
      <div className="text-center text-xs font-light text-gray-500 italic leading-relaxed py-1">
        Dù bạn không thể đến, sự hiện diện của bạn <br />
        trong trái tim chúng tôi vẫn là điều trân quý nhất. <br />
        Cảm ơn bạn đã nhớ đến chúng tôi! 🤍
      </div>
    );
  }

  return (
    <FormField
      control={control}
      name="guests"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-light text-sm">
            Số lượng người tham dự
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="py-5 font-light w-full">
                <SelectValue placeholder="Chọn số lượng" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {["1", "2", "3", "4", "5"].map((num) => (
                <SelectItem key={num} value={num} className="font-light">
                  {num} người
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs text-red-500 font-light" />
        </FormItem>
      )}
    />
  );
}


export const FinalSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      fullname: "",
      attendance: "yes",
      guests: "1",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Cảm ơn bạn! Chúc bạn mọi điều tốt lành nhất đến với bạn.");
        form.reset();
      } else {
        toast.error("Lỗi: " + response.statusText);
      }

    } catch (error) {
      toast.error("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="w-full flex flex-col items-center my-14 px-4 space-y-16 overflow-hidden">
      {/* KHỐI 1: HỘP QUÀ [cite: 299-301] */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="flex flex-col items-center space-y-10"
      >
        <Heart />
        <div className="relative w-[80px] h-[80px] animate-shake-gift origin-bottom  transition-transform">
          <Image
            fill
            alt="Gift Box"
            src="/images/gift.png"
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* KHỐI 2: FORM [cite: 301-318] */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="w-[90%] max-w-[360px] bg-white rounded-md shadow-card p-5 md:p-7 border border-gray-100"
      >
        <h3 className="text-center font-bold mb-6">
          Xác nhận tham dự
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-light text-sm">
                    Họ và tên
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên của bạn"
                      className="py-5 font-light"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 font-light" />
                </FormItem>
              )}
            />

            <AttendanceField />
            <GuestsField />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-6 font-medium active:scale-[0.98] transition-all"
            >
              Gửi xác nhận
            </Button>
          </form>
        </Form>
      </motion.div>

      {/* KHỐI 3: CHIBI [cite: 318-322] */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
        className="flex flex-col items-center space-y-10 pt-8"
      >
        <div className="relative w-[110px] h-[120px]">
          <Image
            fill
            alt="Chibi"
            src="/images/couple.webp"
            className="object-contain"
          />
        </div>
        <div className="relative w-[220px] h-[60px]">
          <Image
            fill
            alt="Thank You"
            src="/images/thank-you.webp"
            className="object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
};

