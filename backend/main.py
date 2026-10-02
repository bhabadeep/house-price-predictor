from fastapi import FastAPI
from pydantic import BaseModel, Field, ConfigDict
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


# Create FastAPI application
app = FastAPI()


# Load the trained machine learning pipeline
model = joblib.load("house_price_pipeline.pkl")


# Allow our React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define the data that the API will receive
class HouseData(BaseModel):

    OverallQual: float
    GrLivArea: float
    TotalSF: float
    LotArea: float
    YearBuilt: float
    YearRemodAdd: float
    TotalBsmtSF: float

    first_flr_sf: float = Field(alias="1stFlrSF")
    second_flr_sf: float = Field(alias="2ndFlrSF")

    FullBath: float
    HalfBath: float
    BedroomAbvGr: float
    TotRmsAbvGrd: float
    GarageCars: float
    GarageArea: float

    Neighborhood: str
    KitchenQual: str
    GarageFinish: str

    model_config = ConfigDict(populate_by_name=True)


# Home route
@app.get("/")
def home():
    return {
        "message": "House Price Prediction API is running!"
    }


# Prediction route
@app.post("/predict")
def predict(data: HouseData):

    # Convert the received data into a pandas DataFrame
    input_data = pd.DataFrame([
        data.model_dump(by_alias=True)
    ])

    # Make prediction using the trained pipeline
    prediction = model.predict(input_data)[0]

    # Return prediction as JSON
    return {
        "predicted_price": float(prediction)
    }