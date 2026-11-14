import { useCallback, useEffect, useRef, useState } from 'react';

export type RecorderState = 'idle' | 'requesting' | 'recording' | 'stopped' | 'error';

function pickMimeType(): string | undefined {
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
  ];
  if (typeof MediaRecorder === 'undefined') return undefined;
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported(c)) return c;
  }
  return undefined;
}

export function useRecorder() {
  const [state, setState] = useState<RecorderState>('idle');
  const [error, setError] = useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const sessionRef = useRef(0);
  const startingRef = useRef(false);

  const stopTracks = useCallback(() => {
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
  }, []);

  const start = useCallback(async () => {
    if (startingRef.current || recorderRef.current) return;
    startingRef.current = true;
    const session = ++sessionRef.current;
    setError(null);
    setState('requesting');
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (session !== sessionRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      mediaStreamRef.current = stream;
      const mimeType = pickMimeType();
      const rec = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      recorderRef.current = rec;

      rec.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data);
      };

      rec.onerror = () => {
        if (session !== sessionRef.current) return;
        stopTracks();
        recorderRef.current = null;
        setError('Recording error');
        setState('error');
      };

      rec.start(250);
      setState('recording');
    } catch (e) {
      if (session !== sessionRef.current) return;
      recorderRef.current = null;
      const msg = e instanceof Error ? e.message : 'Microphone permission denied';
      setError(msg);
      setState('error');
      stopTracks();
    } finally {
      if (session === sessionRef.current) startingRef.current = false;
    }
  }, [stopTracks]);

  const stop = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const rec = recorderRef.current;
      if (!rec || rec.state === 'inactive') {
        stopTracks();
        setState('idle');
        resolve(null);
        return;
      }

      rec.onstop = () => {
        const mime = rec.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: mime });
        chunksRef.current = [];
        recorderRef.current = null;
        stopTracks();
        setState('stopped');
        resolve(blob.size > 0 ? blob : null);
      };

      try {
        rec.stop();
      } catch {
        stopTracks();
        setState('idle');
        resolve(null);
      }
    });
  }, [stopTracks]);

  const cancel = useCallback(() => {
    sessionRef.current++;
    startingRef.current = false;
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') {
      rec.onstop = null;
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    }
    chunksRef.current = [];
    recorderRef.current = null;
    stopTracks();
    setState('idle');
    setError(null);
  }, [stopTracks]);

  useEffect(() => () => {
    sessionRef.current++;
    const rec = recorderRef.current;
    if (rec) {
      rec.ondataavailable = null;
      rec.onerror = null;
      try { if (rec.state !== 'inactive') rec.stop(); } catch { /* already stopped */ }
    }
    recorderRef.current = null;
    stopTracks();
  }, [stopTracks]);

  const resetStopped = useCallback(() => {
    setState('idle');
  }, []);

  return { state, error, start, stop, cancel, resetStopped };
}
