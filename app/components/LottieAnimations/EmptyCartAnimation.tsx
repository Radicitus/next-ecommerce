import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import emptyCart from "@/public/empty-cart.json";

export default function EmptyCartAnimation() {
  return (
    <div className="flex items-center justify-center flex-col mt-24 p-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Nothing to see here...
      </motion.h1>
      <Player autoplay loop src={emptyCart} />
    </div>
  );
}
