"use client";
import Lottie from "lottie-react";
import RobotIcon from "@/assets/RobotIcon.json";

export default function Robot() {
  return <Lottie animationData={RobotIcon as unknown as object} />;
}
