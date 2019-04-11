const express = require("express");
const passport = require("passport");
const Account = require("../models/account");
const Formation = require("../models/formation");
const Question = require("../models/question");
const router = express.Router();

const fetch = require("node-fetch");

let id = "";

//API Key= 5edd98ce34fbd27acab549e7451bbafcf13f243565ebf20828fdf4625b7e2962

/*https://apifootball.com/api/?action=get_countries&APIkey=xxxxxxxxxxxxxx*/

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/register", (req, res) => {
  res.render("register", {});
});

// get questions
router.get("/questions", (req, res) => {
  Question.find().then(questions => {
    res.send(questions);
  });
});

// post questions
router.post("/questions", async (req, res) => {
  const question = new Question({
    ...req.body
    // not sure how to work this with best practice here
    // owner: req.user._id
    //owner: id
  });

  try {
    await question.save();
    res.status(201).send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/question/:index", async (req, res) => {
  try {
    await Question.findOne({ index: req.params.index }).then(data => {
      console.log(data);
      let question = data.question;
      let choices = data.choices;
      let answer = data.answer;
      let youtubeLink = data.youtubeLink;
      // res.render("question", { question.question, question.answer, question.choices, question.youtubeLink });
      res.render("question", { question, answer, choices, youtubeLink });
    });
  } catch (e) {}
});

// router.get("/question/1", (req, res) => {
//   let question = "Take the gun or take the Cannoli?";
//   let choices = ["Cannoli", "Gun"];
//   let answer = "Cannoli";
//   let youtubeLink = "https://www.youtube.com/embed/yHzh0PvMWTI?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });

// router.get("/question/2", (req, res) => {
//   let question = "Side with the Tattaglia's or the Corleone's?";
//   let choices = ["Tattaglia", "Corleone"];
//   let answer = "Corleone";
//   let youtubeLink = "https://www.youtube.com/embed/sJU2cz9ytPQ?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });

// // don't know handlebars well enough to get the spaces in the string working

// router.get("/question/3", (req, res) => {
//   let question =
//     "Move Vito to room 5, room 7, room 15, or a room with no label?";
//   let choices = ["Room5", "Nolabel"];
//   let answer = "Nolabel";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });

// router.get("/question/4", (req, res) => {
//   let question = "Dummy Question";
//   let choices = ["Right", "Wrong"];
//   let answer = "Right";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });

// router.get("/question/5", (req, res) => {
//   let question = "Dummy Question 5";
//   let choices = ["Wrong", "Right"];
//   let answer = "Right";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });
// router.get("/question/6", (req, res) => {
//   let question = "Dummy Question 6";
//   let choices = ["Right", "Wrong"];
//   let answer = "Right";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });
// router.get("/question/7", (req, res) => {
//   let question = "Dummy Question 7";
//   let choices = ["Wrong", "Right"];
//   let answer = "Right";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });
// router.get("/question/8", (req, res) => {
//   let question = "Dummy Question 8";
//   let choices = ["Right", "Wrong"];
//   let answer = "Right";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });
// router.get("/question/9", (req, res) => {
//   let question = "Dummy Question 9";
//   let choices = ["Wrong", "Right"];
//   let answer = "Right";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });

// router.get("/question/10", (req, res) => {
//   let question = "Dummy Question 10";
//   let choices = ["Right", "Wrong"];
//   let answer = "Right";
//   let youtubeLink = "https://www.youtube.com/embed/QNuzgDrUXP0?autoplay=1";
//   res.render("question", { question, answer, choices, youtubeLink });
// });

router.get("/question/11", (req, res) => {
  let question = "You win!";
  let choices = ["YOUWIN!"];
  let answer = "";
  let youtubeLink = "https://www.youtube.com/embed/1zBwKbq02ds?autoplay=1";
  res.render("question", { question, answer, choices, youtubeLink });
});

router.get("/add-question", (req, res) => {
  res.render("add-question");
});

router.post("/register", (req, res, next) => {
  Account.register(
    new Account({ username: req.body.username, points: 10 }),
    req.body.password,
    (err, account) => {
      if (err) {
        return res.render("register", { error: err.message });
      }

      passport.authenticate("local")(req, res, () => {
        id = req.user._id;
        req.session.save(err => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    }
  );
});

router.get("/get-id", (req, res) => {
  res.send(id);
});

router.get("/soccer", (req, res) => {
  fetch(
    "https://apifootball.com/api/?action=get_countries&APIkey=5edd98ce34fbd27acab549e7451bbafcf13f243565ebf20828fdf4625b7e2962"
  )
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.render("soccer", { beans: "10", teams: json });
    });
});

router.post("/newFormation", (req, res) => {
  let formation = new Formation(req.body);
  console.log(req.body, req.user._id);
  formation["date"] = new Date();
  formation["author"] = req.user._id;
  formation.save((err, f) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(f);
    res.redirect(`/formation/${f._id}`);
  });
});

//load the formation based on id
router.get("/formation/:id", (req, res) => {
  console.log(req.params);
  //res.render('formation');

  Formation.findOne({ _id: req.params.id })
    .exec()
    .then(f => {
      res.render("formation", { formation: f, user: req.user });
    })
    .catch(err => {
      throw err;
    });
});

//load accounts to get data for high scores
router.get("/accounts", (req, res) => {
  Account.find().then(accounts => {
    res.send(accounts);
  });
});

// get req
router.get("/get-req", (req, res) => {
  console.log(req);
});

//load account based on id
router.get("/account/:id", (req, res) => {
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  //res.render('formation');

  Account.findById(req.params.id)
    .then(account => {
      res.send(account);
      //   res.render("formation", { formation: f, user: req.user });
    })
    .catch(err => {
      throw err;
    });

  //   Account.findOne({ _id: req.params.id })
  //     .exec()
  //     .then(f => {
  //       console.log(f);
  //       //   res.render("formation", { formation: f, user: req.user });
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
});

router.patch("/account/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = "points";
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// why won't this work?
// router.delete("/account/:id", async (req, res) => {
//   try {
//     const user = await Account.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

router.delete("/account/:id", async (req, res) => {
  try {
    const user = await Account.findByIdAndRemove(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/profile", (req, res) => {
  // Formation.find({ author: req.user._id })
  //   .exec()
  //   .then(f => {
  //     res.render("profile", { user: req.user, formations: f });
  //   })
  //   .catch(err => {
  //     throw err;
  //   });
  res.render("profile", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user, error: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res, next) => {
    id = req.user._id;
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.redirect("/profile");
    });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  req.session.save(err => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/ping", (req, res) => {
  res.status(200).send("pong!");
});

module.exports = router;
