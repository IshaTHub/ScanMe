import { useState, useRef } from "react";
import { ReactQRCode, type ReactQRCodeRef } from "@lglab/react-qr-code";
import { Card, CardBody, Input, Button } from "@heroui/react";
import { addToast } from "@heroui/react";

function App() {
  const [url, setUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<ReactQRCodeRef>(null);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleGenerate = () => {
    if (!url) {
      addToast({
        title: "Error",
        description: "Please enter a URL",
        variant: "bordered",
        color: "danger",
      });
      setShowQR(false);
      return;
    }

    if (!isValidUrl(url)) {
      addToast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "bordered",
        color: "danger",
      });
      setShowQR(false);
      return;
    }

    setShowQR(true);
    addToast({
      title: "Success!",
      description: "QR code generated successfully!!",
      color: "success",
      variant: "bordered",
    });
  };

  const handleDownload = () => {
    qrRef.current?.download({
      name: "qr-code",
      format: "png",
      size: 1000,
    });
    addToast({
      title: "Success!",
      description: "QR code downloaded successfully",
      variant: "bordered",
      color: "success",
    });
  };

  return (
    <div className="min-h-screen bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-8">
        {/* Left side: Input and button */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left md:w-1/2">
          <h1
            className="text-2xl font-extrabold text-zinc-900"
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
            className="w-full max-w-md bg-white/60 text-zinc-900 placeholder:text-zinc-700 border-2 border-zinc-500 focus:border-zinc-700 focus:bg-white/80 backdrop-blur-sm rounded-md p-2"
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
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                onPress={handleDownload}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90"
              >
                Download QR Code
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
