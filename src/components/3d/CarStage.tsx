"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  Rotate3d,
  Compass,
  RefreshCw,
  Sun,
} from "lucide-react";

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  threeColor: number;
  badge: string;
  finish: string;
}

export const GRAND_VITARA_COLORS: ColorSwatch[] = [
  {
    id: "arctic-white",
    name: "Arctic White",
    hex: "#F4F5F7",
    threeColor: 0xF3F4F6,
    badge: "Pearl Metallic",
    finish: "Dual-Stage High-Gloss Pearl Clearcoat",
  },
  {
    id: "splendid-silver",
    name: "Splendid Silver",
    hex: "#C2C6CC",
    threeColor: 0xBFC4CA,
    badge: "Metallic Accent",
    finish: "Liquid Aluminum Metallic",
  },
  {
    id: "magma-grey",
    name: "Metallic Magma Grey",
    hex: "#4B5056",
    threeColor: 0x484D53,
    badge: "Graphite Pearl",
    finish: "Deep Flake Charcoal Metallic",
  },
  {
    id: "phoenix-red",
    name: "Phoenix Red",
    hex: "#C8102E",
    threeColor: 0xBD0F2A,
    badge: "Signature Sport",
    finish: "Multi-Coat Candy Clearcoat",
  },
  {
    id: "oxford-blue",
    name: "Prime Oxford Blue",
    hex: "#102A54",
    threeColor: 0x0E264E,
    badge: "Executive Pearl",
    finish: "Deep Marine Sapphire Metallic",
  },
];

interface CarStageProps {
  modelName?: string;
  variantName?: string;
  startingPrice?: string;
  onColorChange?: (swatch: ColorSwatch) => void;
}

