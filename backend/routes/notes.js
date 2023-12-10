const express = require("express");
const fetchuser = require("./middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE: 1 = Get all the notes User using: GET /api/auth/fetchnotes, Login required!
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE: 2 = Add a New Note using: POST /api/auth/addnotes, Login required!
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a uniqe title").isLength({ min: 4 }),
    body("description", "Description must bi atlist 5 character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are err returne bad request and with the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // import from Nots module
      const note = Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await note.save();
      res.json(saveNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE: 3 = Update an existing Note using: PUT /api/auth/updatenotes, Login required!
router.put("/updatenotes/:id",fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // create New notes object
    const newNotes = {}
    if(title){newNotes.title = title}
    if(description){newNotes.description = description}
    if(tag){newNotes.tag = tag}
// Find the note to be Updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
        return req.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id){
            return req.status(401).send(("Not Allowed"))
        };
        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNotes}, {new:true});
        res.json(note);
    });
module.exports = router;