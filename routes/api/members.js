const express = require("express");
const members = require("../../Members");
const uuid = require("uuid");

const router = express.Router();

// Get all members
router.get("/", (req, res, err) => {
  res.json(members);
});

// Get a member by ID
router.get("/:id", (req, res, err) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(
      members.filter(member => member.id === parseInt(req.params.id))[0]
    );
  } else {
    res.status(400).json({ msg: `No member with an ID of ${req.params.id}.` });
  }
});

// Create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    status: req.body.status
  };

  if (!newMember.name || !newMember.status) {
    res.status(400).json({ msg: "Please add name and status." });
  } else {
    members.push(newMember);
    res.json({ msg: "Thank you for your addition!", members: members });
    // res.redirect('/')
  }
});

// Update a member by ID
router.put("/:id", (req, res, err) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        const { id, name, status } = member;

        member.status = updMember.status ? updMember.status : member.status;
        member.name = updMember.name ? updMember.name : member.name;

        res.json({
          msg: `Member with an ID of ${req.params.id} is updated to: `,
          member,
          from: { id, name, status }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with an ID of ${req.params.id}.` });
  }
});

// Delete a member by ID
router.delete("/:id", (req, res, err) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.status(200).json({
      msg: `Member was deleted.`,
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with an ID of ${req.params.id}.` });
  }
});
module.exports = router;
