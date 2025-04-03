import streamlit as st
import tensorflow as tf
import numpy as np
from groq import Groq
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(".env")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY)

# Tensorflow Model Prediction
def model_prediction(test_image):
    model = tf.keras.models.load_model('trained_model.h5', compile=False)
    image = tf.keras.preprocessing.image.load_img(test_image, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to a batch
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    return result_index

# Function to fetch solutions from Groq LLM
def get_disease_solution(disease_name):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a highly experienced and educated agricultural scientist. "
                        "Your goal is to provide solutions for crop diseases in a simple, easy-to-understand, "
                        "and friendly manner, as if you are talking to a farmer. Use clear language and "
                        "practical steps that can be easily followed by farmers."
                    ),
                },
                {
                    "role": "user",
                    "content": f"My {disease_name} crop is affected. Explain in easy and layman language. What are the best practical solutions to treat it?",
                },
            ],
            model="llama-3.3-70b-versatile",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error fetching solution: {str(e)}"

# Apply Custom HTML and CSS for styling
st.markdown(
    """
    <link rel="stylesheet" type="text/css" href="styles.css">
    <div class="header">
        <h1>🌱 Plant Disease Recognition System</h1>
    </div>
    """,
    unsafe_allow_html=True,
)

st.sidebar.title("Dashboard")
app_mode = st.sidebar.selectbox("Select Page", ["Home", "About", "Disease Recognition"])

if app_mode == "Home":
    st.markdown(
        """
        <div class="content">
            <img src="farmer_home.jpg" class="home-img">
            <p>Welcome to the <b>Plant Disease Recognition System!</b> 🌿🔍</p>
            <ul>
                <li>📸 Upload an image of your crop</li>
                <li>🔍 Get instant disease detection results</li>
                <li>🌍 Receive expert AI-assisted solutions</li>
            </ul>
            <p>Navigate to <b>Disease Recognition</b> to start your journey! 🛋</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

elif app_mode == "About":
    st.markdown(
        """
        <div class="content">
            <img src="farmers_working.jpg" class="about-img">
            <h2>About Us 🌾</h2>
            <p>Our system helps farmers <b>detect plant diseases</b> using AI and provides <b>practical, easy-to-follow solutions.</b></p>
        </div>
        """,
        unsafe_allow_html=True,
    )

elif app_mode == "Disease Recognition":
    st.markdown("<h2 class='content-header'>🔬 Disease Recognition</h2>", unsafe_allow_html=True)
    test_image = st.file_uploader("Upload an image of your crop 🌱:")
    camera_image = st.camera_input("Or take a picture with your camera 📸:")
    
    image_to_process = test_image if test_image else camera_image
    
    if image_to_process and st.button("Show Image 🏞️"):
        st.image(image_to_process, use_column_width=True)
    
    if image_to_process and st.button("Predict 🧪"):
        with st.spinner("Analyzing your crop... Please wait ⏳"):
            result_index = model_prediction(image_to_process)
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
            st.markdown(f"<div class='result-box'>🌿 The detected disease is <b>{predicted_disease.replace('_', ' ')}</b></div>", unsafe_allow_html=True)
            
            if "healthy" not in predicted_disease:
                solution = get_disease_solution(predicted_disease)
                st.markdown(f"<div class='solution-box'>🛋 Solution:<br>{solution}</div>", unsafe_allow_html=True)
            else:
                st.markdown("<div class='healthy-box'>🌞 Your crop is healthy! Keep up the good work!</div>", unsafe_allow_html=True)
