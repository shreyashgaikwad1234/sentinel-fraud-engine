import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix
import pandas as pd
import logging

logger = logging.getLogger(__name__)

def plot_confusion_matrix(y_true, y_pred, output_path="fraud-detection-system/models/confusion_matrix.png"):
    """
    Generates and saves a confusion matrix plot.
    """
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['Legit', 'Fraud'], 
                yticklabels=['Legit', 'Fraud'])
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.title('Confusion Matrix')
    plt.savefig(output_path)
    logger.info(f"Confusion matrix plot saved to {output_path}")

def get_fraud_summary(df):
    """
    Returns a quick summary of fraud vs legit transactions.
    """
    counts = df['Class'].value_counts()
    percentage = df['Class'].value_counts(normalize=True) * 100
    return pd.DataFrame({
        'Count': counts,
        'Percentage': percentage
    })
