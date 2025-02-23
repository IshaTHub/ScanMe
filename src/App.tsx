import { useState, useRef } from "react";
import { ReactQRCode, type ReactQRCodeRef } from "@lglab/react-qr-code";
import { Card, CardBody, Input, Button } from "@heroui/react";

function App() {
  const [url, setUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<ReactQRCodeRef>(null);

  const handleGenerate = () => {
    if (url) {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r/hsl from-indigo-500 to-teal-400 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-8">
        {/* Left side: Input and button */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left md:w-1/2">
          <h1
            className="text-6xl font-bold text-white"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            ScanMe
          </h1>
          <Input
            type="url"
            placeholder="Enter link of the website"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setShowQR(false);
            }}
            className="w-full max-w-md bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 border-2 border-white/30 focus:border-white"
            size="lg"
          />
          <Button
            color="secondary"
            variant="shadow"
            size="lg"
            onPress={handleGenerate}
            className="min-w-[200px] bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold"
          >
            Generate QR Code
          </Button>
        </div>

        {/* Right side: QR Code */}
        {showQR && (
          <Card className="w-full md:w-1/2 max-w-md bg-white/95 backdrop-blur-md shadow-xl rounded-xl flex justify-center">
            <CardBody className="p-8 flex flex-col items-center gap-6 rounded-xl">
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <ReactQRCode
                  ref={qrRef}
                  value={url}
                  size={256}
                  marginSize={2}
                  background="#FFFFFF"
                />
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
