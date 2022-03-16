app.post("users/log-in/", passport.authenticate("local"), (req, res) => {
  req.redirect("/");
});

// Set up local strategy for our authentication (passport.authentication() uses these settings)
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      // Error occurred in our search
      if (err) return done(err);

      if (!user) {
        return done(null, false);
      }

      // Validates password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Password authenticated
          return done(null, user);
        } else {
          // passwords do not match
          return done(null, false);
        }
      });

      return done(null, user);
    });
  })
);
// Passport cookies serialization
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// When I hit this endpoint i get the error below
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
