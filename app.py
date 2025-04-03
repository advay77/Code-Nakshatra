import streamlit as st
import tensorflow as tf
import numpy as np
from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

def model_prediction(test_image):
    model = tf.keras.models.load_model('trained_model.h5', compile=False)
    image = tf.keras.preprocessing.image.load_img(test_image, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to batch
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    return result_index

def get_disease_solution(disease_name):
    """Fetch solutions for the predicted plant disease using Groq LLM."""
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a highly experienced agricultural scientist. "
                        "Your task is to explain solutions to plant diseases in simple words, "
                        "so that farmers can easily understand and apply them. "
                        "Provide step-by-step solutions with practical tips."
                    ),
                },
                {
                    "role": "user",
                    "content": f"My {disease_name} crop is affected. Explain in easy language with practical solutions.",
                },
            ],
            model="llama-3.3-70b-versatile",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error fetching solution: {str(e)}"

# Streamlit Page Configuration
st.set_page_config(page_title="Plant Disease Recognition", page_icon="🌱", layout="wide")

# Custom CSS for styling
def apply_custom_styles():
    st.markdown(
        """
        <style>
            body {
                background-color: #f4f9f4;
            }
            .stApp {
                background: #f4f9f4;
            }
            .stButton > button {
                background-color: #ffcc00;
                color: black;
                font-size: 18px;
                border-radius: 8px;
            }
            .stSidebar {
                background-color: #33691e;
                color: white;
            }
            .stHeader {
                text-align: center;
                font-size: 32px;
                font-weight: bold;
                color: #2e7d32;
            }
        </style>
        """,
        unsafe_allow_html=True,
    )
apply_custom_styles()

# Sidebar Navigation
st.sidebar.image("farmer_logo.avif", width=150)
st.sidebar.title("🌾 Farmer's Dashboard")
app_mode = st.sidebar.radio("Navigate", ["🏠 Home", "📖 About", "🌿 Disease Recognition"])

if app_mode == "🏠 Home":
    st.image("home_page.jpeg", use_column_width=True)
    st.markdown("""
        # Welcome to the **Plant Disease Recognition System**! 🌿🔍
        Our mission is to help farmers detect plant diseases early and provide actionable solutions.
        
        ### 🌱 How It Works:
        1. **Upload Image**: Select a plant image to analyze.
        2. **AI Analysis**: Our model detects potential diseases.
        3. **Get Expert Advice**: Our AI-powered scientist suggests easy solutions!
        
        ### 🏡 Protect Your Crops!
        Click on **Disease Recognition** to begin! 🚀
    """)

elif app_mode == "📖 About":
    st.markdown("""
        # About This Project 🌾
        This system utilizes **AI and Deep Learning** to detect plant diseases from images.
        
        - **Dataset**: 87K images of healthy and diseased crop leaves, categorized into **38 disease classes**.
        - **Technology**: TensorFlow, Deep Learning, Streamlit UI, and Groq AI.
    """)

elif app_mode == "🌿 Disease Recognition":
    st.header("🌿 Disease Recognition")
    test_image = st.file_uploader("📸 Upload an Image of Your Plant:")
    
    if test_image and st.button("Show Image"):
        st.image(test_image, use_column_width=True)
    
    if test_image and st.button("🔍 Predict Disease"):
        with st.spinner("Analyzing the plant image..."):
            result_index = model_prediction(test_image)
            class_name = [
                'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
                'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
                'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
                'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
                'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
                'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
                'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
                'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
                'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight',
                'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
                'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
                'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
            ]
            predicted_disease = class_name[result_index]
            st.success(f"🌱 The plant is diagnosed with: **{predicted_disease}**")

            if "healthy" not in predicted_disease:
                solution = get_disease_solution(predicted_disease)
                st.info(f"✅ Solution for {predicted_disease}: {solution}")
            else:
                st.success("🎉 The plant is healthy! No action needed.")
