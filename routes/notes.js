const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Get all notes for the logged-in user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
});

// Add a new note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Valid title is required").isLength({ min: 3 }),
    body("description", "Valid description is required").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.status(201).json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  }
);

// Update an existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
});

// Delete a note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note deleted", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
