import React, { useState, useEffect } from 'react';
import './popup.css';

interface Profile {
  name: string;
  headline: string;
  about: string;
  experience: string[];
  imageUrl: string;
  url: string;
}

interface RomanticScore {
  score: number;
  insights: string[];
}

const PopupApp: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingVoice, setGeneratingVoice] = useState(false);
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);
  const [romanticScore, setRomanticScore] = useState<RomanticScore | null>(null);
  const [generatingScore, setGeneratingScore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get profile from storage
    chrome.storage.local.get('currentProfile', (result) => {
      if (result.currentProfile) {
        setProfile(result.currentProfile);
      }
      setLoading(false);
    });
  }, []);

  const generateVoicePreview = async () => {
    if (!profile) return;

    setGeneratingVoice(true);
    setError(null);

    try {
      // Create text for voice generation
      const voiceText = `Hi, I'm ${profile.name}. ${profile.headline}. ${profile.about.substring(0, 200)}`;

      // Call ElevenLabs API
      // NOTE: You'll need to add your API key here or use a backend proxy
      const ELEVENLABS_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with actual key
      const ELEVENLABS_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Default voice

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: voiceText,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate voice');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setVoiceUrl(audioUrl);
    } catch (err) {
      console.error('Error generating voice:', err);
      setError('Failed to generate voice preview. Please check API key.');
    } finally {
      setGeneratingVoice(false);
    }
  };

  const generateRomanticScore = async () => {
    if (!profile) return;

    setGeneratingScore(true);
    setError(null);

    try {
      // Create prompt for Anthropic
      const prompt = `Analyze this LinkedIn profile for romantic compatibility and give a score from 0-100, plus 2-3 insights.

Name: ${profile.name}
Headline: ${profile.headline}
About: ${profile.about}
Experience: ${profile.experience.join(', ')}

Respond in this format:
Score: [number]/100
Insights:
- [insight 1]
- [insight 2]
- [insight 3]`;

      // Call Anthropic API
      // NOTE: You'll need to add your API key here or use a backend proxy
      const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with actual key

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate score');
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Parse response
      const scoreMatch = content.match(/Score:\s*(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;

      const insights: string[] = [];
      const insightMatches = content.match(/Insights?:([\s\S]*?)(?:\n\n|$)/i);
      if (insightMatches) {
        const insightText = insightMatches[1];
        const lines = insightText.split('\n').filter(line => line.trim().startsWith('-'));
        insights.push(...lines.map(line => line.replace(/^-\s*/, '').trim()).filter(Boolean));
      }

      setRomanticScore({ score, insights: insights.slice(0, 3) });
    } catch (err) {
      console.error('Error generating score:', err);
      setError('Failed to generate romantic score. Please check API key.');
    } finally {
      setGeneratingScore(false);
    }
  };

  if (loading) {
    return (
      <div className="popup-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="popup-container">
        <div className="popup-header">
          <h1>💕 Love Dial</h1>
          <p>Making LinkedIn connections more personal</p>
        </div>
        <div className="empty-state">
          <p>Visit a LinkedIn profile and click the "Call" button to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h1>💕 Love Dial</h1>
        <p>Making LinkedIn connections more personal</p>
      </div>
      
      <div className="popup-content">
        {error && <div className="error">{error}</div>}

        <div className="profile-card">
          <div className="profile-header">
            {profile.imageUrl && (
              <img src={profile.imageUrl} alt={profile.name} className="profile-image" />
            )}
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p>{profile.headline}</p>
            </div>
          </div>
          {profile.about && (
            <div className="profile-about">
              {profile.about.substring(0, 200)}...
            </div>
          )}
        </div>

        <button
          className="button button-primary"
          onClick={generateVoicePreview}
          disabled={generatingVoice}
        >
          {generatingVoice ? (
            <>
              <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
              Generating Voice...
            </>
          ) : (
            <>
              🎤 Generate Voice Preview
            </>
          )}
        </button>

        {voiceUrl && (
          <audio controls className="audio-player" src={voiceUrl}>
            Your browser does not support the audio element.
          </audio>
        )}

        <button
          className="button button-primary"
          onClick={generateRomanticScore}
          disabled={generatingScore}
        >
          {generatingScore ? (
            <>
              <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
              Analyzing Compatibility...
            </>
          ) : (
            <>
              💖 Get Romantic Score
            </>
          )}
        </button>

        {romanticScore && (
          <div className="romantic-score">
            <div className="score-header">
              <h3>Romantic Compatibility</h3>
              <div className="score-value">{romanticScore.score}/100</div>
            </div>
            <div className="score-insights">
              {romanticScore.insights.map((insight, idx) => (
                <div key={idx} className="insight-item">
                  {insight}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupApp;

