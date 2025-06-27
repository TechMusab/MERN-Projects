import Note from '../models/Note.js';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINAI_API_KEY,
});




export const getnotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.status(200).json({
      message: 'Notes retrieved successfully',
      notes: notes,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving notes',
      error: err.message,
    });
  }
};

export const addnote = async (req, res) => {
  const { description } = req.body;
  const note = new Note({
    description,
    userId: req.userId,
  });

  try {
    const savedNote = await note.save();
    res.status(201).json({
      message: 'Note saved successfully',
      noteId: savedNote._id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error saving note',
      error: err.message,
    });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const note = await Note.findById(id);
    if (!note || note.userId.toString() !== req.userId) {
      return res.status(404).json({
        message: 'Note not found or unauthorized access',
      });
    }

    note.description = description;
    const updatedNote = await note.save();
    res.status(200).json({
      message: 'Note updated successfully',
      note: updatedNote,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating note',
      error: err.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note || note.userId.toString() !== req.userId) {
      return res.status(404).json({
        message: 'Note not found or unauthorized access',
      });
    }

    await Note.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting note',
      error: err.message,
    });
  }
};

export const getSummary = async (req, res) => {
  try{
    const notes=req.body.notes
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize this in 1-2 lines:${notes}`,
    });
    res.status(200).json({
      message: 'Summary generated successfully',
      summary: response.text,
    })
  }
  catch (err) {
    res.status(500).json({
      message: 'Error generating summary',
      error: err.message,
    });
  }
};
