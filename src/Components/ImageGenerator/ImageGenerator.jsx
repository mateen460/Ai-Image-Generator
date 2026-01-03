import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_img from'../Assets/default_image.svg'
const ImageGenerator = () => {
      const[image_url,setImage_url]=useState("/");
    let inputRef=useRef(null);

    const[loading,setLoading]=useState(false)

const imageGenerator = async () => {
  const prompt = inputRef.current.value.trim(); // Get and clean user input
  if (!prompt) {
    alert("Please enter a prompt");
    return;
  }

  setLoading(true); // Show loading animation
https://api-inference.huggingface.co/models/stabilityai/stable-diffusion
  try {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "", // 👈 Replace this with your actual key
      },
      body: JSON.stringify({
        prompt: prompt,  // required prompt
        n: 1,            // number of images
        size: "512x512", // valid sizes: 256x256, 512x512, 1024x1024
      }),
    });

    const data = await response.json(); // Parse JSON response
    console.log("Raw JSON response from OpenAI:", JSON.stringify(data, null, 2));

    console.log("Full API response:", data); // ✅ FULL response log

    if (!response.ok) {
      console.error("OpenAI Error Code:", response.status);
      console.error("OpenAI Error Details:", data.error);
      alert(`OpenAI API Error: ${data.error?.message || "Unknown error"}`);
      setLoading(false);
      return;
    }

    if (data?.data?.[0]?.url) {
      setImage_url(data.data[0].url); // Set image URL
    } else {
      console.error("No image returned:", data);
      alert("No image returned from API.");
    }

  } catch (err) {
    console.error("Network or fetch error:", err);
    alert("A network or system error occurred. Check console.");
  }

  setLoading(false); // Hide loading
};


    return (

    <div className='ai-image-generator'> 
    <div className="header">Ai Image <span>generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={image_url==="/"?default_img:image_url} alt="" /></div>
        <div className="loading">
          <div className={loading?"loading-bar-full":"loading-bar"}> </div>
          <div className={loading?"loading-text":"display-none"}>Loading....</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what You want to see' />
        <div className="generate-btn"onClick={()=>{imageGenerator()}}>Generates</div>
      </div>
    </div>
  )
}

export default ImageGenerator;
