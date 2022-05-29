import NewListForm from "../components/Forms/NewListForm/NewListForm";
import { motion } from "framer-motion";

const CreateList = () => {
  return (
    <motion.div className="w-3/5 mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <NewListForm />
    </motion.div>
  );
};

export default CreateList;
