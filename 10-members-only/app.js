const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: "localhost",
  user: "postgres",        // your Postgres username
  database: "top_users",   // your DB name
  password: "Ismail2006.,",// your Postgres password
  port: 5432,
});

