import React, { useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BiError } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

function PetRegistration() {
  const navigate = useNavigate();

  const formWizardRef = React.createRef();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/register", { replace: true });
  };

  const [firstTabInputs, setFirstTabInputs] = useState({
    fullName: "",
    address: "",
    mobile: "",
    ZipCode: "",
    vetName: "",
    vetRegisNum: "",
    petName: "",
    petBreed: "",
    petGender: "",
    petAge: "",
    neuterStatus: "",
    microChip: "",
    antiRabbiesVac: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    address: "",
    mobile: "",
    ZipCode: "",
    vetName: "",
    vetRegisNum: "",
    petName: "",
    petBreed: "",
    petGender: "",
    petAge: "",
    neuterStatus: "",
    microChip: "",
    antiRabbiesVac: "",
  });

  const validationRules = {
    fullName: {
      regex: /^[a-zA-Z.\s]+$/,
      minLength: 2,
      errorMsg: "Name must be atleast 2 characters long",
    },
    address: {
      minLength: 10,
      errorMsg: "Enter a valid address.",
    },
    mobile: {
      regex: /^[0-9]{10}$/,
      errorMsg: "Mobile number must be 10 digits.",
    },
    ZipCode: {
      errorMsg: "Valid zipcode required",
    },
    vetName: {
      regex: /^[a-zA-Z.\s]+$/,
      minLength: 2,
      errorMsg: "Field must contain letters only",
    },
    vetRegisNum: {
      regex: /^[a-zA-z 0-9]+$/,
      errorMsg: "Must be a valid field",
    },
    petName: {
      regex: /^[a-zA-Z.\s]+$/,
      minLength: 2,
      errorMsg: "Field must contain letters only",
    },
    petBreed: {
      errorMsg: "Field is required",
    },
    petGender: {
      errorMsg: "Field is required",
    },
    microChip: {
      errorMsg: "Field is required",
    },
    neuterStatus: {
      errorMsg: "Field is required",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFirstTabInputs({
      ...firstTabInputs,
      [name]: value,
    });

    // Validate input based on rules
    const rules = validationRules[name];
    if (rules) {
      if (rules.minLength && value.length < rules.minLength) {
        setErrors({
          ...errors,
          [name]: rules.errorMsg,
        });
      } else if (rules.regex && !rules.regex.test(value)) {
        setErrors({
          ...errors,
          [name]: rules.errorMsg,
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }
  };

  const handleComplete = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      // Retrieve the token from cookies
      const token = Cookies.get("token");
      console.log("Retrieved Token:", token);
      if (!token) {
        toast.error("Authentication token missing. Please log in.");
        navigate("/login");
        return;
      }
      //fetch data from frontend form
      // const response = await fetch(`http://localhost:1000/api/pet-register`, {
      const response = await fetch(`${window.location.origin}/api/pet-register`, {
        method: "POST",
        body: JSON.stringify({ firstTabInputs }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the response status
      const result = await response.json();
      // console.log(
      //   "Response Status:",
      //   response.status,
      //   "Response Data:",
      //   result
      // );
      console.log(
        "Response Status:",
        response.status,
      );

      if (response.ok) {
        //alert the user
        toast.success("Congratulations! Registration successful");

        // reset the fields on successful submission
        setFirstTabInputs({
          fullName: "",
          address: "",
          mobile: "",
          ZipCode: "",
          vetName: "",
          vetRegisNum: "",
          petName: "",
          petBreed: "",
          petGender: "",
          petAge: "",
          neuterStatus: "",
          microChip: "",
          antiRabbiesVac: "",
        });

        //log the person out
        setTimeout(() => {
          handleLogout();
        }, 5000);
      } else if (response.status === 409) {
        toast.error("The pet is already registered!");
        // reset the fields 
        setFirstTabInputs({
          fullName: "",
          address: "",
          mobile: "",
          ZipCode: "",
          vetName: "",
          vetRegisNum: "",
          petName: "",
          petBreed: "",
          petGender: "",
          petAge: "",
          neuterStatus: "",
          microChip: "",
          antiRabbiesVac: "",
        });
      } else {
        toast.error(result.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const maxDate = moment();
  maxDate.dayOfYear(maxDate.dayOfYear() - 1);
  const maxDateString = maxDate.format("YYYY-MM-DD");

  return (
    <>
      <div id="petRegister">
        <ToastContainer />
        <button
          type="button"
          style={{
            position: "relative",
            left: "2%",
            display: "block",
            padding: "6px",
            marginTop: "18px",
            cursor: "pointer",
            backgroundColor: "rgb(16, 165, 179)",
            border: "1px solid transparent",
            borderRadius: "5%",
            width: "90px",
            fontSize: "medium",
            color: "whitesmoke",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>

        <FormWizard
          stepSize="sm"
          ref={formWizardRef}
          color="blue"
          startIndex={0}
          onComplete={handleComplete}
        >
          <FormWizard.TabContent title="Pet Parent Information" icon="ti-user">
            <div className="form-control">
              <label className="form-label" htmlFor="fullname">
                Full name:
                <input
                  type="text"
                  id="fullname"
                  name="fullName"
                  className="form-input"
                  value={firstTabInputs.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>
              <p className="errorMsg">
                {errors.fullName && (
                  <>
                    <BiError /> {errors.fullName}
                  </>
                )}
              </p>
            </div>

            <div className="form-control">
              <label className="form-label" htmlFor="Address">
                Address:
                <textarea
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  value={firstTabInputs.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                  style={{ height: "70px" }}
                />
              </label>
              <p className="errorMsg">
                {errors.address && (
                  <>
                    <BiError /> {errors.address}
                  </>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="form-label" htmlFor="mobile">
                Mobile:
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  className="form-input"
                  value={firstTabInputs.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  min="1"
                  required
                />
              </label>
              <p className="errorMsg">
                {errors.mobile && (
                  <>
                    <BiError /> {errors.mobile}
                  </>
                )}
              </p>
            </div>

            <div className="form-control">
              <label className="form-label" htmlFor="ZipCode">
                Zip/Postal Code:
                <input
                  type="number"
                  id="ZipCode"
                  name="ZipCode"
                  className="form-input"
                  value={firstTabInputs.ZipCode}
                  onChange={handleInputChange}
                  placeholder="Enter your zip code"
                  min="0"
                  required
                />
              </label>
              <p className="errorMsg">
                {errors.ZipCode && (
                  <>
                    <BiError /> {errors.ZipCode}
                  </>
                )}
              </p>
            </div>

            <div className="form-control">
              <label className="form-label" htmlFor="vetName">
                Name of the Vet:
                <input
                  type="text"
                  id="vetName"
                  name="vetName"
                  className="form-input"
                  value={firstTabInputs.vetName}
                  onChange={handleInputChange}
                  placeholder="Enter name of Vet"
                  required
                />
              </label>
              <p className="errorMsg">
                {errors.vetName && (
                  <>
                    <BiError /> {errors.vetName}
                  </>
                )}
              </p>
            </div>

            <div className="form-control">
              <label className="form-label" htmlFor="vetRegis">
                Registration no of the Vet:
                <input
                  type="text"
                  id="vetRegisNum"
                  name="vetRegisNum"
                  className="form-input"
                  value={firstTabInputs.vetRegisNum}
                  onChange={handleInputChange}
                  placeholder="Registration Number of Vet"
                  required
                />
              </label>
              <p className="errorMsg">
                {errors.vetRegisNum && (
                  <>
                    <BiError /> {errors.vetRegisNum}
                  </>
                )}
              </p>
            </div>
          </FormWizard.TabContent>

          <FormWizard.TabContent title="Pet Details" icon="ti-heart">
            <div className="form-control">
              <label className="form-label" htmlFor="petName">
                Name of the Pet:
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  className="form-input"
                  value={firstTabInputs.petName}
                  onChange={handleInputChange}
                  placeholder="Enter pet's name"
                  required
                />
              </label>
              <p className="errorMsg">
                {errors.petName && (
                  <>
                    <BiError /> {errors.petName}
                  </>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="form-label" htmlFor="petBreed">
                Breed/ Species:
                <select
                  type="text"
                  id="petBreed"
                  name="petBreed"
                  className="form-input"
                  value={firstTabInputs.petBreed}
                  onChange={handleInputChange}
                  placeholder="Enter pet's breed"
                  required
                >
                  <option value="" selected>
                    Select
                  </option>
                  <label> Dogs </label>
                  <option value="Indie">Indie</option>
                  <option value="Golden Retriever">Golden Retriever</option>
                  <option value="German Shephard">German Shephard</option>
                  <option value="Cocker Spaniel">Cocker Spaniel</option>
                  <option value="Border Collie">Border Collie</option>
                  <option value="Shiba-Inu">Shiba-Inu</option>
                  <option value="Pomeranian">Pomeranian</option>
                  <option value="Dalmation">Dalmation</option>
                  <option value="Labrador">Labrador</option>
                  <option value="Shih-Tzu">Shih-Tzu</option>
                  <option value="Beagle">Beagle</option>
                  <option value="Boxer">Boxer</option>
                  <option value="Husky">Husky</option>
                  <option value="Pug">Pug</option>
                  <hr />
                  <label> Cats </label>
                  <option value="SiameseCat">Siamese cat</option>
                  <option value="americanShorthair">American Shorthair</option>
                  <option value="britishShorthand">British Shorthair</option>
                  <option value="bombayCat"> Bombay Cat </option>
                  <option value="abyssinianCat"> Abyssinian</option>
                  <option value="maineCoonCat"> Maine Coon</option>
                  <option value="scottishFold">Scottish Fold </option>
                  <option value="somaliCat">Somali Cat </option>
                </select>
              </label>
              <p className="errorMsg">
                {errors.petBreed && (
                  <>
                    <BiError /> {errors.petBreed}
                  </>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="form-label" htmlFor="petGender">
                Gender:
                <select
                  id="petGender"
                  name="petGender"
                  className="form-input"
                  value={firstTabInputs.petGender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" selected>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <p className="errorMsg">
                {errors.petGender && (
                  <>
                    <BiError /> {errors.petGender}
                  </>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="form-label" htmlFor="petAge">
                Age:
                <small style={{ fontWeight: "lighter", fontSize: "11px" }}>
                  Note: For 1 month old pet enter 0.1 and so on
                </small>
                <input
                  type="number"
                  id="petAge"
                  name="petAge"
                  className="form-input"
                  value={firstTabInputs.petAge}
                  onChange={handleInputChange}
                  placeholder="Enter age of the pet"
                  min="0"
                  max="18"
                  required
                />
                <p className="errorMsg">
                  {errors.petAge && (
                    <>
                      <BiError /> {errors.petAge}
                    </>
                  )}
                </p>
              </label>
            </div>
            <div className="form-control">
              <label className="form-label" htmlFor="neuterStatus">
                Neutered:
                <select
                  type="text"
                  id="neuterStatus"
                  name="neuterStatus"
                  className="form-input"
                  value={firstTabInputs.neuterStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" selected>
                    Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <p>
                {errors.neuterStatus && (
                  <>
                    <BiError /> {errors.neuterStatus}
                  </>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="form-label" htmlFor="microChip">
                Micro-Chipped?
                <select
                  type="text"
                  id="microChip"
                  name="microChip"
                  className="form-input"
                  value={firstTabInputs.microChip}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" selected>
                    Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <p className="errorMsg">
                {errors.neuterStatus && (
                  <>
                    <BiError /> {errors.neuterStatus}
                  </>
                )}
              </p>
            </div>
            <div className="form-control">
              <label className="form-label" htmlFor="antiRabbiesVac">
                {" "}
                Anti Rabbies Vaccination done on:
                <input
                  type="date"
                  id="antiRabbiesVac"
                  name="antiRabbiesVac"
                  min="2024-01-01"
                  max={maxDateString}
                  className="form-input"
                  value={firstTabInputs.antiRabbiesVac}
                  onChange={handleInputChange}
                  placeholder="Mention either yes or no"
                  required
                />
              </label>
            </div>
          </FormWizard.TabContent>
        </FormWizard>
      </div>
    </>
  );
}

export default PetRegistration;
