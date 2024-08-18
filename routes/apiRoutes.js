require('dotenv').config()
const express = require("express");
const router = express.Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Pet = require("../model/petData");
const auth = require("../middlewares/auth");


// API Endpoint
router.post("/register", async (req, res) => {
    try {
        // get all data from the body or url
        const { firstname, lastname, email, password } = req.body;

        // all data should exist
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("All fields are required!");
        }

        // validate the user with the regex

        // Validate firstname and lastname minimum length
        if (firstname.length < 2 || lastname.length < 2) {
            return res.status(400).json({
                error: "First name and last name must be at least 2 characters long",
            });
        }

        // validate first name
        const firstnameRegex = /^[a-zA-Z.\s]+$/;
        if (!firstnameRegex.test(firstname)) {
            return res
                .status(400)
                .json({ error: "First name can contain only letters" });
        }

        // validate last name
        const lastnameRegex = /^[a-zA-Z.\s]+$/;
        if (!lastnameRegex.test(lastname)) {
            return res
                .status(400)
                .json({ error: "Last name can contain only letters" });
        }

        // Validate email format
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ error: "Please enter a valid email address" });
        }

        // Validate password format
        const passwordRegex =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ error: "User with this email already exists" });
        }

        // encrypt the password
        const hashPassword = await bcrypt.hash(password, 10);

        // save the user in db
        const createUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });

        //generate token for user and send it
        const token = jwt.sign(
            {
                id: createUser._id,
                email,
            },

            process.env.JWT_SECRET_KEY,

            {
                expiresIn: "2h",
            }
        );

        createUser.token = token;
        createUser.password = undefined;
        //send response indicating successful user creation
        res.status(201).json(createUser);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "No user found with this email. Please sign up."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "2h",
        });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            path: "/",
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        };
        res.cookie("token", token, options);

        const userData = {
            id: user._id,
            email: user.email,
        };

        res.status(200).json({ user: userData, token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// pet registration endpoint
router.post("/pet-register", auth, async (req, res) => {
    console.log("Received pet registration request");
    // console.log("User ID:", req.userId);
    // console.log("User Email:", req.email);
    // console.log("Request body:", req.body);

    // Get all data from the request body
    const {
        fullName,
        address,
        mobile,
        ZipCode,
        vetName,
        vetRegisNum,
        petName,
        petBreed,
        petGender,
        petAge,
        neuterStatus,
        microChip,
        antiRabbiesVac,
    } = req.body.firstTabInputs;

    // Check if all required fields are present
    if (
        !(
            fullName &&
            address &&
            mobile &&
            ZipCode &&
            vetName &&
            vetRegisNum &&
            petName &&
            petBreed &&
            petGender &&
            petAge &&
            neuterStatus &&
            microChip &&
            antiRabbiesVac
        )
    ) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    // Validate full name with regex
    const fullNameRegex = /^[a-zA-Z.\s]+$/;
    if (!fullNameRegex.test(fullName)) {
        return res.status(400).json({ error: "Name can contain only letters" });
    }

    // Validate mobile number with regex
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ error: "Enter valid mobile number" });
    }

    // Validate zip code with regex
    const ZipCodeRegex = /^\d{6}$/;
    if (!ZipCodeRegex.test(ZipCode)) {
        return res.status(400).json({ error: "Enter valid 6 digit zipcode" });
    }

    // Create a new Pet instance
    const newPet = new Pet({
        fullName,
        address,
        mobile,
        ZipCode,
        vetName,
        vetRegisNum,
        petName,
        petBreed,
        petGender,
        petAge,
        neuterStatus,
        microChip,
        antiRabbiesVac,
        parentEmail: req.email,
    });

    // attach parentEmail
    newPet.parentEmail = req.email;

    try {
        // Check if email and petName already exist in the database
        const existingPet = await Pet.findOne({ parentEmail: req.email, petName });

        if (existingPet) {
            return res.status(409).json({ message: "The pet is already registered" });
        } else {
            await newPet.save();
            return res.status(201).json({ message: "Pet registration successful!" });
        }

    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: "Validation failed", details: validationErrors });
        }
        return res.status(500).json({ error: "An unexpected error occurred during registration" });
    }
});

//logout endpoint
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out" });
});


module.exports = router;