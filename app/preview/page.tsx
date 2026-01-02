"use client";

import { useEffect, useState } from "react";
import MadleensLandingContent from "@/components/MadleensLandingContent";
import defaultContent from "../../content.json";

export default function PreviewPage() {
  const [previewContent, setPreviewContent] = useState(defaultContent);

  useEffect(() => {
    // Listen for preview data from parent CMS window
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from any origin for preview (you can restrict this in production)
      if (event.data && event.data.type === 'CMS_PREVIEW_DATA') {
        console.log('Received preview data:', event.data.content);
        setPreviewContent(event.data.content);
      }
    };

    window.addEventListener('message', handleMessage);

    // Tell parent window we're ready
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'CMS_PREVIEW_READY' }, '*');
    }

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <MadleensLandingContent content={previewContent} />;
}
