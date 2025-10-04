            {/* Third layer of bushes even further below the page */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                position: 'fixed',
                paddingBottom: '.2in',
                left: 0,
                zIndex: 5,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <img
                        key={i + 100}
                        src={i % 2 === 0 ? "/Images/Bush 2.png" : "/Images/Bush 1.png"}
                        alt={`Bush ${i % 2 === 0 ? '2' : '1'}`}
                        style={{
                            width: '170px',
                            height: 'auto',
                            marginLeft: i === 0 ? 0 : '-40px',
                            opacity: 0.7,
                        }}
                    />
                ))}
            </div>
            {/* Layer of bushes slightly below the bottom of the page */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                position: 'fixed',
                bottom: '1in',
                left: 0,
                zIndex: 4,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <img
                        key={i + 40}
                        src={i % 2 === 0 ? "/Images/Bush 1.png" : "/Images/Bush 2.png"}
                        alt={`Bush ${i % 2 === 0 ? '1' : '2'}`}
                        style={{
                            width: '170px',
                            height: 'auto',
                            marginLeft: i === 0 ? 0 : '-40px',
                            opacity: 0.8,
                        }}
                    />
                ))}
            </div>
            {/* Second layer of bushes above the base */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                position: 'fixed',
                bottom: '0.2in',
                left: 0,
                zIndex: 3,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <img
                        key={i + 20}
                        src={i % 2 === 0 ? "/Images/Bush 2.png" : "/Images/Bush 1.png"}
                        alt={`Bush ${i % 2 === 0 ? '2' : '1'}`}
                        style={{
                            width: '140px',
                            height: 'auto',
                            marginLeft: i === 0 ? 0 : '-30px',
                            opacity: 0.85,
                        }}
                    />
                ))}
            </div>
export default function testPagePlant() {
    return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: '#c8e6c9' }}>
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1in' }}>
                    <h1 style={{ fontSize: '2.5em', fontWeight: 'bold' }}>Header Title</h1>
                    <h2 style={{ fontSize: '1.5em', color: '#555', marginTop: '0.3em' }}>Subtitle goes here</h2>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '2em' }}>
                <div
                    style={{
                        marginLeft: '0.5in',
                        width: '50vw',
                        minHeight: '200px',
                        background: '#f1f8ee',
                        color: '#222',
                        padding: '1em',
                        boxSizing: 'border-box',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                >
                    <p>This is the body section. It starts half an inch from the left and goes to the midpoint of the page.</p>
                </div>
                <div
                    style={{
                        width: 'calc(50vw - 0.5in)',
                        minHeight: '200px',
                        marginLeft: '2em',
                        background: '#e8f5e9',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Simple bar chart for plant growth comparison */}
                    <svg width="220" height="140">
                        <rect x="30" y="80" width="30" height="40" fill="#81c784" />
                        <rect x="80" y="60" width="30" height="60" fill="#388e3c" />
                        <rect x="130" y="100" width="30" height="20" fill="#c8e6c9" />
                        <rect x="180" y="40" width="30" height="80" fill="#43a047" />
                        <text x="45" y="130" textAnchor="middle" fill="#222" fontSize="12">Soil</text>
                        <text x="95" y="130" textAnchor="middle" fill="#222" fontSize="12">Hydro</text>
                        <text x="145" y="130" textAnchor="middle" fill="#222" fontSize="12">Sand</text>
                        <text x="195" y="130" textAnchor="middle" fill="#222" fontSize="12">Aeroponic</text>
                        <text x="110" y="20" textAnchor="middle" fill="#222" fontSize="16">Plant Growth Comparison</text>
                    </svg>
                </div>
            </div>
            {/* Bush image at the bottom center */}
            {/* Tree behind bushes */}
            <div style={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                pointerEvents: 'none',
            }}>
                <img
                    src="/Images/Tree 1.png"
                    alt="Tree 1"
                    style={{
                        width: '200px',
                        height: 'auto',
                        marginBottom: '0.2em',
                        zIndex: 1,
                    }}
                />
            </div>
            {/* Bushes in front of tree */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 2,
                paddingBottom: '0em',
                overflow: 'hidden',
            }}>
                {Array.from({ length: 7 }).map((_, i) => (
                    <img
                        key={i}
                        src={i % 2 === 0 ? "/Images/Bush 1.png" : "/Images/Bush 2.png"}
                        alt={`Bush ${i % 2 === 0 ? '1' : '2'}`}
                        style={{
                            width: '170px',
                            height: 'auto',
                            marginLeft: i === 0 ? 0 : '-40px',
                        }}
                    />
                ))}
                {Array.from({ length: 7 }).map((_, i) => (
                    <img
                        key={i + 7}
                        src={i % 2 === 0 ? "/Images/Bush 1.png" : "/Images/Bush 2.png"}
                        alt={`Bush ${i % 2 === 0 ? '1' : '2'}`}
                        style={{
                            width: '170px',
                            height: 'auto',
                            marginLeft: '-40px',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}