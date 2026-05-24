"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

export default function GlobeWrapper() {
  return <Globe />;
}
