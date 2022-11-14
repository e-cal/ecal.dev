import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export const ParticleEffect = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#0c0c0c",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: ["attract", "repulse"],
            },
            onHover: {
              enable: true,
              mode: "connect",
            },
            resize: true,
          },
          modes: {
            connect: {
              distance: 100,
              radius: 100,
              links: { opacity: 0.7 },
            },
            grab: {
              distance: 300,
              links: { opacity: 2 },
            },
            bubble: {
              distance: 300,
              size: 30,
              duration: 0.3,
            },
            repulse: {
              distance: 75,
              duration: 2,
              speed: 5,
            },
            attract: {
              distance: 750,
              duration: 1,
              speed: 2,
              easing: "ease-in-out-expo",
            },
            push: {
              quantity: 100,
            },
            remove: {
              quantity: 4,
            },
            trail: {
              delay: 0.1,
              quantity: 10,
              pauseOnStop: false,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            directions: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 70,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
