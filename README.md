# Audio Word Cloud - Frontend

The frontend for Audio Word Cloud, a web app that lets users record or upload an audio session and turn the analysed content into a visual word cloud.

The frontend provides the audio recording and upload interface, validation feedback, analysis states, transcript display, word cloud visualisation and saved analyses.

## What I built

The frontend supports:

- Recording audio directly from the browser
- Starting and stopping recordings
- Recording timer
- Audio playback before analysis
- Discarding and re-recording
- Uploading MP3, WAV, M4A, AAC, OGG, WEBM and FLAC files
- File size and duration validation
- Maximum 25 MB or 10 minutes per audio file
- Loading and error states during analysis
- Displaying the generated word cloud
- Downloading the word cloud as a PNG
- Viewing the full transcript
- Copying and downloading the transcript
- Removing terms from the displayed word cloud
- Saving analyses locally in the browser
- Re-opening saved analyses
- Responsive layout for desktop and mobile screens

The frontend is connected to a separate Express backend for audio analysis and transcription.

## How to run locally

### 1. Clone the frontend repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd <YOUR_FRONTEND_PROJECT_FOLDER>

Tech stack
  Next.js
  React
  TypeScript
  Tailwind CSS
  @cp949/react-wordcloud

Browser APIs used:
  MediaRecorder API
  File API
  Clipboard API
  localStorage