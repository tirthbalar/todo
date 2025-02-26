import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  onSubmit,
  clientData,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState(false);
  const [gender, setGender] = useState("");

  // Handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = {
        name,
        email,
        job,
        salary: parseFloat(salary),
        isactive: status,
        gender,
      };
      await onSubmit(clientData);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Error adding client", err);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setJob("");
    setSalary("");
    setStatus(false);
    setGender("");
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setSalary(parseFloat(clientData.salary).toFixed(2));
      setStatus(clientData.isactive);
      setGender(clientData.gender || "");
    } else {
      resetForm();
    }
  }, [mode, clientData]);

  return (
    <dialog
      id="client_modal"
      className={`modal ${isOpen ? "open" : ""}`}
      open={isOpen}
    >
      <div className="modal-box bg-slate-200 shadow-xl rounded-lg p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {mode === "edit" ? "Edit Client" : "Add Client"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Job Field */}
          <div>
            <label className="block text-gray-700 font-medium">Job</label>
            <input
              type="text"
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              required
            />
          </div>

          {/* Salary & Status */}
          <div className="flex justify-between space-x-4">
            {/* Salary Field */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Salary</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>

            {/* Status Field */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Status</label>
              <select
                value={status ? "Active" : "Inactive"}
                className="w-full px-4 py-2 border bg-white text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                onChange={handleStatusChange}
              >
                <option>Inactive</option>
                <option>Active</option>
              </select>
            </div>
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Gender
            </label>
            <div className="flex gap-4">
              {/* Male */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleGenderChange}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                </div>
                <span className="text-black">Male</span>
              </label>

              {/* Female */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleGenderChange}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                </div>
                <span className="text-black">Female</span>
              </label>

              {/* Other */}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={handleGenderChange}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500">
                  <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                </div>
                <span className="text-black">Other</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
            >
              {mode === "edit" ? "Save Changes" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
