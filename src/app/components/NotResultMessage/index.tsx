import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

const NoResultMessage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <FaSearch className="text-6xl text-gray-400 mb-4" />
      <p className="text-lg font-semibold text-gray-600">
        Nenhuma playlist localizada.
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600 transition"
      >
        <FaArrowLeft className="mr-2" />
        Voltar ao início
      </button>
    </div>
  );
};

export default NoResultMessage;
