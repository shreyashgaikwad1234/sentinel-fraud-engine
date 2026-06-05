import pandas as pd
import requests
import time
import random
import json
import logging
import os

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def simulate_transactions(data_path, api_url="http://localhost:8000/predict", delay=2):
    """
    Reads the dataset and sends random transactions to the API to simulate real-world traffic.
    """
    logger.info(f"Loading data from {data_path}...")
    df = pd.read_csv(data_path)
    
    # Simple preprocessing to match model input (Time and Amount scaling)
    # Note: In a real system, the API would handle raw data and scale it using a saved scaler.
    # For this simulation, we'll just use the raw features V1-V28 and mock scaled_time/scaled_amount.
    
    features = [f'V{i}' for i in range(1, 29)]
    
    logger.info(f"Starting simulation. Sending requests to {api_url} every {delay} seconds...")
    logger.info("Press Ctrl+C to stop.")

    try:
        while True:
            # Pick a random row
            sample = df.sample(n=1).iloc[0]
            
            # Prepare payload
            payload = {
                "scaled_time": float(sample['Time'] / 100000), # Mock scaling
                "scaled_amount": float(sample['Amount'] / 1000), # Mock scaling
            }
            for f in features:
                payload[f] = float(sample[f])
            
            # Send to API
            try:
                response = requests.post(api_url, json=payload, timeout=5)
                result = response.json()
                
                status = "🚨 FRAUD DETECTED" if result['is_fraud'] else "✅ LEGIT"
                logger.info(f"Txn Amount: ${sample['Amount']:>8.2f} | Status: {status} | Prob: {result['fraud_probability']:.4f}")
                
            except requests.exceptions.ConnectionError:
                logger.error("Could not connect to API. Is it running?")
            except Exception as e:
                logger.error(f"Error during request: {e}")
                
            time.sleep(delay)
            
    except KeyboardInterrupt:
        logger.info("Simulation stopped by user.")

if __name__ == "__main__":
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    DATA_PATH = os.path.join(project_root, "data", "creditcard.csv")
    simulate_transactions(DATA_PATH)
