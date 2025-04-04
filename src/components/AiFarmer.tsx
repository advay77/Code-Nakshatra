import React, { useState } from 'react';
import { Plane as Plant, Sprout, Cloud, Upload, AlertCircle, Microscope, ThermometerSun, Droplets, Leaf, LineChart, Calendar, Info } from 'lucide-react';
import Navbar from './navbar';

interface AnalysisResult {
  type: 'soil' | 'crop' | 'weather' | 'disease' | 'growth' | 'harvest';
  status: string;
  details: string;
  recommendations?: string[];
}

const translations = {
  english: {
    title: "AI Crop Recognition",
    howItWorks: "How It Works",
    uploadImage: "Upload Image",
    uploadDesc: "Take or upload a photo of your crop",
    aiAnalysis: "AI Analysis",
    aiAnalysisDesc: "Our AI analyzes various aspects",
    getInsights: "Get Insights",
    getInsightsDesc: "Receive detailed analysis and recommendations",
    selectDifferentImage: "Select Different Image",
    uploadPrompt: "Upload an image of your crop",
    analyzing: "Analyzing image...",
    analysisResults: "Analysis Results",
    details: "Details:",
    recommendations: "Recommendations:",
    soilAnalysis: "Soil Analysis",
    soilDesc: "Check soil health",
    cropHealth: "Crop Health",
    cropDesc: "Assess vitality",
    weather: "Weather",
    weatherDesc: "Local forecast",
    diseaseCheck: "Disease Check",
    diseaseDesc: "Detect issues",
    growthTracking: "Growth Tracking",
    growthDesc: "Monitor progress",
    harvestTiming: "Harvest Timing",
    harvestDesc: "Optimal scheduling"
  },
  hindi: {
    title: "एआई फसल पहचान",
    howItWorks: "यह कैसे काम करता है",
    uploadImage: "छवि अपलोड करें",
    uploadDesc: "अपनी फसल की फोटो लें या अपलोड करें",
    aiAnalysis: "एआई विश्लेषण",
    aiAnalysisDesc: "हमारा एआई विभिन्न पहलुओं का विश्लेषण करता है",
    getInsights: "जानकारी प्राप्त करें",
    getInsightsDesc: "विस्तृत विश्लेषण और सिफारिशें प्राप्त करें",
    selectDifferentImage: "अलग छवि चुनें",
    uploadPrompt: "अपनी फसल की छवि अपलोड करें",
    analyzing: "छवि का विश्लेषण किया जा रहा है...",
    analysisResults: "विश्लेषण परिणाम",
    details: "विवरण:",
    recommendations: "सिफारिशें:",
    soilAnalysis: "मिट्टी का विश्लेषण",
    soilDesc: "मिट्टी की स्वास्थ्य जांच",
    cropHealth: "फसल स्वास्थ्य",
    cropDesc: "जीवन शक्ति का आकलन",
    weather: "मौसम",
    weatherDesc: "स्थानीय पूर्वानुमान",
    diseaseCheck: "रोग जांच",
    diseaseDesc: "समस्याओं का पता लगाएं",
    growthTracking: "विकास ट्रैकिंग",
    growthDesc: "प्रगति की निगरानी",
    harvestTiming: "कटाई का समय",
    harvestDesc: "इष्टतम समय-निर्धारण"
  }
};

