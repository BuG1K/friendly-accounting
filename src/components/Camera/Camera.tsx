import {
  createRef, FunctionComponent, useEffect, useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import jsQR from 'jsqr';

import useStyles from './styledCamera';

const Camera: FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const videoRef = createRef<HTMLVideoElement>();
  const tracksRef = useRef<MediaStreamTrack[]>();
  const animateRef = useRef<number>(0);

  const getImageData = (videoElement: HTMLVideoElement) => {
    const canvasElement = document.createElement('canvas');
    videoElement.append(canvasElement);
    const canvas = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    canvasElement.height = videoElement.videoHeight;
    canvasElement.width = videoElement.videoWidth;
    canvas.drawImage(
      videoElement,
      0, 0,
      canvasElement.width, canvasElement.height,
    );

    return canvas.getImageData(
      0, 0,
      canvasElement.width,
      canvasElement.height,
    );
  };

  const animate = () => {
    const videoElement = videoRef.current;

    if (
      videoElement
      && (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA)
    ) {
      const imageData = getImageData(videoElement);
      const code = jsQR(
        imageData.data, imageData.width, imageData.height,
        { inversionAttempts: 'dontInvert' },
      );

      if (code) {
        const { data } = code;
        const arrParams = ['t', 's', 'fn', 'i', 'fp', 'n'];
        let pass = true;

        arrParams.forEach((check) => {
          if (data.indexOf(check) < 0) pass = false;
        });

        if (pass) history.push({ pathname: '/', state: { qr: code.data } });
      }
    }

    animateRef.current = requestAnimationFrame(animate);
  };

  const handleStream = (stream: MediaStream) => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.srcObject = stream;
      videoElement.setAttribute('playsinline', 'true');
      videoElement.play();

      tracksRef.current = stream.getTracks();
      animateRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(handleStream);

    return () => {
      cancelAnimationFrame(animateRef.current);
      tracksRef.current?.forEach((track) => track.stop());
    };
  }, []);

  return (
    <video className={classes.root} ref={videoRef} height={720} width={480} />
  );
};

export default Camera;
