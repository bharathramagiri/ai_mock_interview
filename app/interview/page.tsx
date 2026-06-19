"use client";

import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { Loader2, Mic, MicOff, Award, AlertTriangle, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const INTERVIEW_QUESTIONS = [
  "Tell me about yourself and your background in engineering.",
  "What is your approach to analyzing structural integrity or performance in the systems you design?",
  "Can you describe a challenging technical problem or material failure you encountered and how you resolved it?",
  "How do you ensure proper testing when implementing complex material integrations or new components?",
  "Explain the difference between theoretical design tolerances and real-world application.",
  "Describe a time you had a structural conflict during code or design review with a senior teammate.",
  "What is your workflow strategy for migrating old architectural designs to contemporary environments?",
  "How do you monitor runtime errors, stress fractures, or performance metrics in critical components?",
  "Why do you want to join our organization, and what makes your experience unique?",
  "Where do you see your core engineering skill set evolving over the next three years?"
];

export default function InterviewDashboard() {
  const webcamRef = useRef<Webcam>(null);
  const recognitionRef = useRef<any>(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  
  const [transcripts, setTranscripts] = useState<string[]>(Array(10).fill(""));
  const [emotionLogs, setEmotionLogs] = useState<string[][]>(Array(10).fill([]));
  const [currentEmotion, setCurrentEmotion] = useState<string>("Analyzing...");

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<string | null>(null);

  useEffect(() => {
    async function loadModels() {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        setModelsLoaded(true);
      } catch (err: any) {
        setCameraError("Failed to load AI models. Did you run 'node setup-models.js'?");
      }
    }
    loadModels();

    const SpeechClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechClass) {
      const rec = new SpeechClass();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";
      
      rec.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          }
        }
        
        if (finalTranscript) {
          setTranscripts(prev => {
            const updated = [...prev];
            updated[currentIdx] = (updated[currentIdx] + " " + finalTranscript).trim();
            return updated;
          });
        }
      };

      rec.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          setIsRecording(false);
          return; 
        }
        console.error("Speech Recognition Error:", event.error);
        if (event.error === 'not-allowed') {
          alert("Microphone access was blocked! Please allow it in the URL bar.");
          setIsRecording(false);
        }
      };

      recognitionRef.current = rec;
    }
  }, [currentIdx]);

  useEffect(() => {
    if (!modelsLoaded || cameraError) return;
    
    const trackingInterval = setInterval(async () => {
      if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
        const videoEl = webcamRef.current.video;
        try {
          // FIX: Made the detector more sensitive to bad lighting (scoreThreshold: 0.2 instead of 0.5)
          // Pushing the AI to maximum sensitivity and higher resolution processing
const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.1 });
          
          const result = await faceapi
            .detectSingleFace(videoEl, options)
            .withFaceExpressions();

          if (result && result.expressions) {
            const sorted = Object.entries(result.expressions).sort((a, b) => b[1] - a[1]);
            const dominant = sorted[0][0];
            setCurrentEmotion(dominant);

            if (isRecording) {
              setEmotionLogs(prev => {
                const updated = [...prev];
                updated[currentIdx] = [...updated[currentIdx], dominant];
                return updated;
              });
            }
          } else {
            // FIX: If the room is too dark or face is hidden, tell the user!
            setCurrentEmotion("No Face Detected");
          }
        } catch (err) {
          // Ignore safely
        }
      }
    }, 1000);

    return () => clearInterval(trackingInterval);
  }, [modelsLoaded, isRecording, currentIdx, cameraError]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    try {
      if (isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
      } else {
        recognitionRef.current.start();
        setIsRecording(true);
      }
    } catch (err) {
      setIsRecording(!isRecording);
    }
  };

  const handleNextQuestion = () => {
    if (isRecording) {
      try { recognitionRef.current?.stop(); } catch(e){}
      setIsRecording(false);
    }
    if (currentIdx < 9) {
      setCurrentIdx(prev => prev + 1);
    } else {
      processFinalEvaluation();
    }
  };

  const processFinalEvaluation = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questions: INTERVIEW_QUESTIONS,
          answers: transcripts,
          emotions: emotionLogs,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setEvaluationResult(data.evaluation);
    } catch (err: any) {
      console.error(err);
      alert("Evaluation failed: " + err.message);
    } finally {
      setIsEvaluating(false);
    }
  };

  // ==========================================
  // BEAUTIFUL NEW RESULTS DASHBOARD UI
  // ==========================================
  if (evaluationResult) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-gray-900 py-16 px-6 flex justify-center selection:bg-orange-200">
        <div className="max-w-4xl w-full">
          
          <div className="bg-white rounded-t-3xl p-8 sm:p-12 border-b border-gray-100 flex flex-col sm:flex-row items-center sm:space-x-6 shadow-sm">
            <div className="bg-orange-100 p-5 rounded-full text-orange-600 mb-6 sm:mb-0 shadow-inner">
              <Award className="w-12 h-12" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Interview Scorecard</h1>
              <p className="text-gray-500 mt-2 text-lg">AI-generated evaluation based on your verbal responses and emotional delivery.</p>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-b-3xl shadow-xl shadow-gray-200/50 border border-gray-100 border-t-0">
            <div className="max-w-none text-gray-700">
               <ReactMarkdown
                 components={{
                   h1: ({node, ...props}) => <h1 className="text-2xl font-black text-gray-900 mt-10 mb-4 border-b pb-2 uppercase tracking-wide" {...props} />,
                   h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-orange-500 pl-3" {...props} />,
                   h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2" {...props} />,
                   p: ({node, ...props}) => <p className="mb-5 text-gray-600 leading-relaxed text-lg" {...props} />,
                   strong: ({node, ...props}) => <strong className="font-bold text-gray-900 bg-orange-50 px-1.5 py-0.5 rounded" {...props} />,
                   ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600 text-lg" {...props} />,
                   ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-600 text-lg" {...props} />,
                 }}
               >
                 {evaluationResult}
               </ReactMarkdown>
            </div>

            <div className="mt-12 flex justify-center border-t border-gray-100 pt-10">
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-950 text-white font-bold px-10 py-4 rounded-full hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center space-x-3 text-lg"
              >
                <span>Take Another Practice Test</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // EXISTING INTERVIEW ROOM UI
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col lg:flex-row">
      
      {/* Interaction Column */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-12">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-mono tracking-widest text-orange-500 uppercase font-bold">interview.co AI Engine</span>
            <span className="bg-gray-800 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300">
              Question {currentIdx + 1} of 10
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-snug">
            {INTERVIEW_QUESTIONS[currentIdx]}
          </h2>

          <div className="bg-gray-800/60 border border-gray-700/50 p-5 rounded-xl min-h-[140px] text-gray-300 text-sm">
            <p className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">Live Speech Transcription:</p>
            {transcripts[currentIdx] || <span className="text-gray-600 italic">Click the microphone button and begin speaking...</span>}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-gray-800 pt-6">
          <button
            onClick={toggleRecording}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all ${
              isRecording ? "bg-red-600 hover:bg-red-700 text-white animate-pulse" : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span>{isRecording ? "Stop Transcribing" : "Mute/Unmute Mic"}</span>
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={isEvaluating}
            className="bg-[#f97316] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition flex items-center space-x-2 disabled:opacity-50"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Results...</span>
              </>
            ) : (
              <span>{currentIdx === 9 ? "Finish & Evaluate" : "Submit & Next Question"}</span>
            )}
          </button>
        </div>
      </div>

      {/* Media Device Feed Column */}
      <div className="w-full lg:w-[420px] bg-gray-950 border-l border-gray-800 p-8 flex flex-col justify-center items-center relative">
        <div className="w-full aspect-video lg:aspect-square bg-gray-900 rounded-2xl overflow-hidden relative shadow-inner border border-gray-800 flex items-center justify-center">
          
          {cameraError ? (
            <div className="flex flex-col items-center space-y-2 text-red-400 p-4 text-center">
              <AlertTriangle className="w-8 h-8" />
              <p className="text-sm font-bold">{cameraError}</p>
            </div>
          ) : !modelsLoaded ? (
            <div className="flex flex-col items-center space-y-2 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-xs">Warming computer vision arrays...</p>
            </div>
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored={true}
              className="w-full h-full object-cover"
            />
          )}
          
          <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-md text-[11px] font-mono tracking-wider text-green-400 border border-green-500/20 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
            <span>Live Camera Feed Active</span>
          </div>
        </div>

        {/* Emotion Metrics Card */}
        <div className={`w-full bg-gray-900/80 border mt-6 p-4 rounded-xl flex items-center justify-between transition-colors ${currentEmotion === "No Face Detected" ? "border-red-900/50" : "border-gray-800"}`}>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Current AI Affective Metric</p>
            <p className={`text-xl font-black capitalize mt-0.5 ${currentEmotion === "No Face Detected" ? "text-red-400" : "text-white"}`}>
              {currentEmotion}
            </p>
          </div>
          <span className="text-2xl bg-gray-800 p-2 rounded-lg">
            {currentEmotion === "happy" ? "😊" : currentEmotion === "sad" ? "😢" : currentEmotion === "angry" ? "😠" : currentEmotion === "surprised" ? "😲" : currentEmotion === "No Face Detected" ? "💡" : "😐"}
          </span>
        </div>
      </div>

    </div>
  );
}