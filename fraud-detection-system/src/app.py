from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os
from collections import deque
from datetime import datetime

app = FastAPI(title="Fraud Detection API")

# Add CORS support
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for recent transactions
transaction_history = deque(maxlen=100)
stats = {"total_transactions": 0, "total_frauds": 0}

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "fraud_model.joblib")
model = None

class Transaction(BaseModel):
    # This matches the feature set expected by the model
    # (scaled_time, scaled_amount, V1, V2, ... V28)
    scaled_time: float
    scaled_amount: float
    V1: float
    V2: float
    V3: float
    V4: float
    V5: float
    V6: float
    V7: float
    V8: float
    V9: float
    V10: float
    V11: float
    V12: float
    V13: float
    V14: float
    V15: float
    V16: float
    V17: float
    V18: float
    V19: float
    V20: float
    V21: float
    V22: float
    V23: float
    V24: float
    V25: float
    V26: float
    V27: float
    V28: float

@app.on_event("startup")
def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
    else:
        print(f"Warning: Model file not found at {MODEL_PATH}. API will return 503.")

@app.get("/")
def read_root():
    return {"status": "Fraud Detection API is running"}

@app.get("/transactions")
def get_transactions():
    return list(transaction_history)

@app.get("/stats")
def get_stats():
    return stats

@app.post("/predict")
def predict(transaction: Transaction):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please train the model first.")
    
    # Convert input to DataFrame for the model
    transaction_dict = transaction.dict()
    data = pd.DataFrame([transaction_dict])
    
    # Prediction
    prediction = int(model.predict(data)[0])
    probability = float(model.predict_proba(data)[0][1])
    
    result = {
        "id": f"tx_{int(datetime.now().timestamp() * 1000)}",
        "timestamp": datetime.now().isoformat(),
        "amount": round(transaction_dict['scaled_amount'] * 1000, 2), # Simplified inverse scaling
        "is_fraud": prediction == 1,
        "fraud_probability": round(probability, 4),
        "action": "BLOCK" if prediction == 1 else "ALLOW"
    }
    
    # Update history and stats
    transaction_history.appendleft(result)
    stats["total_transactions"] += 1
    if prediction == 1:
        stats["total_frauds"] += 1
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
