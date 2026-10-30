import React from 'react';
import { PipeCard } from './PipeCard';
import { HouseCard } from './HouseCard';
import { LegendPanel } from './LegendPanel';
import { CADUploader } from './CADUploader';
import { SolarPanel } from './SolarPanel';
import { CADUploadModal } from './CADUploadModal';
import { useStore } from '../../store';

export const Sidebar: React.FC = () => {
  const { setCADGuideOpen } = useStore();

  return (
    <>
      <aside className="w-[300px] h-[calc(100vh-48px)] bg-[#f8f8f8] border-r border-black p-3 overflow-y-auto select-none shrink-0 z-20">
        {/* 01: Underground Pipe Builder */}
        <div className="mb-4">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-black pb-1.5 border-b border-black mb-2 flex items-center justify-between">
            <span>01 // PIPE ROUTING (BIM)</span>
            <span className="text-[10px] text-[#666666]">SOLID 3D</span>
          </div>
          <PipeCard
            type="water"
            name="Water Main"
            agency="BWSSB"
            color="#00aaff"
            diameter={0.6}
            depth={2.5}
          />
          <PipeCard
            type="gas"
            name="City Gas"
            agency="GAIL"
            color="#ff8800"
            diameter={0.4}
            depth={1.8}
          />
          <PipeCard
            type="fiber"
            name="Fiber Trunk"
            agency="Telecom"
            color="#ff00aa"
            diameter={0.2}
            depth={1.0}
          />
          <PipeCard
            type="power"
            name="Power Cable"
            agency="BESCOM 11kV"
            color="#ff3300"
            diameter={0.35}
            depth={1.4}
          />
        </div>

        {/* 02: House Placement with Multi-Model Catalog */}
        <div className="mb-4">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-black pb-1.5 border-b border-black mb-2 flex items-center justify-between">
            <span>02 // HOUSE PLACEMENT</span>
            <span className="text-[10px] text-[#666666]">CATALOG</span>
          </div>

          <div className="mb-2 flex items-center justify-between bg-[#fff9e6] border border-[#e5a914] p-1.5 font-mono text-[10px] text-[#6b4700]">
            <span>HAVE A CAD MODEL?</span>
            <button
              onClick={() => setCADGuideOpen(true)}
              className="bg-black text-white px-2 py-0.5 font-bold uppercase hover:bg-[#333] cursor-pointer"
            >
              + Upload Model
            </button>
          </div>

          <HouseCard
            category="20x30"
            dimensions="20×30"
            sqft={600}
            floors="G+1"
            defaultDescription="Duplex / Sloped / Stilt / Modern"
          />

          <HouseCard
            category="30x40"
            dimensions="30×40"
            sqft={1200}
            floors="G+2"
            defaultDescription="Duplex / Courtyard / Flats"
          />

          <HouseCard
            category="40x60"
            dimensions="40×60"
            sqft={2400}
            floors="G+3"
            defaultDescription="Luxury Estate / Commercial"
          />
        </div>

        {/* 03: GIS Legend */}
        <LegendPanel />

        {/* 04: CAD Uploader & Zoning */}
        <CADUploader />

        {/* 05: Sun & Solar Analysis */}
        <SolarPanel />
      </aside>

      {/* CAD Import & How-To Modal */}
      <CADUploadModal />
    </>
  );
};
