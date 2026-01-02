// This file registers preview templates for Decap CMS
// Uses Preact (which Decap CMS bundles internally)

console.log('Loading preview template...');

// Wait a moment for CMS to be fully initialized
setTimeout(function() {
  if (window.CMS && window.CMS.registerPreviewTemplate) {
    console.log('CMS is ready, registering preview...');

    // Get Preact's h function from Decap CMS internals
    // Decap CMS uses Preact, so we'll use its h function
    const h = window.h || window.preact?.h || window.React?.createElement;

    if (!h) {
      console.error('Could not find h/createElement function');
      return;
    }

    console.log('Found h function:', typeof h);

    // Store iframe ref
    let iframeRef = null;

    // Preview component
    const IframePreview = function(props) {
      const data = props.entry.toJS().data;
      const previewUrl = window.location.origin + '/preview';

      console.log('Rendering preview with data:', data);

      // When iframe loads, send it data
      function handleLoad(event) {
        console.log('Iframe loaded, sending data');
        iframeRef = event.target;
        if (iframeRef && iframeRef.contentWindow) {
          iframeRef.contentWindow.postMessage({
            type: 'CMS_PREVIEW_DATA',
            content: data
          }, '*');
        }
      }

      // Update data when props change
      if (iframeRef && iframeRef.contentWindow) {
        iframeRef.contentWindow.postMessage({
          type: 'CMS_PREVIEW_DATA',
          content: data
        }, '*');
      }

      // Return iframe element using h function
      return h('div', {
        style: { width: '100%', height: '100%', overflow: 'auto' }
      },
        h('iframe', {
          src: previewUrl,
          onLoad: handleLoad,
          style: { width: '100%', minHeight: '200vh', border: 'none', display: 'block' },
          title: 'Site Preview',
          scrolling: 'no'
        })
      );
    };

    CMS.registerPreviewTemplate('content', IframePreview);
    console.log('✓ Preview template registered successfully!');

  } else {
    console.error('CMS not available or registerPreviewTemplate not found');
  }
}, 1000);
