var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const ytdl = require("ytdl-core");
require("dotenv").config();
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const readline = require("readline");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { default: axios } = require("axios");
const { auth } = require("google-auth-library");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// function authenticate() {
//   return gapi.auth2
//     .getAuthInstance()
//     .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
//     .then(
//       function () {
//         console.log("Sign-in successful");
//       },
//       function (err) {
//         console.error("Error signing in", err);
//       }
//     );
// }
// function loadClient() {
//   gapi.client.setApiKey(process.env.API_KEY);
//   return gapi.client
//     .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//     .then(
//       function () {
//         console.log("GAPI client loaded for API");
//       },
//       function (err) {
//         console.error("Error loading GAPI client for API", err);
//       }
//     );
// }
// // Make sure the client is loaded and sign-in is complete before calling this method.
// function execute() {
//   return gapi.client.youtube.search.list({}).then(
//     function (response) {
//       // Handle the results here (response.result has the parsed body).
//       console.log("Response", response);
//     },
//     function (err) {
//       console.error("Execute error", err);
//     }
//   );
// }
// gapi.load("client:auth2", function () {
//   gapi.auth2.init({ client_id: process.env.CLIENT_ID });
// });

const videoId = "YLslsZuEaNE";
console.log("hey");

// const getVideoInfo = async (id) => {
//   try {
//     const stream = await ytdl(id, { quality: "highestaudio" });
//     let start = Date.now();
//     ffmpeg(stream)
//       .audioBitrate(128)
//       .save(`/home/onifernando1/yt2mp3/server/a.mp3`)
//       .on("progress", (p) => {
//         readline.cursorTo(process.stdout, 0);
//         process.stdout.write(`${p.targetSize}kb downloaded`);
//       })
//       .on("end", () => {
//         console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// };
// getVideoInfo(videoId);

const getList = async () => {
  const list = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=${process.env.API_KEY}`
  );
  console.log(list.data.items[0].id.videoId);
};

getList();
module.exports = app;
