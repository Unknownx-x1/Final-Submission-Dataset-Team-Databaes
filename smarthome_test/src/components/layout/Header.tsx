import { Home, Mic } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Header() {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // -------------------------------
  // Initialize Speech Recognition
  // -------------------------------
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      console.log('🎤 Listening...');
    };

    recognition.onend = () => {
      setListening(false);
      console.log('🛑 Stopped listening');
    };

    recognition.onerror = (event: any) => {
      console.error('❌ Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('🗣️ Voice command:', transcript);
      sendToBackend(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  // -------------------------------
  // Send voice text to backend
  // -------------------------------
  const sendToBackend = async (text: string) => {
    try {
      const response = await fetch('https://backendllm-uoeo.onrender.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      console.log('🤖 AI Decision:', data);

      // 🔜 Later:
      // data.actions.forEach(action => updateDeviceState(action));
    } catch (error) {
      console.error('❌ Failed to send voice command:', error);
    }
  };

  // -------------------------------
  // Mic button handler
  // -------------------------------
  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Section */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Home size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Smart Home</h1>
              <p className="text-xs text-gray-500">
                Automation & Energy Monitoring
              </p>
            </div>
          </div>

          {/* Mic Button */}
          <button
            onClick={handleMicClick}
            title="Voice Control"
            className={`
              p-3 rounded-full transition-all
              ${listening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            <Mic size={20} />
          </button>

        </div>
      </div>
    </header>
  );
}


