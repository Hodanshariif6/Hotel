import { useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSave = () => {
    if (!name || !desc) {
      alert("Please fill all fields!");
      return;
    }

    const profileData = { name, desc };
    localStorage.setItem("profile", JSON.stringify(profileData));

    // 🔔 Send event si Cart uu maqlo
    window.dispatchEvent(new Event("profileUpdated"));

    alert("Profile saved successfully!");
    setName("");
    setDesc("");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Set Reminder (Xasuusin)</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        placeholder="Enter room description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        onClick={handleSave}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Save Reminder
      </button>
    </div>
  );
}

export default Profile;
