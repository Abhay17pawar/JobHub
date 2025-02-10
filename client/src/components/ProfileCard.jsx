import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import axios from 'axios'; 
import Spinner from "./Loader2";

const ProfileCardBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile); 
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      setLoading(true); 

      const formData = new FormData();
      formData.append('file', file); 

      try {
        const response = await axios.post("http://localhost:3000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });

        const cloudinaryURL = response.data.file.url;

        // Step 2: Process the PDF file using the Cloudinary URL
      const result = await axios.get(`http://localhost:3000/api/process-pdf?cloudinaryURL=${encodeURIComponent(cloudinaryURL)}`);

      console.log(result.data);
      const extractedData = result.data;  
      const sendData = {
        email: extractedData.email,
        skills: extractedData.skills,
      };

      await axios.put("http://localhost:3000/api/save-extracted-data", sendData);

        toast.success("File uploaded and processed successfully!");
        setIsOpen(false);
      } catch (error) {
        console.error("Error during file upload and PDF extraction:", error);
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <div className="px-1 py-18 place-content-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-stone-900 to-stone-900 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Upload Resume
      </button>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleFileChange={handleFileChange}
        handleFileUpload={handleFileUpload}
        file={file}
        loading={loading} 
      />
      <ToastContainer />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, handleFileChange, handleFileUpload, file, loading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-stone-800 to-stone-800 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-stone-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Upload Your Resume
              </h3>
              <p className="text-center mb-6">
                Please upload your resume in PDF, DOCX, or any other supported format.
              </p>

              <div className="mb-4 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="border-2 border-gray-300 p-2 rounded"
                />
                <p className="mt-2 text-gray-500">
                  {file ? `Selected file: ${file.name}` : "No file selected"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleFileUpload}
                  className={`bg-white hover:opacity-90 transition-opacity text-stone-800 font-semibold w-full py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  whileTap={loading ? {} : { scale: 0.95 }} // Button animation on click
                >
                  {loading ? (
                    <span className="animate-spin"><Spinner/></span> // Spinner text when loading
                  ) : "Upload"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileCardBtn;
