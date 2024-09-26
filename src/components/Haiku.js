import React, { useState } from 'react';
import haikuService from '../services/haiku.service';
import '../styles/HaikuComponent.css';
import loadingIcon from '../assets/loading.gif';

const HaikuComponent = () => {

    // 'haiku' - state variable - remembers value and re-renders the screen when changed using 'setHaiku'
    // 'useState' - React Hook - returns an arr where arr[0] is initial value and arr[1] is an update function 
    // 'setHaiku' - updates 'haiku' and triggers a re-render
    const [haiku, setHaiku] = useState('');
    const [secret, setSecret] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);

    //asynchronous - allows concurrent processes
    //asynchronous - tasks don't block each other
    //synchronous - tasks must complete one after another
    //async allows you to use await
    const handleCalculate = async () => {
        setError('');``
        setResult('');
        setLoading(true);

        try {
            //empty string = false, non-empty string = true
            if (secret) {
                // The 'await' keyword pauses the execution of the code until the Promise returned by 'haikuService.getHaiku(secret)' resolves.
                // Without 'await', 'response' would be the promise, not the resolved value.
                // Promise - a value that may be available in the future; allows code execution to continue immediately.
                // Promise - would use .then() or .catch() to process the result and any errors.
                // Using 'await' simplifies the code by allowing us to work directly with the resolved value.
                const response = await haikuService.getHaiku(secret);
                
                //without await response might not be there and this would lead to an error
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
