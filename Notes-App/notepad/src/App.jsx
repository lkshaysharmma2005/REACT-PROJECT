import React, { useState } from "react";
import { X } from "lucide-react"; // ✅ correct import

const App = () => {
  // input states
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  // notes list
  const [tasks, setTasks] = useState([]);

  // form submit
  const submitHandler = (e) => {
    e.preventDefault(); // page reload stop

    // add new note
    const copyTask = [...tasks]
    copyTask.push({title,detail}) 
    setTasks(copyTask)

    // clear input
    setTitle("");
    setDetail("");
  };

  const deleteNote = (index) => {
    const copyTasks = [...tasks];
    copyTasks.splice(index,1);
    setTasks(copyTasks);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <form onSubmit={submitHandler}>
          <h1 className="text-3xl font-bold mb-6">Add Notes</h1>

          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-3 bg-transparent border border-white rounded"
            required
          />

          <textarea
            placeholder="Note Details"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows="5"
            className="w-full mb-6 p-3 bg-transparent border border-white rounded"
            required
          />

          <button className="bg-white text-black px-6 py-3 rounded font-semibold">
            Add Note
          </button>
        </form>

        {/* RIGHT SIDE */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Recent Notes</h1>

          <div className="flex gap-4 flex-wrap">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="relative h-52 w-40 rounded-xl text-black p-4 
                bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')]
                bg-cover bg-center"
              >
                {/* X icon */}
                <button onClick={()=>{
                  deleteNote(index)
                }} className="absolute top-2 right-2">
                  <X size={18} />
                </button>

                <h3 className="text-xl font-bold">{task.title}</h3>

                <p className="mt-3 text-sm text-gray-600">{task.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
