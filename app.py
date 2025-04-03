import streamlit as st
import tensorflow as tf
import numpy as np
from groq import Groq
import requests
from dotenv import load_dotenv

load_dotenv("\.env")
import os
GROQ_API_KEY=os.getenv("GROQ_API_KEY")
client=Groq(api_key=GROQ_API_KEY)
#Tensorflow Model Prediction
def model_prediction(test_image):
    model  = tf.keras.models.load_model('trained_model.h5', compile=False)
    image = tf.keras.preprocessing.image.load_img(test_image,target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr]) #Convert single image to a batch
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    return result_index

st.sidebar.title("Dashboard")
app_mode = st.sidebar.selectbox("Select Page",["Home","About","Disease Recognition"])

def get_disease_solution(disease_name):
    """Fetch solutions for the predicted plant disease using Groq LLM."""
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
                    "content": f"My {disease_name} crop is affected. What are the best solutions to treat it?",
                },
            ],
            model="llama-3.3-70b-versatile",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error fetching solution: {str(e)}"

#Home Page
if(app_mode=="Home"):
    st.header("PLANT DISEASE RECOGNITION SYSTEM")
    image_path = "home_page.jpeg"
    st.image(image_path,use_column_width=True)
    st.markdown("""
    Welcome to the Plant Disease Recognition System! 🌿🔍
    
    Our mission is to help in identifying plant diseases efficiently. Upload an image of a plant, and our system will analyze it to detect any signs of diseases. Together, let's protect our crops and ensure a healthier harvest!

    ### How It Works
    1. **Upload Image:** Go to the **Disease Recognition** page and upload an image of a plant with suspected diseases.
    2. **Analysis:** Our system will process the image using advanced algorithms to identify potential diseases.
    3. **Results:** View the results and recommendations for further action.

    ### Why Choose Us?
    - **Accuracy:** Our system utilizes state-of-the-art machine learning techniques for accurate disease detection.
    - **User-Friendly:** Simple and intuitive interface for seamless user experience.
    - **Fast and Efficient:** Receive results in seconds, allowing for quick decision-making.

    ### Get Started
    Click on the **Disease Recognition** page in the sidebar to upload an image and experience the power of our Plant Disease Recognition System!

    ### About Us
    Learn more about the project, our team, and our goals on the **About** page.
""")

#About Page
elif(app_mode=="About"):
    st.header("About")
    st.markdown("""
    #### About Dataset
    This dataset is recreated using offline augmentation from the original dataset. The original dataset can be found on this github repo. This dataset consists of about 87K rgb images of healthy and diseased crop leaves which is categorized into 38 different classes. The total dataset is divided into 80/20 ratio of training and validation set preserving the directory structure. A new directory containing 33 test images is created later for prediction purpose.
    #### Content
    1. Train (70295 images)
    2. Valid (17572 image)
    3. Test (33 images)
""")
    
#Prediction Page
elif app_mode == "Disease Recognition":
    st.header("Disease Recognition")
    test_image = st.file_uploader("Choose an Image:")
    camera_image = st.camera_input("Or take a picture with your camera:")
    
    image_to_process = test_image if test_image else camera_image
    
    if st.button("Show Image") and image_to_process:
        st.image(image_to_process, use_column_width=True)
    
    if st.button("Predict") and image_to_process:
        with st.spinner("Please Wait.."):
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
            st.success(f"Model is Predicting it's {predicted_disease}")

            # Fetch and display the solution using Groq LLM
            if "healthy" not in predicted_disease:
                solution = get_disease_solution(predicted_disease)
                st.info(f"Solution for {predicted_disease}: {solution}")
            else:
                st.info("The plant is healthy. No action is needed.")
