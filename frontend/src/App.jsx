import { useState } from "react";
import {
  HomeIcon,
  BuildingOffice2Icon,
  Square3Stack3DIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  SparklesIcon,
  CalculatorIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    OverallQual: "",
    GrLivArea: "",
    TotalSF: "",
    LotArea: "",
    YearBuilt: "",
    YearRemodAdd: "",
    TotalBsmtSF: "",
    "1stFlrSF": "",
    "2ndFlrSF": "",
    FullBath: "",
    HalfBath: "",
    BedroomAbvGr: "",
    TotRmsAbvGrd: "",
    GarageCars: "",
    GarageArea: "",
    Neighborhood: "",
    KitchenQual: "",
    GarageFinish: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setError("");
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        return "Please fill in all the fields.";
      }
    }

    if (
      Number(formData.OverallQual) < 1 ||
      Number(formData.OverallQual) > 10
    ) {
      return "Overall House Quality must be between 1 and 10.";
    }

    if (Number(formData.GrLivArea) <= 0) {
      return "Living Area must be greater than 0.";
    }

    if (Number(formData.TotalSF) <= 0) {
      return "Total House Area must be greater than 0.";
    }

    if (Number(formData.LotArea) <= 0) {
      return "Total Land Area must be greater than 0.";
    }

    if (
      Number(formData.YearBuilt) < 1800 ||
      Number(formData.YearBuilt) > currentYear
    ) {
      return `Year Built must be between 1800 and ${currentYear}.`;
    }

    if (
      Number(formData.YearRemodAdd) < 1800 ||
      Number(formData.YearRemodAdd) > currentYear
    ) {
      return `Year Remodeled must be between 1800 and ${currentYear}.`;
    }

    if (
      Number(formData.YearRemodAdd) <
      Number(formData.YearBuilt)
    ) {
      return "Year Remodeled cannot be earlier than Year Built.";
    }

    if (Number(formData.TotalBsmtSF) < 0) {
      return "Basement Area cannot be negative.";
    }

    if (Number(formData["1stFlrSF"]) <= 0) {
      return "1st Floor Area must be greater than 0.";
    }

    if (Number(formData["2ndFlrSF"]) < 0) {
      return "2nd Floor Area cannot be negative.";
    }

    if (
      Number(formData.FullBath) < 0 ||
      Number(formData.FullBath) > 10
    ) {
      return "Full Bathrooms must be between 0 and 10.";
    }

    if (
      Number(formData.HalfBath) < 0 ||
      Number(formData.HalfBath) > 10
    ) {
      return "Half Bathrooms must be between 0 and 10.";
    }

    if (
      Number(formData.BedroomAbvGr) < 0 ||
      Number(formData.BedroomAbvGr) > 20
    ) {
      return "Bedrooms must be between 0 and 20.";
    }

    if (
      Number(formData.TotRmsAbvGrd) < 1 ||
      Number(formData.TotRmsAbvGrd) > 30
    ) {
      return "Total Rooms must be between 1 and 30.";
    }

    if (
      Number(formData.GarageCars) < 0 ||
      Number(formData.GarageCars) > 10
    ) {
      return "Garage Capacity must be between 0 and 10 cars.";
    }

    if (Number(formData.GarageArea) < 0) {
      return "Garage Area cannot be negative.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPrediction(null);
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const inputData = {
        OverallQual: Number(formData.OverallQual),
        GrLivArea: Number(formData.GrLivArea),
        TotalSF: Number(formData.TotalSF),
        LotArea: Number(formData.LotArea),
        YearBuilt: Number(formData.YearBuilt),
        YearRemodAdd: Number(formData.YearRemodAdd),
        TotalBsmtSF: Number(formData.TotalBsmtSF),
        "1stFlrSF": Number(formData["1stFlrSF"]),
        "2ndFlrSF": Number(formData["2ndFlrSF"]),
        FullBath: Number(formData.FullBath),
        HalfBath: Number(formData.HalfBath),
        BedroomAbvGr: Number(formData.BedroomAbvGr),
        TotRmsAbvGrd: Number(formData.TotRmsAbvGrd),
        GarageCars: Number(formData.GarageCars),
        GarageArea: Number(formData.GarageArea),
        Neighborhood: formData.Neighborhood,
        KitchenQual: formData.KitchenQual,
        GarageFinish: formData.GarageFinish
      };

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inputData)
        }
      );

      if (!response.ok) {
        throw new Error("Prediction request failed.");
      }

      const result = await response.json();

      setPrediction(result.predicted_price);

    } catch (error) {
      setError(
        "Unable to connect to the prediction server. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <div className="top-line" />

      <div className="container">

        {/* Header */}

        <header className="hero">

          <div className="hero-meta">
            <span className="hero-number">01</span>
            <span>ML HOUSE VALUATION</span>
          </div>

          <div className="hero-content">

            <div>
              <h1>
                House
                <br />
                Price
                <br />
                Prediction<span className="red-dot">.</span>
              </h1>
            </div>

            <div className="hero-description">
              <div className="hero-icon">
                <HomeIcon />
              </div>

              <p>
                Estimate the market value of a house using
                property characteristics and a trained
                machine learning model.
              </p>

              <div className="hero-rule" />

              <span>
                RANDOM FOREST REGRESSION
              </span>
            </div>

          </div>

        </header>


        {/* Form */}

        <form
          className="house-form"
          onSubmit={handleSubmit}
        >

          {/* Property */}

          <section className="form-section">

            <div className="section-heading">

              <div className="section-icon">
                <BuildingOffice2Icon />
              </div>

              <div>
                <span className="section-number">
                  01
                </span>

                <h2>
                  Property Information
                </h2>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">
                <label>
                  Overall House Quality
                  <span>1–10</span>
                </label>

                <input
                  type="number"
                  name="OverallQual"
                  value={formData.OverallQual}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  step="1"
                  placeholder="e.g. 7"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Living Area
                  <span>sq ft</span>
                </label>

                <input
                  type="number"
                  name="GrLivArea"
                  value={formData.GrLivArea}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  placeholder="e.g. 1710"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Total House Area
                  <span>sq ft</span>
                </label>

                <input
                  type="number"
                  name="TotalSF"
                  value={formData.TotalSF}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  placeholder="e.g. 2560"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Total Land Area
                  <span>sq ft</span>
                </label>

                <input
                  type="number"
                  name="LotArea"
                  value={formData.LotArea}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  placeholder="e.g. 8450"
                  required
                />
              </div>


              <div className="form-group">
                <label>Year Built</label>

                <input
                  type="number"
                  name="YearBuilt"
                  value={formData.YearBuilt}
                  onChange={handleChange}
                  min="1800"
                  max={currentYear}
                  step="1"
                  placeholder="e.g. 2003"
                  required
                />
              </div>


              <div className="form-group">
                <label>Year Remodeled</label>

                <input
                  type="number"
                  name="YearRemodAdd"
                  value={formData.YearRemodAdd}
                  onChange={handleChange}
                  min="1800"
                  max={currentYear}
                  step="1"
                  placeholder="e.g. 2010"
                  required
                />
              </div>

            </div>

          </section>


          {/* Interior */}

          <section className="form-section">

            <div className="section-heading">

              <div className="section-icon">
                <Square3Stack3DIcon />
              </div>

              <div>
                <span className="section-number">
                  02
                </span>

                <h2>
                  Interior
                </h2>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">
                <label>
                  Basement Area
                  <span>sq ft</span>
                </label>

                <input
                  type="number"
                  name="TotalBsmtSF"
                  value={formData.TotalBsmtSF}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="e.g. 856"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  1st Floor Area
                  <span>sq ft</span>
                </label>

                <input
                  type="number"
                  name="1stFlrSF"
                  value={formData["1stFlrSF"]}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  placeholder="e.g. 856"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  2nd Floor Area
                  <span>sq ft</span>
                </label>

                <input
                  type="number"
                  name="2ndFlrSF"
                  value={formData["2ndFlrSF"]}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="e.g. 854"
                  required
                />
              </div>


              <div className="form-group">
                <label>Full Bathrooms</label>

                <input
                  type="number"
                  name="FullBath"
                  value={formData.FullBath}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  placeholder="e.g. 2"
                  required
                />
              </div>


              <div className="form-group">
                <label>Half Bathrooms</label>

                <input
                  type="number"
                  name="HalfBath"
                  value={formData.HalfBath}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  placeholder="e.g. 1"
                  required
                />
              </div>


              <div className="form-group">
                <label>Number of Bedrooms</label>

                <input
                  type="number"
                  name="BedroomAbvGr"
                  value={formData.BedroomAbvGr}
                  onChange={handleChange}
                  min="0"
                  max="20"
                  step="1"
                  placeholder="e.g. 3"
                  required
                />
              </div>


              <div className="form-group">
                <label>Total Rooms</label>

                <input
                  type="number"
                  name="TotRmsAbvGrd"
                  value={formData.TotRmsAbvGrd}
                  onChange={handleChange}
                  min="1"
                  max="30"
                  step="1"
                  placeholder="e.g. 7"
                  required
                />
              </div>

            </div>

          </section>


          {/* Garage & Location */}

          <section className="form-section">

            <div className="section-heading">

              <div className="section-icon">
                <WrenchScrewdriverIcon />
              </div>

              <div>
                <span className="section-number">
                  03
                </span>

                <h2>
                  Garage & Location
                </h2>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">
                <label>
                  Garage Capacity
                  <span>cars</span>
                </label>

                <input
                  type="number"
                  name="GarageCars"
                  value={formData.GarageCars}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  placeholder="e.g. 2"
                  required
                />
              </div>


              <div className="form-group">
                <label>
                  Garage Area
                  <span>sq ft</span>
                </label>

                <input
                  type="number"
                  name="GarageArea"
                  value={formData.GarageArea}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="e.g. 548"
                  required
                />
              </div>


              {/* Neighborhood */}

              <div className="form-group">

                <label>
                  Neighborhood
                </label>

                <select
                  name="Neighborhood"
                  value={formData.Neighborhood}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select neighborhood
                  </option>

                  <option value="Blmngtn">
                    Bloomington Heights
                  </option>

                  <option value="Blueste">
                    Bluestem
                  </option>

                  <option value="BrDale">
                    Briardale
                  </option>

                  <option value="BrkSide">
                    Brookside
                  </option>

                  <option value="ClearCr">
                    Clear Creek
                  </option>

                  <option value="CollgCr">
                    College Creek
                  </option>

                  <option value="Crawfor">
                    Crawford
                  </option>

                  <option value="Edwards">
                    Edwards
                  </option>

                  <option value="Gilbert">
                    Gilbert
                  </option>

                  <option value="IDOTRR">
                    Iowa DOT & Rail Road
                  </option>

                  <option value="MeadowV">
                    Meadow Village
                  </option>

                  <option value="Mitchel">
                    Mitchell
                  </option>

                  <option value="NAmes">
                    North Ames
                  </option>

                  <option value="NoRidge">
                    Northridge
                  </option>

                  <option value="NPkVill">
                    Northpark Villa
                  </option>

                  <option value="NridgHt">
                    Northridge Heights
                  </option>

                  <option value="NWAmes">
                    Northwest Ames
                  </option>

                  <option value="OldTown">
                    Old Town
                  </option>

                  <option value="Sawyer">
                    Sawyer
                  </option>

                  <option value="SawyerW">
                    Sawyer West
                  </option>

                  <option value="Somerst">
                    Somerset
                  </option>

                  <option value="StoneBr">
                    Stone Brook
                  </option>

                  <option value="SWISU">
                    Southwest Iowa State University
                  </option>

                  <option value="Timber">
                    Timberland
                  </option>

                  <option value="Veenker">
                    Veenker
                  </option>

                </select>

              </div>


              {/* Kitchen */}

              <div className="form-group">

                <label>
                  Kitchen Quality
                </label>

                <select
                  name="KitchenQual"
                  value={formData.KitchenQual}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select quality
                  </option>

                  <option value="Ex">
                    Excellent
                  </option>

                  <option value="Gd">
                    Good
                  </option>

                  <option value="TA">
                    Typical / Average
                  </option>

                  <option value="Fa">
                    Fair
                  </option>

                  <option value="Po">
                    Poor
                  </option>

                </select>

              </div>


              {/* Garage Finish */}

              <div className="form-group">

                <label>
                  Garage Finish
                </label>

                <select
                  name="GarageFinish"
                  value={formData.GarageFinish}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select finish
                  </option>

                  <option value="Fin">
                    Finished
                  </option>

                  <option value="RFn">
                    Partially Finished
                  </option>

                  <option value="Unf">
                    Unfinished
                  </option>

                  <option value="None">
                    No Garage
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* Error */}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* Action */}

          <div className="action-area">

            <div className="action-info">

              <CalculatorIcon />

              <span>
                Estimate using the trained
                Random Forest model
              </span>

            </div>


            <button
              type="submit"
              className="predict-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="loading-dot" />
                  Predicting...
                </>
              ) : (
                <>
                  Predict House Price
                  <ArrowRightIcon />
                </>
              )}

            </button>

          </div>


          {/* Prediction */}

          {prediction !== null && (

            <div className="prediction-result">

              <div className="prediction-top">

                <div className="prediction-icon">
                  <SparklesIcon />
                </div>

                <span>
                  MODEL ESTIMATE
                </span>

              </div>


              <h2>
                Estimated House Price
              </h2>


              <div className="prediction-price">

                $
                {prediction.toLocaleString(
                  "en-US",
                  {
                    maximumFractionDigits: 0
                  }
                )}

              </div>


              <p className="prediction-note">
                Estimated from the property
                characteristics provided above.
              </p>

            </div>

          )}

        </form>


        {/* Footer */}

        <footer className="footer">

          <span>
            HOUSE PRICE PREDICTION
          </span>

          <span>
            MACHINE LEARNING PROJECT
          </span>

        </footer>

      </div>

    </div>
  );
}

export default App;