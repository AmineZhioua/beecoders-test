import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const Landing = () => {
    return (
        <div className="relative flex justify-center w-full min-h-[85vh]">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
            </div>

            {/* Content */}
            <div className="relative flex items-center justify-center px-4 w-full max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
                        Improve your skills on your own
                        <span className="block mt-2 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                            to prepare for a better future
                        </span>
                    </h1>
                    <div className="flex gap-4 justify-center">
                        <Button className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            Register Now
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Landing;

