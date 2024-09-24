import React, { useState } from 'react';
import haikuService from '../services/haiku.service';
import '../styles/HaikuComponent.css';
import loadingIcon from '../assets/loading.gif';

const HaikuComponent = () => {
    const [haiku, setHaiku] = useState('');
    const [secret, setSecret] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);

    const handleCalculate = async () => {
        setError('');
        setResult('');
        setLoading(true);

        try {
            if (secret) {
                const response = await haikuService.getHaiku(secret);
                setResult(response.data);
            } else if (haiku) {
                const response = await haikuService.getSecret(haiku);
                setResult(response.data);
            }
            setIsCalculated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setHaiku('');
        setSecret('');
        setResult('');
        setError('');
        setIsCalculated(false);
    };

    return (
        <div className="haiku-container">
            {error && <p className="error-message">Error: {error}</p>}
            <div className="input-group">
                <label>
                    Secret:
                    <input
                        type="text"
                        value={secret}
                        maxLength={30}
                        onChange={(e) => {
                            setSecret(e.target.value);
                            if (e.target.value) setHaiku('');
                        }}
                        disabled={haiku.length > 0}
                        className="secret-input"
                    />
                </label>
            </div>
            <div className="input-group">
                <label>
                    Haiku:
                    <textarea
                        value={haiku}
                        onChange={(e) => {
                            setHaiku(e.target.value);
                            if (e.target.value) setSecret('');
                        }}
                        disabled={secret.length > 0}
                        className="haiku-input"
                    />
                </label>
            </div>
            <div className="button-group">
                {/* Loading Indicator on the far left */}
                {loading && (
                    <div className="loading-message">
                        <img src={loadingIcon} alt="Loading..." className="loading-icon" />
                        <span>Calculating... This might take up to 30 seconds.</span>
                    </div>
                )}

                {/* Grouping the Calculate and Reset buttons on the far right */}
                <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                    {/* Calculate Button */}
                    <button
                        className="calculate-button"
                        onClick={handleCalculate}
                        disabled={loading || isCalculated}
                    >
                        Calculate
                    </button>

                    {/* Reset Button */}
                    <button
                        className="reset-button"
                        onClick={handleReset}
                        disabled={!isCalculated}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Display result */}
            <div className="result-display" dangerouslySetInnerHTML={{ __html: result }} />
        </div>
    );
};

export default HaikuComponent;
