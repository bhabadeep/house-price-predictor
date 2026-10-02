# House Price Prediction

A machine learning web application that predicts the estimated sale price of a house based on its property, interior, garage, and location-related features.

## Project Overview

This project uses a Random Forest Regression model trained on the Ames Housing dataset to estimate house prices.

The trained machine learning pipeline is integrated with a FastAPI backend and a React frontend.

The application follows this flow:

React Frontend
↓
FastAPI Backend
↓
Machine Learning Pipeline
↓
Random Forest Model
↓
Predicted House Price
↓
React Frontend


## Technologies Used

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Random Forest Regressor
- Joblib

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- React
- Vite
- JavaScript
- CSS

## Machine Learning Model

The final deployment model uses a Random Forest Regressor with:

- Number of trees: 100
- Random state: 42

The model is stored together with its preprocessing steps in:

`house_price_pipeline.pkl`

The pipeline handles numerical missing values, categorical missing values, and categorical encoding before passing the processed data to the Random Forest model.

## Input Features

The web application uses 18 features:

### Numerical Features

- OverallQual
- GrLivArea
- TotalSF
- LotArea
- YearBuilt
- YearRemodAdd
- TotalBsmtSF
- 1stFlrSF
- 2ndFlrSF
- FullBath
- HalfBath
- BedroomAbvGr
- TotRmsAbvGrd
- GarageCars
- GarageArea

### Categorical Features

- Neighborhood
- KitchenQual
- GarageFinish

## Model Performance

The full Random Forest model evaluated on the held-out test set achieved:

- MAE: 18,098.53
- RMSE: 30,085.51
- R²: 0.8820

A 5-fold cross-validation experiment on the earlier full-feature Random Forest model produced an average R² of approximately 0.862.## Model Performance

The deployment model uses 18 selected features and a Random Forest Regressor.

On the 20% held-out test set, the deployment pipeline achieved:

- MAE: 17,998.57
- RMSE: 28,582.50
- R²: 0.8935

Five-fold cross-validation produced:

- Mean R²: 0.8550
- Standard Deviation: 0.0263

The five cross-validation R² scores were:

0.8658, 0.8178, 0.8842, 0.8768, 0.8301

## Project Structure

```text
house-price-predictor/
│
├── .gitignore
│
├── backend/
│   ├── house_price_pipeline.pkl
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── venv312/
│
└── README.md