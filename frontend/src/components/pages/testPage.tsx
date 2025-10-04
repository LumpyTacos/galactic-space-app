export default function TestPage() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
                zIndex: 0,
            }}
        >
            {/* Star field effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}>
                {/* Glowing dots for stars */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '15%',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 60%, #00f6ff 100%)',
                    boxShadow: '0 0 12px 4px #00f6ff',
                    opacity: 0.8,
                }} />
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    left: '70%',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 70%, #0ff 100%)',
                    boxShadow: '0 0 8px 2px #0ff',
                    opacity: 0.7,
                }} />
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 80%, #fff 100%)',
                    boxShadow: '0 0 10px 3px #fff',
                    opacity: 0.6,
                }} />
                <div style={{
                    position: 'absolute',
                    top: '75%',
                    left: '30%',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 80%, #bbb 100%)',
                    boxShadow: '0 0 6px 2px #bbb',
                    opacity: 0.5,
                }} />
            </div>
            <h1
                style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: '3em',
                    color: '#fff',
                    textShadow: '0 0 16px #00f6ff, 0 0 32px #0ff, 0 0 4px #fff',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                }}
            >
                Title
            </h1>
            <h2 style={{ marginTop: '0.5em', color: '#bbb', position: 'relative', zIndex: 1 }}>Subtitle goes here</h2>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '1em' }}>
                <div
                    style={{
                        marginLeft: '0.5in',
                        width: '50vw',
                        minHeight: '200px',
                        background: 'rgba(20, 24, 40, 0.85)',
                        color: '#fff',
                        padding: '1em',
                        boxSizing: 'border-box',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <p>This is the body content. It starts half an inch from the left and reaches up to the midway point of the page.</p>
                </div>
                <div
                    style={{
                        width: 'calc(50vw - 0.5in)',
                        minHeight: '200px',
                        marginLeft: '2em',
                        background: 'rgba(30, 34, 54, 0.85)',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    {/* Chart placeholder */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <svg width="200" height="120">
                            <rect x="10" y="80" width="30" height="30" fill="#00f6ff" />
                            <rect x="50" y="60" width="30" height="50" fill="#0ff" />
                            <rect x="90" y="40" width="30" height="70" fill="#fff" />
                            <rect x="130" y="20" width="30" height="90" fill="#bbb" />
                        </svg>
                        <div style={{ color: '#fff', fontSize: '16px', marginTop: '0.5em', textAlign: 'center' }}>Chart</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
