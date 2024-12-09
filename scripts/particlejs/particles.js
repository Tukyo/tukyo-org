particlesJS("background", {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 315
      }
    },
    color: {
      value: ["#671913", "#674e1a", "#117b17", "#182878", "#921d91"]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.75,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 2.5,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.5,
      width: 1.5
    },
    move: {
      enable: true,
      speed: 2.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 1140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true,
  fn: {
    interact: {},
    modes: {},
    vendors: {
      lineColor: function(particle) {
        return particle.color.value; // Match line color to particle color
      }
    }
  }
});

// Extend `particles.js` to assign dynamic line colors
const particlesJSInstance = pJSDom[0].pJS;
particlesJSInstance.fn.interact.linkParticles = function(p1, p2) {
  const dx = p1.x - p2.x,
    dy = p1.y - p2.y,
    dist = Math.sqrt(dx * dx + dy * dy);

  if (dist <= particlesJSInstance.particles.line_linked.distance) {
    const opacity = particlesJSInstance.particles.line_linked.opacity - dist / particlesJSInstance.particles.line_linked.distance;

    if (opacity > 0) {
      const ctx = particlesJSInstance.canvas.ctx;

      // Blend particle colors by averaging RGB values
      const r = Math.floor((p1.color.rgb.r + p2.color.rgb.r) / 2);
      const g = Math.floor((p1.color.rgb.g + p2.color.rgb.g) / 2);
      const b = Math.floor((p1.color.rgb.b + p2.color.rgb.b) / 2);

      ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
      ctx.lineWidth = particlesJSInstance.particles.line_linked.width;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.closePath();
    }
  }
};