export default function CarStage({
  modelName = "GRAND VITARA",
  variantName = "ALPHA+ STRONG HYBRID (e-CVT)",
  startingPrice = "₹ 10.99 Lakh*",
  onColorChange,
}: CarStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<ColorSwatch>(GRAND_VITARA_COLORS[0]);
  const [rotationDegrees, setRotationDegrees] = useState<number>(35);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carBodyMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const rootCarGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationYRef = useRef<number>(0.6);
  const currentRotationYRef = useRef<number>(0.6);
  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartXRef = useRef<number>(0);
  const pointerStartRotationRef = useRef<number>(0.6);
  const animFrameIdRef = useRef<number>(0);

  // Handle color change
  const handleColorSelect = useCallback(
    (swatch: ColorSwatch) => {
      setActiveColor(swatch);
      if (onColorChange) onColorChange(swatch);

      carBodyMaterialsRef.current.forEach((mat) => {
        mat.color.setHex(swatch.threeColor);
        mat.needsUpdate = true;
      });
    },
    [onColorChange]
  );

  const resetCamera = () => {
    targetRotationYRef.current = 0.6;
    setAutoRotate(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Daylight Studio Atmosphere
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Crisp high-key daylight seamless cove
    const coveColor = 0xF5F6F8;
    scene.background = new THREE.Color(coveColor);
    scene.fog = new THREE.Fog(coveColor, 14, 38);

    // 2. Camera: Architectural Eye-Level Telephoto
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 2.3, 11.2);
    camera.lookAt(0, 0.75, 0);

    // 3. Renderer: High-Precision WebGL with Soft PCF Shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. High-Key Daylight Lighting Rig (Official OEM Studio)
    // Overhead Sky/Ground Hemisphere
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xE2E5EA, 1.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Overhead High-Intensity Daylight Softbox (Directional Sun)
    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 2.4);
    sunLight.position.set(6, 14, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 28;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    sunLight.shadow.bias = -0.00015;
    sunLight.shadow.radius = 3.5; // Soft diffused shadow
    scene.add(sunLight);

    // Soft Warm Key Fill (Front-Left)
    const warmFill = new THREE.DirectionalLight(0xFFF7ED, 0.85);
    warmFill.position.set(-8, 5, 6);
    scene.add(warmFill);

    // Cool Ambient Back-Rim Fill (Rear-Right)
    const coolRim = new THREE.DirectionalLight(0xEFF6FF, 1.1);
    coolRim.position.set(8, 6, -7);
    scene.add(coolRim);

    // Subtle Under-Bumper Up-Light
    const bounceLight = new THREE.DirectionalLight(0xF8FAFC, 0.5);
    bounceLight.position.set(0, -2, 4);
    scene.add(bounceLight);

    // 5. Studio Floor: Off-white Matte Showroom with Rotating Stage Rings
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xF2F4F7,
      roughness: 0.88,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // Architectural Brushed Aluminum Turntable Stage Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD1D5DB,
      metalness: 0.8,
      roughness: 0.25,
    });
    const darkRingMat = new THREE.MeshBasicMaterial({
      color: 0xE2E5E9,
    });

    const outerRing = new THREE.Mesh(new THREE.RingGeometry(3.9, 3.94, 128), ringMat);
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = 0.002;
    scene.add(outerRing);

    const innerRing = new THREE.Mesh(new THREE.RingGeometry(2.7, 2.72, 96), darkRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.002;
    scene.add(innerRing);

    // Ambient radial stage ticks (every 30 degrees)
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const tick = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 0.25), ringMat);
      tick.rotation.x = -Math.PI / 2;
      tick.rotation.z = angle;
      tick.position.x = Math.sin(angle) * 3.85;
      tick.position.z = Math.cos(angle) * 3.85;
      tick.position.y = 0.003;
      scene.add(tick);
    }

    // Contact Shadow Disc (Baked Soft Ambient Occlusion Under Tires)
    const shadowDisc = new THREE.Mesh(
      new THREE.CircleGeometry(2.6, 64),
      new THREE.MeshBasicMaterial({
        color: 0x9CA3AF,
        transparent: true,
        opacity: 0.24,
      })
    );
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = 0.001;
    shadowDisc.scale.set(1.15, 1.85, 1);
    scene.add(shadowDisc);

    // 6. BUILD PROCEDURAL 3D GRAND VITARA CHASSIS & SCULPTURE
    const carGroup = new THREE.Group();
    rootCarGroupRef.current = carGroup;
    scene.add(carGroup);

    // Shared Materials
    const bodyPaintMat = new THREE.MeshPhysicalMaterial({
      color: activeColor.threeColor,
      metalness: 0.82,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });
    carBodyMaterialsRef.current = [bodyPaintMat];

    // Contrast Cladding & Pillar Gloss Black
    const blackGlossMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      metalness: 0.6,
      roughness: 0.15,
    });

    // Tough Matte Lower Cladding
    const claddingMat = new THREE.MeshStandardMaterial({
      color: 0x1F2328,
      metalness: 0.2,
      roughness: 0.85,
    });

    // Brushed Satin Chrome (Grille, Skid Plates, Badging)
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xEDEDED,
      metalness: 0.95,
      roughness: 0.12,
    });

    // Deep Tinted Privacy Glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0B0E14,
      transmission: 0.45,
      transparent: true,
      opacity: 0.88,
      roughness: 0.05,
      metalness: 0.15,
    });

    // High-Intensity Headlamp Crystal Emissive
    const drlEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    // Signature Rear Connected Tail-Lamp Bar
    const tailLampMat = new THREE.MeshStandardMaterial({
      color: 0xFF1E28,
      emissive: 0xDC2626,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });

    // Wheels: Matte Rubber + Precision Diamond-Cut Alloy Rim
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x1C1F22,
      roughness: 0.9,
      metalness: 0.05,
    });
    const alloyRimMat = new THREE.MeshStandardMaterial({
      color: 0xE5E7EB,
      metalness: 0.92,
      roughness: 0.18,
    });

    // A. Main Sculpted Monocoque Hull
    // Lower Body
    const lowerBodyGeo = new THREE.BoxGeometry(2.05, 0.42, 4.3);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyPaintMat);
    lowerBody.position.y = 0.58;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    carGroup.add(lowerBody);

    // Muscular Sculpted Hood / Bonnet
    const hoodGeo = new THREE.BoxGeometry(1.98, 0.28, 1.4);
    const hood = new THREE.Mesh(hoodGeo, bodyPaintMat);
    hood.position.set(0, 0.88, 1.35);
    hood.rotation.x = 0.04;
    hood.castShadow = true;
    carGroup.add(hood);

    // Front Flared Fenders
    const fenderGeo = new THREE.BoxGeometry(2.12, 0.45, 1.2);
    const fender = new THREE.Mesh(fenderGeo, bodyPaintMat);
    fender.position.set(0, 0.65, 1.3);
    fender.castShadow = true;
    carGroup.add(fender);

    // Greenhouse Cabin (Sloping Roofline & Floating Contrast A/B/C Pillars)
    const cabinGeo = new THREE.BoxGeometry(1.72, 0.68, 2.3);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(0, 1.25, -0.2);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Roof Panel (Dual-Tone Gloss Black)
    const roofGeo = new THREE.BoxGeometry(1.68, 0.08, 2.25);
    const roof = new THREE.Mesh(roofGeo, blackGlossMat);
    roof.position.set(0, 1.62, -0.2);
    roof.castShadow = true;
    carGroup.add(roof);

    // Rear Aero Roof Spoiler
    const spoilerGeo = new THREE.BoxGeometry(1.65, 0.06, 0.35);
    const spoiler = new THREE.Mesh(spoilerGeo, blackGlossMat);
    spoiler.position.set(0, 1.64, -1.35);
    carGroup.add(spoiler);

    // Satin Chrome Roof Rails
    const railGeo = new THREE.BoxGeometry(0.04, 0.05, 1.8);
    const leftRail = new THREE.Mesh(railGeo, chromeMat);
    leftRail.position.set(-0.78, 1.67, -0.2);
    const rightRail = new THREE.Mesh(railGeo, chromeMat);
    rightRail.position.set(0.78, 1.67, -0.2);
    carGroup.add(leftRail, rightRail);

    // B. Front Fascia: Signature Maruti Grand Vitara Hexagonal Winged Grille
    const grilleBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 0.36, 0.15),
      blackGlossMat
    );
    grilleBase.position.set(0, 0.72, 2.12);
    carGroup.add(grilleBase);

    // Signature Chrome Wing
    const chromeWing = new THREE.Mesh(
      new THREE.BoxGeometry(1.72, 0.05, 0.16),
      chromeMat
    );
    chromeWing.position.set(0, 0.84, 2.13);
    carGroup.add(chromeWing);

    // Suzuki "S" Emblem
    const emblem = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.14, 0.19),
      chromeMat
    );
    emblem.position.set(0, 0.78, 2.14);
    carGroup.add(emblem);

    // Triple-LED Projector DRL Clusters
    const drlLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.08, 0.1),
      drlEmissiveMat
    );
    drlLeft.position.set(-0.75, 0.88, 2.12);
    const drlRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.08, 0.1),
      drlEmissiveMat
    );
    drlRight.position.set(0.75, 0.88, 2.12);
    carGroup.add(drlLeft, drlRight);

    // Lower Front Satin Silver Skid Plate
    const frontSkidPlate = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.12, 0.2),
      chromeMat
    );
    frontSkidPlate.position.set(0, 0.36, 2.1);
    frontSkidPlate.rotation.x = -0.15;
    carGroup.add(frontSkidPlate);

    // Tough Lower Body Cladding Sills
    const sideCladdingLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.16, 4.34),
      claddingMat
    );
    sideCladdingLeft.position.set(-1.05, 0.42, 0);
    const sideCladdingRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.16, 4.34),
      claddingMat
    );
    sideCladdingRight.position.set(1.05, 0.42, 0);
    carGroup.add(sideCladdingLeft, sideCladdingRight);

    // C. Rear Fascia: Connected NEXTre' LED Tail-Lamp Bar
    const rearBar = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.06, 0.1),
      tailLampMat
    );
    rearBar.position.set(0, 0.95, -2.14);
    carGroup.add(rearBar);

    // Rear "GRAND VITARA" Chrome Plate
    const rearChrome = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.06, 0.08),
      chromeMat
    );
    rearChrome.position.set(0, 0.82, -2.14);
    carGroup.add(rearChrome);

    // Rear Satin Silver Skid Diffuser
    const rearSkid = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.15, 0.18),
      chromeMat
    );
    rearSkid.position.set(0, 0.38, -2.12);
    rearSkid.rotation.x = 0.15;
    carGroup.add(rearSkid);

    // D. 4 Precision Diamond-Cut Alloy Wheels
    const wheelPositions = [
      { x: -0.98, y: 0.36, z: 1.35 },
      { x: 0.98, y: 0.36, z: 1.35 },
      { x: -0.98, y: 0.36, z: -1.3 },
      { x: 0.98, y: 0.36, z: -1.3 },
    ];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, pos.y, pos.z);

      // Tire (Tread Ring)
      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.24, 32);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Precision Multi-Spoke Alloy Rim
      const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.245, 16);
      const rim = new THREE.Mesh(rimGeo, alloyRimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      // Hub Cap Accent
      const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.255, 12);
      const hub = new THREE.Mesh(hubGeo, chromeMat);
      hub.rotation.z = Math.PI / 2;
      wheelGroup.add(hub);

      // Geometric Spoke Cross
      const spoke1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.44, 0.25),
        blackGlossMat
      );
      const spoke2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.44, 0.25),
        blackGlossMat
      );
      spoke2.rotation.x = Math.PI / 2;
      wheelGroup.add(spoke1, spoke2);

      carGroup.add(wheelGroup);
    });

    // Aerodynamic Side Mirrors
    const mirrorLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.12, 0.14),
      blackGlossMat
    );
    mirrorLeft.position.set(-1.08, 1.15, 0.85);
    const mirrorRight = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.12, 0.14),
      blackGlossMat
    );
    mirrorRight.position.set(1.08, 1.15, 0.85);
    carGroup.add(mirrorLeft, mirrorRight);

    // Initial orientation
    carGroup.position.y = 0;
    carGroup.rotation.y = currentRotationYRef.current;

    // 7. Render Animation Loop with Smooth Damping Lerp
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Slow luxury showroom auto-rotation when user is not dragging
      if (autoRotate && !isPointerDownRef.current) {
        targetRotationYRef.current += 0.0035;
      }

      // Smooth Lerp Damping
      currentRotationYRef.current +=
        (targetRotationYRef.current - currentRotationYRef.current) * 0.09;

      if (rootCarGroupRef.current) {
        rootCarGroupRef.current.rotation.y = currentRotationYRef.current;
      }

      // Update HUD degree counter
      const deg = Math.round(
        (((currentRotationYRef.current % (Math.PI * 2)) + Math.PI * 2) %
          (Math.PI * 2)) *
          (180 / Math.PI)
      );
      setRotationDegrees(deg);

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // 8. Resize Observer & Lifecycle Management
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameIdRef.current);

      // Clean WebGL resources
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [activeColor.threeColor, autoRotate]);

  // Pointer Interaction Handlers for 360° Drag
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = true;
    setIsDragging(true);
    setAutoRotate(false);
    pointerStartXRef.current = e.clientX;
    pointerStartRotationRef.current = targetRotationYRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - pointerStartXRef.current;
    // 0.0075 radians per pixel for natural automotive turntable feel
    targetRotationYRef.current = pointerStartRotationRef.current + deltaX * 0.0075;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] bg-[#F5F6F8] overflow-hidden select-none border-b border-[#E5E7EB]">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } touch-none`}
        title="Drag horizontally to inspect vehicle in 360°"
      />

      {/* Top-Left Clean Architectural HUD */}
      <div className="absolute top-5 left-5 pointer-events-none z-10 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#E5E7EB] text-[10px] font-black uppercase tracking-widest text-[#111827]">
          <span className="w-1.5 h-1.5 bg-[#E31837]" />
          <span>MARUTI SUZUKI ARENA • 3D STUDIO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111827] uppercase">
          {modelName}
        </h1>
        <p className="text-[11px] font-semibold tracking-wider text-[#4B5563] uppercase">
          {variantName}
        </p>

        <div className="pt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#6B7280] bg-white/90 px-2 py-0.5 border border-[#E5E7EB]">
            <Compass className="h-3 w-3 text-[#E31837]" />
            <span>AZIMUTH {rotationDegrees}°</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 border border-emerald-200">
            <Sun className="h-3 w-3 text-[#059669]" />
            <span>HIGH-KEY DAYLIGHT</span>
          </div>
          {startingPrice && (
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-[#111827] bg-white/90 px-2 py-0.5 border border-[#E5E7EB]">
              <span>FROM {startingPrice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Top-Right Quick Interaction Actions */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all ${
            autoRotate
              ? "bg-[#111827] text-white border-[#111827]"
              : "bg-white text-[#374151] border-[#E5E7EB] hover:bg-[#F9FAFB]"
          }`}
          title="Toggle Turntable Auto-Rotation"
        >
          <Rotate3d className="h-3.5 w-3.5 text-[#E31837]" />
          <span className="hidden sm:inline">
            {autoRotate ? "Turntable Active" : "Turntable Paused"}
          </span>
        </button>

        <button
          onClick={resetCamera}
          className="p-1.5 bg-white text-[#374151] border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors"
          title="Reset Viewpoint"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Floating Light-Themed Color Swatch Palette (Bottom Center) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[92%] sm:w-auto">
        <div className="bg-white border border-[#E5E7EB] p-3 shadow-sm flex flex-col sm:flex-row items-center gap-3">
          {/* Active shade meta */}
          <div className="text-center sm:text-left pr-0 sm:pr-3 sm:border-r border-[#E5E7EB] min-w-[140px]">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#9CA3AF] block">
              SELECTED COLOR
            </span>
            <span className="text-xs font-black uppercase text-[#111827] block">
              {activeColor.name}
            </span>
            <span className="text-[10px] text-[#6B7280] block">
              {activeColor.badge}
            </span>
          </div>

          {/* Swatch Pills */}
          <div className="flex items-center gap-2">
            {GRAND_VITARA_COLORS.map((swatch) => {
              const isSelected = activeColor.id === swatch.id;
              return (
                <button
                  key={swatch.id}
                  onClick={() => handleColorSelect(swatch)}
                  className={`group relative flex flex-col items-center justify-center p-1 transition-all ${
                    isSelected
                      ? "ring-2 ring-[#E31837] ring-offset-2 ring-offset-white"
                      : "hover:scale-105"
                  }`}
                  title={`${swatch.name} (${swatch.badge})`}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 border border-[#D1D5DB] shadow-inner"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  {isSelected && (
                    <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#E31837]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle Drag Hint Overlay (Disappears on Drag) */}
      <div className="absolute bottom-5 right-5 pointer-events-none hidden lg:flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase bg-white/80 px-2.5 py-1 border border-[#E5E7EB]">
        <Rotate3d className="h-3.5 w-3.5 text-[#E31837]" />
        <span>360° INTERACTIVE TURNTABLE</span>
      </div>
    </div>
  );
}
