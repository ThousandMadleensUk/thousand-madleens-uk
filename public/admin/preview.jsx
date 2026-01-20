// This file registers preview templates for Decap CMS
// Shows events as cards with detail view below each

console.log('Loading preview template...');

setTimeout(function() {
  if (window.CMS && window.CMS.registerPreviewTemplate) {
    console.log('CMS is ready, registering preview...');

    const h = window.h || window.preact?.h || window.React?.createElement;

    if (!h) {
      console.error('Could not find h/createElement function');
      return;
    }

    const eventTypeColors = {
      'Protest': { badge: '#dc2626', border: '#fecaca', text: '#dc2626' },
      'Fundraiser': { badge: '#16a34a', border: '#bbf7d0', text: '#16a34a' },
      'Meeting': { badge: '#2563eb', border: '#bfdbfe', text: '#2563eb' },
      'Workshop': { badge: '#9333ea', border: '#e9d5ff', text: '#9333ea' },
      'Community': { badge: '#ea580c', border: '#fed7aa', text: '#ea580c' }
    };

    function formatDate(dateTime) {
      if (!dateTime) return '';
      try {
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      } catch (e) { return dateTime; }
    }

    function formatTime(dateTime) {
      if (!dateTime) return '';
      try {
        const date = new Date(dateTime);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
      } catch (e) { return ''; }
    }

    function createIcon(paths) {
      return function(style) {
        return h('svg', {
          style: Object.assign({ width: '16px', height: '16px', flexShrink: 0 }, style || {}),
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2'
        }, paths.map(function(p, i) {
          return h(p.tag, Object.assign({ key: i }, p.attrs));
        }));
      };
    }

    const MapPinIcon = createIcon([
      { tag: 'path', attrs: { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' } },
      { tag: 'circle', attrs: { cx: '12', cy: '10', r: '3' } }
    ]);

    const CalendarIcon = createIcon([
      { tag: 'rect', attrs: { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' } },
      { tag: 'line', attrs: { x1: '16', y1: '2', x2: '16', y2: '6' } },
      { tag: 'line', attrs: { x1: '8', y1: '2', x2: '8', y2: '6' } },
      { tag: 'line', attrs: { x1: '3', y1: '10', x2: '21', y2: '10' } }
    ]);

    const ClockIcon = createIcon([
      { tag: 'circle', attrs: { cx: '12', cy: '12', r: '10' } },
      { tag: 'polyline', attrs: { points: '12 6 12 12 16 14' } }
    ]);

    const ExternalLinkIcon = createIcon([
      { tag: 'path', attrs: { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' } },
      { tag: 'polyline', attrs: { points: '15 3 21 3 21 9' } },
      { tag: 'line', attrs: { x1: '10', y1: '14', x2: '21', y2: '3' } }
    ]);

    const ShareIcon = createIcon([
      { tag: 'circle', attrs: { cx: '18', cy: '5', r: '3' } },
      { tag: 'circle', attrs: { cx: '6', cy: '12', r: '3' } },
      { tag: 'circle', attrs: { cx: '18', cy: '19', r: '3' } },
      { tag: 'line', attrs: { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' } },
      { tag: 'line', attrs: { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' } }
    ]);

    // Render a single event with card view + detail view below
    function renderEvent(event, index) {
      const colors = eventTypeColors[event.eventType] || eventTypeColors['Community'];

      return h('div', {
        key: index,
        style: { marginBottom: '48px' }
      },
        // Label
        h('div', {
          style: {
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }
        }, 'Card View (Homepage)'),

        // Card view
        h('div', {
          style: {
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid ' + colors.border,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'row'
          }
        },
          // Image section
          h('div', {
            style: {
              width: '280px',
              minHeight: '200px',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0
            }
          },
            event.image && h('img', {
              src: event.image,
              alt: event.title || '',
              style: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }
            }),
            h('div', {
              style: {
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: colors.badge,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500'
              }
            }, event.eventType || 'Event')
          ),

          // Content section
          h('div', {
            style: {
              padding: '20px 24px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }
          },
            h('h3', {
              style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: '8px',
                lineHeight: '1.3'
              }
            }, event.title || 'Untitled Event'),

            h('div', {
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '12px'
              }
            },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                MapPinIcon(), h('span', null, event.location || 'Location TBD')),
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                CalendarIcon(), h('span', null, formatDate(event.dateTime))),
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                ClockIcon(), h('span', null, formatTime(event.dateTime)))
            ),

            h('p', {
              style: {
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '16px',
                flex: 1
              }
            }, event.shortDescription || 'No description provided'),

            h('div', {
              style: { display: 'flex', justifyContent: 'flex-end' }
            },
              h('span', {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  border: '2px solid #16a34a',
                  color: '#16a34a',
                  backgroundColor: 'transparent',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }
              }, 'View Details', ExternalLinkIcon({ marginLeft: '8px' }))
            )
          )
        ),

        // Label for detail view
        h('div', {
          style: {
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }
        }, 'Event Page Preview'),

        // Detail view
        h('div', {
          style: {
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }
        },
          // Hero section with black background
          h('div', {
            style: {
              position: 'relative',
              height: '180px',
              backgroundColor: '#000',
              overflow: 'hidden'
            }
          },
            h('div', {
              style: {
                position: 'absolute',
                bottom: '20px',
                left: '24px',
                right: '24px',
                color: 'white'
              }
            },
              h('div', {
                style: {
                  backgroundColor: colors.badge,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'inline-block',
                  marginBottom: '12px'
                }
              }, event.eventType || 'Event'),
              h('h2', {
                style: {
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }
              }, event.title || 'Untitled Event'),
              h('div', {
                style: {
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  fontSize: '14px'
                }
              },
                h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                  MapPinIcon({ color: '#4ade80' }), h('span', null, event.location || 'Location TBD')),
                h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                  CalendarIcon({ color: '#4ade80' }), h('span', null, formatDate(event.dateTime))),
                h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                  ClockIcon({ color: '#4ade80' }), h('span', null, formatTime(event.dateTime)))
              )
            )
          ),

          // Content section
          h('div', {
            style: { padding: '24px' }
          },
            // Action buttons
            h('div', {
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid #e5e7eb'
              }
            },
              event.actionUrl && h('span', {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }
              }, ExternalLinkIcon({ marginRight: '8px' }), event.actionText || 'Learn More'),
              h('span', {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }
              }, ShareIcon({ marginRight: '8px' }), 'Share Event'),
              h('span', {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }
              }, CalendarIcon({ marginRight: '8px' }), 'Add to Calendar')
            ),

            // Full description
            h('p', {
              style: {
                fontSize: '15px',
                color: '#4b5563',
                lineHeight: '1.8',
                whiteSpace: 'pre-line',
                marginBottom: '24px'
              }
            }, event.fullDescription || event.shortDescription || 'No description provided'),

            // Event image
            event.image && h('div', {
              style: {
                borderRadius: '8px',
                overflow: 'hidden'
              }
            },
              h('img', {
                src: event.image,
                alt: event.title || '',
                style: {
                  width: '100%',
                  height: 'auto'
                }
              })
            )
          )
        ),

        // Divider
        h('div', {
          style: {
            height: '2px',
            background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)',
            marginTop: '48px'
          }
        })
      );
    }

    const ContentPreview = function(props) {
      const data = props.entry.toJS().data;
      const eventsData = data.events || {};
      const events = eventsData.events || [];

      return h('div', {
        style: {
          padding: '40px',
          backgroundColor: '#f9fafb',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh'
        }
      },
        // Events
        h('div', {
          style: {
            maxWidth: '900px',
            margin: '0 auto'
          }
        },
          events.length > 0
            ? events.map(function(event, index) {
                return renderEvent(event, index);
              })
            : h('div', {
                style: {
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: '#6b7280'
                }
              },
                h('p', { style: { fontSize: '18px' } }, 'No events yet'),
                h('p', { style: { fontSize: '14px', marginTop: '8px' } }, 'Add an event to see it here')
              )
        )
      );
    };

    CMS.registerPreviewTemplate('content', ContentPreview);
    console.log('Events preview template registered!');

  } else {
    console.error('CMS not available');
  }
}, 1000);