function AiFarmer() {
  const [selectedImage, setSelectedImage] = useState<string | null>("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const t = translations[language];

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
        status: language === 'hindi' ? 'इष्टतम मिट्टी की स्थिति' : 'Optimal Soil Conditions',
        details: language === 'hindi' 
          ? 'पीएच: 6.8, नाइट्रोजन: उच्च (180 पीपीएम), फास्फोरस: मध्यम (45 पीपीएम), पोटैशियम: अच्छा (220 पीपीएम)'
          : 'pH: 6.8, Nitrogen: High (180 ppm), Phosphorus: Medium (45 ppm), Potassium: Good (220 ppm)',
        recommendations: language === 'hindi' 
          ? [
              'नाइट्रोजन उर्वरक का उपयोग कम करने पर विचार करें',
              'वर्तमान सिंचाई कार्यक्रम बनाए रखें',
              'मिट्टी की संरचना में सुधार के लिए जैविक पदार्थ जोड़ें'
            ]
          : [
              'Consider reducing nitrogen fertilizer application',
              'Maintain current irrigation schedule',
              'Add organic matter to improve soil structure'
            ]
      },
      crop: {
        type: 'crop',
        status: language === 'hindi' ? 'स्वस्थ गेहूं की फसल का पता चला' : 'Healthy Wheat Crop Detected',
        details: language === 'hindi'
          ? 'विकास चरण: शीर्ष चरण, पौधे की ऊंचाई: 85 सेमी, घनत्व: इष्टतम'
          : 'Growth Stage: Heading stage, Plant Height: 85cm, Density: Optimal',
        recommendations: language === 'hindi'
          ? [
              'वर्तमान प्रबंधन प्रथाओं को जारी रखें',
              'कीट गतिविधि की निगरानी करें',
              'आगामी फूल चरण की तैयारी करें'
            ]
          : [
              'Continue current management practices',
              'Monitor for pest activity',
              'Prepare for upcoming flowering stage'
            ]
      },
      weather: {
        type: 'weather',
        status: language === 'hindi' ? 'अनुकूल उगाने की स्थिति' : 'Favorable Growing Conditions',
        details: language === 'hindi'
          ? 'तापमान: 25°C, आर्द्रता: 65%, वर्षा: 30% संभावना, हवा: 8 किमी/घंटा'
          : 'Temperature: 25°C, Humidity: 65%, Precipitation: 30% chance, Wind: 8 km/h',
        recommendations: language === 'hindi'
          ? [
              'फसल विकास के लिए आदर्श स्थिति',
              '2 दिनों में हल्की सिंचाई पर विचार करें',
              'आर्द्रता स्तर के कारण बीमारी की निगरानी करें'
            ]
          : [
              'Ideal conditions for crop development',
              'Consider light irrigation in 2 days',
              'Monitor for disease due to humidity levels'
            ]
      },
      disease: {
        type: 'disease',
        status: language === 'hindi' ? 'मामूली जोखिम का पता चला' : 'Minor Risk Detected',
        details: language === 'hindi'
          ? 'पाउडरी मिल्ड्यू के प्रारंभिक संकेत (5% कवरेज)'
          : 'Early signs of powdery mildew detected (5% coverage)',
        recommendations: language === 'hindi'
          ? [
              '48 घंटों के भीतर फफूंदनाशक लगाएं',
              'पौधों के बीच हवा का संचार बढ़ाएं',
              'दैनिक प्रसार की निगरानी करें'
            ]
          : [
              'Apply fungicide within 48 hours',
              'Improve air circulation between plants',
              'Monitor spread daily'
            ]
      },
      growth: {
        type: 'growth',
        status: language === 'hindi' ? 'औसत से अधिक विकास दर' : 'Above Average Growth Rate',
        details: language === 'hindi'
          ? 'वर्तमान विकास दर: 2.3 सेमी/दिन, बायोमास सूचकांक: 7.8/10'
          : 'Current growth rate: 2.3 cm/day, Biomass Index: 7.8/10',
        recommendations: language === 'hindi'
          ? [
              'वर्तमान उर्वरीकरण कार्यक्रम बनाए रखें',
              'अगले मौसम में पंक्ति अंतर बढ़ाने पर विचार करें',
              'सफल प्रथाओं का दस्तावेजीकरण करें'
            ]
          : [
              'Maintain current fertilization program',
              'Consider increasing row spacing next season',
              'Document successful practices'
            ]
      },
      harvest: {
        type: 'harvest',
        status: language === 'hindi' ? 'इष्टतम कटाई का समय आ रहा है' : 'Optimal Harvest Window Approaching',
        details: language === 'hindi'
          ? 'अनुमानित कटाई की तिथि: 15-20 दिन, अपेक्षित उपज: 4.2 टन/हेक्टेयर'
          : 'Estimated harvest date: 15-20 days, Expected yield: 4.2 tons/ha',
        recommendations: language === 'hindi'
          ? [
              'कटाई उपकरण की योजना बनाएं',
              'अनाज की नमी की मात्रा की निगरानी करें',
              'भंडारण सुविधाएं तैयार करें'
            ]
          : [
              'Schedule harvesting equipment',
              'Monitor grain moisture content',
              'Prepare storage facilities'
            ]
      }
    };

    setAnalysisResult(results[type]);
    setIsAnalyzing(false);
  };

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen bg-gradient-to-b from-green-400 to-green-800 p-8 mt-9"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Language Toggle */}
        <div className="absolute top-20 right-4 bg-white/20 backdrop-blur-md rounded-full p-1 z-50">
          <button 
            className={`px-4 py-2 rounded-full transition-all ${language === 'english' ? 'bg-green-600 text-white' : 'text-gray-800'}`}
            onClick={() => setLanguage('english')}
          >
            English
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-all ${language === 'hindi' ? 'bg-green-600 text-white' : 'text-gray-800'}`}
            onClick={() => setLanguage('hindi')}
          >
            हिंदी
          </button>
        </div>

        {/* Overlay with blur effect */}
        <div 
          className="inset-0"
          style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Plant className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
            </div>

            <div className="bg-gray-50/90 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">{t.howItWorks}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    <Upload className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t.uploadImage}</h3>
                    <p className="text-sm text-gray-600">{t.uploadDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    <Microscope className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t.aiAnalysis}</h3>
                    <p className="text-sm text-gray-600">{t.aiAnalysisDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    <Info className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t.getInsights}</h3>
                    <p className="text-sm text-gray-600">{t.getInsightsDesc}</p>
                  </div>
                </div>
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
                    <p className="text-gray-500">{t.uploadPrompt}</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <div className="flex justify-center gap-4">
                  <label
                    htmlFor="imageUpload"
                    className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
                  >
                    {t.selectDifferentImage}
                  </label>
                  {/* <a
                    href="http://localhost:8501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    {t.selectDifferentImage}
                  </a> */}
                </div>
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
                  <h3 className="font-semibold text-gray-800">{t.soilAnalysis}</h3>
                  <p className="text-sm text-gray-600">{t.soilDesc}</p>
                </div>
              </button>

              <button
                onClick={() => analyzeImage('crop')}
                disabled={isAnalyzing}
                className="flex items-center gap-3 p-4 bg-emerald-50/90 backdrop-blur-sm rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <Sprout className="w-6 h-6 text-emerald-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{t.cropHealth}</h3>
                  <p className="text-sm text-gray-600">{t.cropDesc}</p>
                </div>
              </button>

              <button
                onClick={() => analyzeImage('weather')}
                disabled={isAnalyzing}
                className="flex items-center gap-3 p-4 bg-blue-50/90 backdrop-blur-sm rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Cloud className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{t.weather}</h3>
                  <p className="text-sm text-gray-600">{t.weatherDesc}</p>
                </div>
              </button>

              <button
                onClick={() => analyzeImage('disease')}
                disabled={isAnalyzing}
                className="flex items-center gap-3 p-4 bg-red-50/90 backdrop-blur-sm rounded-lg hover:bg-red-100 transition-colors"
              >
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{t.diseaseCheck}</h3>
                  <p className="text-sm text-gray-600">{t.diseaseDesc}</p>
                </div>
              </button>

              <button
                onClick={() => analyzeImage('growth')}
                disabled={isAnalyzing}
                className="flex items-center gap-3 p-4 bg-purple-50/90 backdrop-blur-sm rounded-lg hover:bg-purple-100 transition-colors"
              >
                <LineChart className="w-6 h-6 text-purple-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{t.growthTracking}</h3>
                  <p className="text-sm text-gray-600">{t.growthDesc}</p>
                </div>
              </button>

              <button
                onClick={() => analyzeImage('harvest')}
                disabled={isAnalyzing}
                className="flex items-center gap-3 p-4 bg-orange-50/90 backdrop-blur-sm rounded-lg hover:bg-orange-100 transition-colors"
              >
                <Calendar className="w-6 h-6 text-orange-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{t.harvestTiming}</h3>
                  <p className="text-sm text-gray-600">{t.harvestDesc}</p>
                </div>
              </button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3">{t.analyzing}</span>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{t.analysisResults}</h2>
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
                <h4 className="font-semibold mb-2">{t.details}</h4>
                <p className="text-gray-600">{analysisResult.details}</p>
              </div>
              {analysisResult.recommendations && (
                <div>
                  <h4 className="font-semibold mb-2">{t.recommendations}</h4>
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