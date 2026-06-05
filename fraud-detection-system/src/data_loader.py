import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def load_and_preprocess_data(file_path: str):
    """
    Loads the credit card fraud dataset, scales features, and splits into train/test sets.
    
    Args:
        file_path: Path to the creditcard.csv file.
        
    Returns:
        X_train, X_test, y_train, y_test
    """
    logger.info(f"Loading data from {file_path}...")
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        logger.error(f"Failed to load data: {e}")
        raise

    # The 'Time' and 'Amount' columns are the only ones not transformed by PCA.
    # We scale them to be in the same range as the V1-V28 features.
    scaler = StandardScaler()
    
    logger.info("Scaling 'Time' and 'Amount' features...")
    df['scaled_amount'] = scaler.fit_transform(df['Amount'].values.reshape(-1, 1))
    df['scaled_time'] = scaler.fit_transform(df['Time'].values.reshape(-1, 1))
    
    # Clean up original columns
    df.drop(['Time', 'Amount'], axis=1, inplace=True)
    
    # Reorder columns to put scaled features at the start (optional, but good for consistency)
    scaled_cols = ['scaled_time', 'scaled_amount']
    other_cols = [col for col in df.columns if col not in scaled_cols + ['Class']]
    df = df[scaled_cols + other_cols + ['Class']]

    X = df.drop('Class', axis=1)
    y = df['Class']

    # Stratified split ensures both sets have the same percentage of fraud cases.
    logger.info("Splitting data into stratified train and test sets...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    logger.info(f"Training set size: {len(X_train)} (Fraud: {y_train.sum()})")
    logger.info(f"Testing set size: {len(X_test)} (Fraud: {y_test.sum()})")
    
    return X_train, X_test, y_train, y_test

if __name__ == "__main__":
    # Quick test
    X_train, X_test, y_train, y_test = load_and_preprocess_data("fraud-detection-system/data/creditcard.csv")
