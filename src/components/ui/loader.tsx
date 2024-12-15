import { motion } from "framer-motion";

const colors = ["#4b0082", "#8a2be2", "#9932cc", "#ba55d3", "#dda0dd"];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  initial: {},
  animate: {
    height: [40, 100, 40],
    transition: {
      repeat: Infinity,
    },
  },
};

const Loader = ({ count = 5 }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{
          display: "flex",
          gap: 16,
          height: 100,
          alignItems: "center",
        }}
      >
        {Array(count)
          .fill(null)
          .map((_, index) => {
            return (
              <motion.div
                key={index}
                variants={dotVariants}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: colors[index % colors.length],
                  borderRadius: 20,
                }}
              />
            );
          })}
      </motion.div>
    </div>
  );
};

export default Loader;
