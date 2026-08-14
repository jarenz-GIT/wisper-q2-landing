import styles from "./OurProcess.module.css";

const PROCESS_IMAGES = {
  listen: {
    src: "/images/process/process-listen.png",
    alt: "Listen process sketchpad",
  },
  map: {
    src: "/images/process/process-map.png",
    alt: "Map process sketchpad",
  },
  sketch: {
    src: "/images/process/process-sketch.png",
    alt: "Sketch process sketchpad",
  },
  build: {
    src: "/images/process/process-build.png",
    alt: "Build process sketchpad",
  },
  launch: {
    src: "/images/process/process-launch.png",
    alt: "Launch process sketchpad",
  },
  scale: {
    src: "/images/process/process-scale.png",
    alt: "Scale process sketchpad",
  },
};

function ProcessImageSketchpad({ image }) {
  return (
    <div className={styles.processImageFrame}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.src} alt={image.alt} className={styles.processImage} />
    </div>
  );
}

export function ListenSketchpad() {
  return <ProcessImageSketchpad image={PROCESS_IMAGES.listen} />;
}

export function MapSketchpad() {
  return <ProcessImageSketchpad image={PROCESS_IMAGES.map} />;
}

export function SketchSketchpad() {
  return <ProcessImageSketchpad image={PROCESS_IMAGES.sketch} />;
}

export function BuildSketchpad() {
  return <ProcessImageSketchpad image={PROCESS_IMAGES.build} />;
}

export function LaunchSketchpad() {
  return <ProcessImageSketchpad image={PROCESS_IMAGES.launch} />;
}

export function ScaleSketchpad() {
  return <ProcessImageSketchpad image={PROCESS_IMAGES.scale} />;
}

const SKETCHPADS = {
  1: ListenSketchpad,
  2: MapSketchpad,
  3: SketchSketchpad,
  4: BuildSketchpad,
  5: LaunchSketchpad,
  6: ScaleSketchpad,
};

export function SketchpadContent({ stepId }) {
  const Component = SKETCHPADS[stepId] ?? ListenSketchpad;
  return <Component />;
}
