import React, { useState } from 'react';
import { Plane as Plant, Sprout, Cloud, Upload, AlertCircle, Microscope, ThermometerSun, Droplets, Leaf, LineChart, Calendar, Info } from 'lucide-react';
import Navbar from './navbar';

interface AnalysisResult {
  type: 'soil' | 'crop' | 'weather' | 'disease' | 'growth' | 'harvest';
  status: string;
  details: string;
  recommendations?: string[];
}

function AiFarmer() {
  const [selectedImage, setSelectedImage] = useState<string | null>("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (type: AnalysisResult['type']) => {
    setIsAnalyzing(true);
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results: Record<string, AnalysisResult> = {
      soil: {
        type: 'soil',
        status: 'Optimal Soil Conditions',
        details: 'pH: 6.8, Nitrogen: High (180 ppm), Phosphorus: Medium (45 ppm), Potassium: Good (220 ppm)',
        recommendations: [
          'Consider reducing nitrogen fertilizer application',
          'Maintain current irrigation schedule',
          'Add organic matter to improve soil structure'
        ]
      },
      crop: {
        type: 'crop',
        status: 'Healthy Wheat Crop Detected',
        details: 'Growth Stage: Heading stage, Plant Height: 85cm, Density: Optimal',
        recommendations: [
          'Continue current management practices',
          'Monitor for pest activity',
          'Prepare for upcoming flowering stage'
        ]
      },
      weather: {
        type: 'weather',
        status: 'Favorable Growing Conditions',
        details: 'Temperature: 25°C, Humidity: 65%, Precipitation: 30% chance, Wind: 8 km/h',
        recommendations: [
          'Ideal conditions for crop development',
          'Consider light irrigation in 2 days',
          'Monitor for disease due to humidity levels'
        ]
      },
      disease: {
        type: 'disease',
        status: 'Minor Risk Detected',
        details: 'Early signs of powdery mildew detected (5% coverage)',
        recommendations: [
          'Apply fungicide within 48 hours',
          'Improve air circulation between plants',
          'Monitor spread daily'
        ]
      },
      growth: {
        type: 'growth',
        status: 'Above Average Growth Rate',
        details: 'Current growth rate: 2.3 cm/day, Biomass Index: 7.8/10',
        recommendations: [
          'Maintain current fertilization program',
          'Consider increasing row spacing next season',
          'Document successful practices'
        ]
      },
      harvest: {
        type: 'harvest',
        status: 'Optimal Harvest Window Approaching',
        details: 'Estimated harvest date: 15-20 days, Expected yield: 4.2 tons/ha',
        recommendations: [
          'Schedule harvesting equipment',
          'Monitor grain moisture content',
          'Prepare storage facilities'
        ]
      }
    };

    setAnalysisResult(results[type]);
    setIsAnalyzing(false);
  };

  return (<>
  <Navbar/>
  {/* <div className="bg-cyan-100 rounded-4xl h-50 w-50"></div> */}
    <div 
      className="min-h-screen bg-gradient-to-b from-green-400 to-green-800 p-8 mt-9"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay with blur effect */}
      <div 
        className=" inset-0"
        style={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Plant className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">AI Crop Recognition</h1>
          </div>
          


          <div className="bg-gray-50/90 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Upload Image</h3>
                  <p className="text-sm text-gray-600">Take or upload a photo of your crop</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Microscope className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">AI Analysis</h3>
                  <p className="text-sm text-gray-600">Our AI analyzes various aspects</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Get Insights</h3>
                  <p className="text-sm text-gray-600">Receive detailed analysis and recommendations</p>
                </div>
              </div>
              <div className="bg-cyan-100 rounded-4xl h-50 w-50 z-100"></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white/50 backdrop-blur-sm">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected crop"
                  className="max-h-64 mx-auto mb-4 rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Upload an image of your crop</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
              >
                Select Different Image
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => analyzeImage('soil')}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-4 bg-amber-50/90 backdrop-blur-sm rounded-lg hover:bg-amber-100 transition-colors"
            >
              <Microscope className="w-6 h-6 text-amber-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Soil Analysis</h3>
                <p className="text-sm text-gray-600">Check soil health</p>
              </div>
            </button>

            <button
              onClick={() => analyzeImage('crop')}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-4 bg-emerald-50/90 backdrop-blur-sm rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Sprout className="w-6 h-6 text-emerald-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Crop Health</h3>
                <p className="text-sm text-gray-600">Assess vitality</p>
              </div>
            </button>

            <button
              onClick={() => analyzeImage('weather')}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-4 bg-blue-50/90 backdrop-blur-sm rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Cloud className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Weather</h3>
                <p className="text-sm text-gray-600">Local forecast</p>
              </div>
            </button>

            <button
              onClick={() => analyzeImage('disease')}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-4 bg-red-50/90 backdrop-blur-sm rounded-lg hover:bg-red-100 transition-colors"
            >
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Disease Check</h3>
                <p className="text-sm text-gray-600">Detect issues</p>
              </div>
            </button>

            <button
              onClick={() => analyzeImage('growth')}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-4 bg-purple-50/90 backdrop-blur-sm rounded-lg hover:bg-purple-100 transition-colors"
            >
              <LineChart className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Growth Tracking</h3>
                <p className="text-sm text-gray-600">Monitor progress</p>
              </div>
            </button>

            <button
              onClick={() => analyzeImage('harvest')}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-4 bg-orange-50/90 backdrop-blur-sm rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Calendar className="w-6 h-6 text-orange-600" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Harvest Timing</h3>
                <p className="text-sm text-gray-600">Optimal scheduling</p>
              </div>
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-3">Analyzing image...</span>
            </div>
          </div>
        )}

        {analysisResult && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Analysis Results</h2>
            <div className="flex items-center gap-4 mb-4">
              {analysisResult.type === 'soil' && <Microscope className="w-6 h-6 text-amber-600" />}
              {analysisResult.type === 'crop' && <Sprout className="w-6 h-6 text-emerald-600" />}
              {analysisResult.type === 'weather' && <Cloud className="w-6 h-6 text-blue-600" />}
              {analysisResult.type === 'disease' && <AlertCircle className="w-6 h-6 text-red-600" />}
              {analysisResult.type === 'growth' && <LineChart className="w-6 h-6 text-purple-600" />}
              {analysisResult.type === 'harvest' && <Calendar className="w-6 h-6 text-orange-600" />}
              <h3 className="text-xl font-semibold">{analysisResult.status}</h3>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Details:</h4>
              <p className="text-gray-600">{analysisResult.details}</p>
            </div>
            {analysisResult.recommendations && (
              <div>
                <h4 className="font-semibold mb-2">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-600">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default AiFarmer;