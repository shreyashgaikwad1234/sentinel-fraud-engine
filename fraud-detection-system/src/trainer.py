import logging
import joblib
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline
from sklearn.metrics import classification_report, confusion_matrix, average_precision_score
import os

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def train_fraud_model(X_train, y_train, X_test, y_test, model_path="fraud-detection-system/models/fraud_model.joblib"):
    """
    Trains an XGBoost model using SMOTE for oversampling.
    
    Args:
        X_train, y_train: Training data and labels.
        X_test, y_test: Evaluation data and labels.
        model_path: Where to save the trained model.
    """
    # Using a Pipeline ensures SMOTE is only applied to the training data during cross-validation
    # and not the validation/test data.
    logger.info("Initializing SMOTE + XGBoost pipeline...")
    
    pipeline = Pipeline([
        ('smote', SMOTE(random_state=42)),
        ('classifier', XGBClassifier(
            n_estimators=100,
            max_depth=6,
            learning_rate=0.1,
            random_state=42,
            use_label_encoder=False,
            eval_metric='logloss'
        ))
    ])

    logger.info("Starting model training (this may take a minute due to oversampling)...")
    pipeline.fit(X_train, y_train)
    
    logger.info("Evaluating model performance...")
    y_pred = pipeline.predict(X_test)
    y_probs = pipeline.predict_proba(X_test)[:, 1]
    
    print("\n--- Classification Report ---")
    print(classification_report(y_test, y_pred))
    
    ap_score = average_precision_score(y_test, y_probs)
    print(f"Average Precision (AUPRC): {ap_score:.4f}")
    
    # Save the model
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(pipeline, model_path)
    logger.info(f"Model saved to {model_path}")
    
    return pipeline

if __name__ == "__main__":
    from data_loader import load_and_preprocess_data
    
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    data_path = os.path.join(project_root, "data", "creditcard.csv")
    model_path = os.path.join(project_root, "models", "fraud_model.joblib")
    
    X_train, X_test, y_train, y_test = load_and_preprocess_data(data_path)
    train_fraud_model(X_train, y_train, X_test, y_test, model_path=model_path)
