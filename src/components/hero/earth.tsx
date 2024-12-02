import Spline from "@splinetool/react-spline/next";
import { motion } from "framer-motion";
export default function Earth() {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      <Spline
        style={{ overflow: "auto" }}
        scene="https://prod.spline.design/QnjJ-FrrginMpEmW/scene.splinecode"
      />
    </motion.div>
  );
}
