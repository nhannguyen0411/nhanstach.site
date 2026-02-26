"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
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

// 1. Schema [cite: 294]
const formSchema = z.object({
  fullname: z.string().min(2, "Vui lòng nhập họ và tên"),
  attendance: z.enum(["yes", "no"]),
  guests: z.string().min(1, "Vui lòng chọn số lượng"),
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

export const FinalSection = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      fullname: "",
      attendance: "yes",
      guests: "1",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Cảm ơn bạn! Xác nhận đã được gửi đi thành công.");
        form.reset();
      } else {
        toast.error("Lỗi: " + response.statusText);
      }

    } catch (error) {
      toast.error("Không thể kết nối đến máy chủ.");
    }
  }

  return (
    <section className="w-full flex flex-col items-center my-14 px-4 space-y-16 overflow-hidden">
      {/* KHỐI 1: HỘP QUÀ [cite: 299-301] */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="flex flex-col items-center space-y-10"
      >
        <Heart />
        <div className="relative w-[80px] h-[80px] animate-shake-gift origin-bottom  transition-transform">
          <Image
            src="https://assets.cinelove.me/resources/flowchartIcons/bc7ro23uqhun7ge954163l.png"
            alt="Gift Box"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-lg font-extralight text-gray-500">
          Hộp quà cưới
        </div>
      </motion.div>

      {/* KHỐI 2: FORM [cite: 301-318] */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="w-[90%] max-w-[360px] bg-white rounded-md shadow-card p-7 border border-gray-100"
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

            <FormField
              control={form.control}
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

            <FormField
              control={form.control}
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
                        <SelectItem
                          key={num}
                          value={num}
                          className="font-light"
                        >
                          {num} người
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button
              type="submit"
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
            src="https://assets.cinelove.me/resources/characters/h4py3okq2aoga2u5n94fcq.png"
            alt="Chibi"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-[220px] h-[60px]">
          <Image
            src="https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/b2369584-b526-46a5-851b-034c9f2e1e0f.png"
            alt="Thank You"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
};
