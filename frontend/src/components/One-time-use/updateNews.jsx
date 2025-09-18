import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateNews() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImage] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  // ✅ Soo qaado xogta hal news ah
  const handleReadSingle = () => {
    axios
      .get(`http://localhost:5000/readSingle/New/${params.id}`)
      .then((res) => {
        setName(res.data[0].name);
        setDescription(res.data[0].desc);
        setImage(res.data[0].prImage);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch news data ❌");
      });
  };

  // ✅ Update news
  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("img", img);

    axios
      .put(`http://localhost:5000/update/New/${params.id}`, formData)
      .then(() => {
        toast.success("News updated successfully! 🎉");
        setTimeout(() => {
          navigate("/new"); // ✅ Update kadib dib ugu laabo page-ka News
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to update news ❌");
        console.error(error);
      });
  };

  useEffect(() => {
    handleReadSingle();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Update News</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">News Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Image</label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="w-full text-gray-700"
        />
      </div>

      <div>
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Update News
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default UpdateNews;
