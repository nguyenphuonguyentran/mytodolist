import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

export default async function handler(req, res) {
  await connectDB();

  try {
    if (req.method === "GET") {
      const tasks = await Task.find({});
      return res.status(200).json({
        message: "Tasks retrieved successfully",
        tasks,
      });
    }

    if (req.method === "POST") {
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: "Title is required" });

      // Check if the task already exists
      const existingTask = await Task.findOne({ title });
      if (existingTask) {
        return res.status(409).json({ error: "Task already exists" });
      }

      const task = await Task.create({ title });
      return res.status(201).json({
        message: "Task created successfully",
        task,
      });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "Task ID is required" });

      await Task.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Task deleted successfully",
      });
    }

    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error occurred:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}
