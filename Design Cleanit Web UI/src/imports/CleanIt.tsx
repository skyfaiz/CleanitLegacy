import svgPaths from "./svg-zx3e8hjffb";
import imgImageWithFallback from "figma:asset/042e4b73ef0e1422ca8706c1e956dc9e8f48e6f0.png";
import imgImageWithFallback1 from "figma:asset/e40c9e3c240a7cf1e964ec4cafa9d7ea2521a3c4.png";
import imgImageWithFallback2 from "figma:asset/7e9ee744081dd8e41cfcb0242fe793a149ec5669.png";
import imgImageWithFallback3 from "figma:asset/80a0874973f608ea750f16d93332d2dfb0fb1849.png";

function ImageWithFallback() {
  return (
    <div className="absolute h-[424px] left-0 opacity-30 top-0 w-[1143px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[896px]" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[448.13px] not-italic text-[36px] text-center text-white top-[-0.5px] tracking-[-0.3125px]">Turning Cleanups Into Community Wins</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[48px] left-[112px] top-[48px] w-[672px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[336.27px] not-italic text-[16px] text-center text-white top-[-0.5px] tracking-[-0.3125px] w-[614px] whitespace-pre-wrap">{`Gamifying India's cleanup movement through incentives and community impact. Join thousands of eco-warriors making a real difference, one cleanup at a time.`}</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#09c] h-[40px] relative rounded-[8px] shrink-0 w-[154.719px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[24px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.1504px]">Join the Mission</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-[152.055px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#22c55e] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[25px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#22c55e] text-[14px] tracking-[-0.1504px]">Start a Cleanup</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[40px] items-start justify-center left-0 pr-[0.008px] top-[128px] w-[896px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[168px] left-[123.5px] top-[128px] w-[896px]" data-name="Container">
      <Heading />
      <Paragraph />
      <Container1 />
    </div>
  );
}

function MissionHero() {
  return (
    <div className="bg-gradient-to-b from-[#09c] h-[424px] overflow-clip relative shrink-0 to-[#22c55e] w-[1143px]" data-name="MissionHero">
      <ImageWithFallback />
      <Container />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p164fdc00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p211a4cc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16777200px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[44.33px] not-italic text-[#1f2937] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">2M+</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[45px] not-italic text-[#1f2937] text-[14px] text-center top-[0.5px] tracking-[-0.1504px]">Kgs Collected</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[89.445px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[140px] items-center left-[310.77px] top-[64px] w-[89.445px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1a96b600} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p2b2a7400} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p25449c80} id="Vector_3" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p1517b200} id="Vector_4" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16777200px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[34.99px] not-italic text-[#1f2937] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">2,500+</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[34px] not-italic text-[#1f2937] text-[14px] text-center top-[0.5px] tracking-[-0.1504px]">Volunteers</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48px] relative shrink-0 w-[68.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[140px] items-center left-[464.22px] top-[64px] w-[80px]" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p19a01780} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p15663e00} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p3911f600} id="Vector_3" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16777200px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[31.05px] not-italic text-[#1f2937] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">8,161+</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[30.5px] not-italic text-[#1f2937] text-[14px] text-center top-[0.5px] tracking-[-0.1504px]">Cleanups</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48px] relative shrink-0 w-[60.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[140px] items-center left-[608.22px] top-[64px] w-[80px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p9d4580} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p17aff600} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16777200px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[39.46px] not-italic text-[#1f2937] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">79.1%</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[39px] not-italic text-[#1f2937] text-[14px] text-center top-[0.5px] tracking-[-0.1504px]">Impact Rate</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[48px] relative shrink-0 w-[77.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Paragraph7 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[140px] items-center left-[752.22px] top-[64px] w-[80px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function StatsSection() {
  return (
    <div className="bg-white h-[229px] relative shrink-0 w-[1143px]" data-name="StatsSection">
      <Container2 />
      <Container5 />
      <Container8 />
      <Container11 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[992px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[496.05px] not-italic text-[#1f2937] text-[24px] text-center top-[-0.5px] tracking-[-0.3125px]">Running Campaigns</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[24px] left-[160px] top-[40px] w-[672px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[336.09px] not-italic text-[#1f2937] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">Join active cleanup missions across India. Every contribution makes a difference.</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph9 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[166.523px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Marina Beach, Chennai</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon4 />
        <Heading2 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[125px] whitespace-pre-wrap">Collected: ₹45,000</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[91.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[92px] whitespace-pre-wrap">Goal: ₹75,000</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container19() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-176.8px] pr-[176.8px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container18 />
        <PrimitiveDiv />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_777)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_777">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">5 days left</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon5 />
        <Text2 />
      </div>
    </div>
  );
}

function CampaignCard() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[144px] items-start left-px pl-[20px] py-[20px] top-[217px] w-[482px]" data-name="CampaignCard">
      <Container16 />
      <Container17 />
      <Container20 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[482px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.1504px]">Active</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#09c] content-stretch flex flex-col h-[32px] items-start left-[406.05px] pt-[8.5px] px-[12px] rounded-[16777200px] top-[12px] w-[63.953px]" data-name="Container">
      <Text3 />
    </div>
  );
}

function CampaignCard1() {
  return (
    <div className="absolute h-[192px] left-px overflow-clip top-px w-[482px]" data-name="CampaignCard">
      <ImageWithFallback1 />
      <Container21 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#f9e08c] col-[1] justify-self-stretch relative rounded-[14px] row-[1] self-stretch shrink-0" data-name="Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <CampaignCard />
        <CampaignCard1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[151.523px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Juhu Beach, Mumbai</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon6 />
        <Heading3 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[125px] whitespace-pre-wrap">Collected: ₹62,000</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[92.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[93px] whitespace-pre-wrap">Goal: ₹80,000</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container25() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv1() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-99.45px] pr-[99.45px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container25 />
    </div>
  );
}

function Container23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container24 />
        <PrimitiveDiv1 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_777)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_777">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">3 days left</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon7 />
        <Text6 />
      </div>
    </div>
  );
}

function CampaignCard2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[144px] items-start left-px pl-[20px] py-[20px] top-[217px] w-[482px]" data-name="CampaignCard">
      <Container22 />
      <Container23 />
      <Container26 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[482px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.1504px]">Active</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-[#09c] content-stretch flex flex-col h-[32px] items-start left-[406.05px] pt-[8.5px] px-[12px] rounded-[16777200px] top-[12px] w-[63.953px]" data-name="Container">
      <Text7 />
    </div>
  );
}

function CampaignCard3() {
  return (
    <div className="absolute h-[192px] left-px overflow-clip top-px w-[482px]" data-name="CampaignCard">
      <ImageWithFallback2 />
      <Container27 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-[#f9e08c] col-[2] justify-self-stretch relative rounded-[14px] row-[1] self-stretch shrink-0" data-name="Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <CampaignCard2 />
        <CampaignCard3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[142.461px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Yamuna River, Delhi</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon8 />
        <Heading4 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[124.445px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[125px] whitespace-pre-wrap">Collected: ₹38,000</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[98.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[99px] whitespace-pre-wrap">Goal: ₹100,000</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container31() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv2() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-274.04px] pr-[274.04px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container31 />
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Container30 />
        <PrimitiveDiv2 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_777)" id="Icon">
          <path d="M8 4V8L10.6667 9.33333" id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39ee6532} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_777">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">12 days left</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[20px] relative shrink-0 w-[442px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon9 />
        <Text10 />
      </div>
    </div>
  );
}

function CampaignCard4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[144px] items-start left-px pl-[20px] py-[20px] top-[217px] w-[482px]" data-name="CampaignCard">
      <Container28 />
      <Container29 />
      <Container32 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[482px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.1504px]">Active</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#09c] content-stretch flex flex-col h-[32px] items-start left-[406.05px] pt-[8.5px] px-[12px] rounded-[16777200px] top-[12px] w-[63.953px]" data-name="Container">
      <Text11 />
    </div>
  );
}

function CampaignCard5() {
  return (
    <div className="absolute h-[192px] left-px overflow-clip top-px w-[482px]" data-name="CampaignCard">
      <ImageWithFallback3 />
      <Container33 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-[#f9e08c] col-[1] justify-self-stretch relative rounded-[14px] row-[2] self-stretch shrink-0" data-name="Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <CampaignCard4 />
        <CampaignCard5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[5.5px] not-italic text-[#09c] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">+</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[rgba(0,153,204,0.1)] content-stretch flex items-center justify-center left-[73.21px] rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Text12 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[104px] w-[162.422px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[81.5px] not-italic text-[#09c] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">Create New Campaign</p>
    </div>
  );
}

function CampaignCard6() {
  return (
    <div className="h-[152px] relative shrink-0 w-[210.422px]" data-name="CampaignCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container34 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-[rgba(249,224,140,0.2)] col-[2] justify-self-stretch relative rounded-[14px] row-[2] self-stretch shrink-0" data-name="Card">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <CampaignCard6 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#09c] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(2,_minmax(0,_1fr))] h-[748px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function RunningCampaigns() {
  return (
    <div className="bg-white h-[1020px] relative shrink-0 w-full" data-name="RunningCampaigns">
      <div className="content-stretch flex flex-col gap-[48px] items-start pt-[80px] px-[75.5px] relative size-full">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="absolute h-[400px] left-0 top-0 w-[992px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container36() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.7)] h-[400px] left-0 to-[rgba(0,0,0,0)] top-0 w-[992px]" data-name="Container" />;
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p26ddc800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[208.102px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Juhu Beach Cleanup Mission</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Heading5 />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#22c55e] h-[22px] left-0 rounded-[8px] top-0 w-[115.406px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white">Active Campaign</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[8px] size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p38fdee00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p24e2e2b0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p71c6d40} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13058e80} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] border border-solid border-white h-[22px] left-[131.41px] overflow-clip rounded-[8px] top-0 w-[118.398px]" data-name="Badge">
      <Icon11 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[28px] not-italic text-[12px] text-white top-[3px]">24 Volunteers</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Badge />
      <Badge1 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[118.164px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-white top-[0.5px] tracking-[-0.1504px]">₹62,000 collected</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[86.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-white top-[0.5px] tracking-[-0.1504px]">₹80,000 goal</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container42() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv3() {
  return (
    <div className="bg-[rgba(255,255,255,0.3)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-208.8px] pr-[208.8px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container42 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <PrimitiveDiv3 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[174px] items-start left-0 pt-[32px] px-[32px] top-[226px] w-[992px]" data-name="Container">
      <Container38 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[400px] overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback4 />
      <Container36 />
      <Container37 />
    </div>
  );
}

function CampaignDetail1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[603.328px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Mission Overview</p>
      </div>
    </div>
  );
}

function CampaignDetail2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[603.328px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[598px] whitespace-pre-wrap">{`Juhu Beach is one of Mumbai's most iconic beaches, attracting thousands of visitors daily. Unfortunately, it has become heavily polluted with plastic waste, food wrappers, and other debris. This cleanup mission aims to restore the beach's natural beauty and raise awareness about marine pollution.`}</p>
      </div>
    </div>
  );
}

function CampaignDetail3() {
  return (
    <div className="h-[72px] relative shrink-0 w-[603.328px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[591px] whitespace-pre-wrap">Join us for a comprehensive cleanup drive that includes waste segregation, recycling initiatives, and educational workshops for beachgoers. Together, we can make Juhu Beach a model for coastal conservation.</p>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white h-[322px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[40px] items-start pl-[25px] pr-px py-[25px] relative size-full">
        <CampaignDetail1 />
        <CampaignDetail2 />
        <CampaignDetail3 />
      </div>
    </div>
  );
}

function CampaignDetail4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[603.328px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Fund Allocation</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[120.68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">{`Equipment & Tools`}</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.555px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[97px] whitespace-pre-wrap">₹21,000 (35%)</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Container47() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv4() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-392.163px] pr-[392.163px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container47 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <PrimitiveDiv4 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[94.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Transportation</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[97px] whitespace-pre-wrap">₹15,000 (25%)</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text17 />
      <Text18 />
    </div>
  );
}

function Container50() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv5() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-452.496px] pr-[452.496px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container50 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <PrimitiveDiv5 />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[89.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Refreshments</p>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[88.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[89px] whitespace-pre-wrap">₹9,000 (15%)</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text19 />
      <Text20 />
    </div>
  );
}

function Container53() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv6() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-512.829px] pr-[512.829px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container53 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <PrimitiveDiv6 />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[99.039px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Waste Disposal</p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[97px] whitespace-pre-wrap">₹12,000 (20%)</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text21 />
      <Text22 />
    </div>
  );
}

function Container56() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv7() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-482.663px] pr-[482.663px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container56 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <PrimitiveDiv7 />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Contingency</p>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[82px] whitespace-pre-wrap">₹3,000 (5%)</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text23 />
      <Text24 />
    </div>
  );
}

function Container59() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv8() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-573.162px] pr-[573.162px] relative rounded-[16777200px] shrink-0 w-full" data-name="Primitive.div">
      <Container59 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <PrimitiveDiv8 />
    </div>
  );
}

function CampaignDetail5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[603.328px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container45 />
        <Container48 />
        <Container51 />
        <Container54 />
        <Container57 />
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white h-[366px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[48px] items-start pl-[25px] pr-px py-[25px] relative size-full">
        <CampaignDetail4 />
        <CampaignDetail5 />
      </div>
    </div>
  );
}

function CampaignDetail6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[603.328px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Top Contributors</p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[24px] left-[52px] top-[8px] w-[54.359px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Priya S.</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="bg-[#09c] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.3125px]">PS</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[40px] top-0" data-name="Primitive.span">
      <Text26 />
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[40px] relative shrink-0 w-[106.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text25 />
        <PrimitiveSpan />
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#22c55e] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[52px] whitespace-pre-wrap">₹5,000</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container61 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute h-[24px] left-[52px] top-[8px] w-[59.367px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Rahul K.</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="bg-[#09c] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.3125px]">RK</p>
      </div>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[40px] top-0" data-name="Primitive.span">
      <Text29 />
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[40px] relative shrink-0 w-[111.367px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text28 />
        <PrimitiveSpan1 />
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.977px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#22c55e] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[52px] whitespace-pre-wrap">₹3,500</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container63 />
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute h-[24px] left-[52px] top-[8px] w-[75.594px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Ananya M.</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="bg-[#09c] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.3125px]">AM</p>
      </div>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[40px] top-0" data-name="Primitive.span">
      <Text32 />
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[40px] relative shrink-0 w-[127.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text31 />
        <PrimitiveSpan2 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#22c55e] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[52px] whitespace-pre-wrap">₹2,000</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute h-[24px] left-[52px] top-[8px] w-[67.305px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Vikram P.</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="bg-[#09c] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.3125px]">VP</p>
      </div>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[40px] top-0" data-name="Primitive.span">
      <Text35 />
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[40px] relative shrink-0 w-[119.305px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text34 />
        <PrimitiveSpan3 />
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[24px] relative shrink-0 w-[49.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#22c55e] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[50px] whitespace-pre-wrap">₹1,500</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Text36 />
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute h-[24px] left-[52px] top-[8px] w-[64.117px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Sneha R.</p>
    </div>
  );
}

function Text38() {
  return (
    <div className="bg-[#09c] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.3125px]">SR</p>
      </div>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[40px] top-0" data-name="Primitive.span">
      <Text38 />
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[40px] relative shrink-0 w-[116.117px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text37 />
        <PrimitiveSpan4 />
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[24px] relative shrink-0 w-[49.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#22c55e] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[50px] whitespace-pre-wrap">₹1,000</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Text39 />
    </div>
  );
}

function CampaignDetail7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[603.328px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container60 />
        <Container62 />
        <Container64 />
        <Container66 />
        <Container68 />
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white h-[370px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[28px] items-start pl-[25px] pr-px py-[25px] relative size-full">
        <CampaignDetail6 />
        <CampaignDetail7 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1122px] items-start left-0 top-0 w-[653.328px]" data-name="Container">
      <Card4 />
      <Card5 />
      <Card6 />
    </div>
  );
}

function CampaignDetail8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Campaign Organizer</p>
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Rohan Shah</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-full" data-name="Badge">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[#0a0a0a] text-[12px] top-[4px]">Verified Organizer</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[50px] items-start left-[60px] top-0 w-[122.602px]" data-name="Container">
      <Paragraph11 />
      <Badge2 />
    </div>
  );
}

function Text40() {
  return (
    <div className="bg-[#22c55e] flex-[1_0_0] h-[48px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.3125px]">RS</p>
      </div>
    </div>
  );
}

function PrimitiveSpan5() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[48px] top-0" data-name="Primitive.span">
      <Text40 />
    </div>
  );
}

function CampaignDetail9() {
  return (
    <div className="h-[50px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container71 />
        <PrimitiveSpan5 />
      </div>
    </div>
  );
}

function CampaignDetail10() {
  return (
    <div className="h-[60px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[250px] whitespace-pre-wrap">Environmental activist with 5+ years of experience organizing beach cleanups across Maharashtra.</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_715)" id="Icon">
          <path d={svgPaths.p26187580} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_715">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon12 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[#0a0a0a] text-[14px] top-[6.5px] tracking-[-0.1504px]">Contact</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2f8e7e80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17070980} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon13 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[#0a0a0a] text-[14px] top-[6.5px] tracking-[-0.1504px]">Email</p>
    </div>
  );
}

function CampaignDetail11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Card7() {
  return (
    <div className="bg-white h-[376px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[40px] items-start pl-[25px] pr-px py-[25px] relative size-full">
        <CampaignDetail8 />
        <CampaignDetail9 />
        <CampaignDetail10 />
        <CampaignDetail11 />
      </div>
    </div>
  );
}

function CampaignDetail12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Lead Cleaner</p>
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[167.289px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Mumbai Cleaning Crew</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[22px] left-0 overflow-clip rounded-[8px] top-[28px] w-[123.406px]" data-name="Badge">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[8px] not-italic text-[#0a0a0a] text-[12px] top-[3px]">Professional Team</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute h-[50px] left-[60px] top-0 w-[167.289px]" data-name="Container">
      <Paragraph12 />
      <Badge3 />
    </div>
  );
}

function Text41() {
  return (
    <div className="bg-[#09c] flex-[1_0_0] h-[48px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.3125px]">MP</p>
      </div>
    </div>
  );
}

function PrimitiveSpan6() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[48px] top-0" data-name="Primitive.span">
      <Text41 />
    </div>
  );
}

function CampaignDetail13() {
  return (
    <div className="h-[50px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container72 />
        <PrimitiveSpan6 />
      </div>
    </div>
  );
}

function CampaignDetail14() {
  return (
    <div className="h-[60px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[246px] whitespace-pre-wrap">Certified waste management professionals with expertise in coastal cleanup operations.</p>
      </div>
    </div>
  );
}

function Card8() {
  return (
    <div className="bg-white h-[280px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[40px] items-start pb-px pl-[25px] pr-px pt-[25px] relative size-full">
        <CampaignDetail12 />
        <CampaignDetail13 />
        <CampaignDetail14 />
      </div>
    </div>
  );
}

function CampaignDetail15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Support This Mission</p>
      </div>
    </div>
  );
}

function CampaignDetail16() {
  return (
    <div className="h-[40px] relative shrink-0 w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.9)] top-[0.5px] tracking-[-0.1504px] w-[231px] whitespace-pre-wrap">Help us reach our goal and make an impact</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[72.97px] not-italic text-[#09c] text-[14px] top-[8.5px] tracking-[-0.1504px]">Fund This Mission</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[69.91px] not-italic text-[#09c] text-[14px] top-[8.5px] tracking-[-0.1504px]">Join Cleanup Team</p>
    </div>
  );
}

function CampaignDetail17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[264.664px]" data-name="CampaignDetail">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Card9() {
  return (
    <div className="bg-gradient-to-b from-[#09c] h-[266px] relative rounded-[14px] shrink-0 to-[#22c55e] w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start pl-[25px] pr-px py-[25px] relative size-full">
        <CampaignDetail15 />
        <CampaignDetail16 />
        <CampaignDetail17 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1122px] items-start left-[677.33px] top-0 w-[314.664px]" data-name="Container">
      <Card7 />
      <Card8 />
      <Card9 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[1122px] relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Container70 />
    </div>
  );
}

function CampaignDetail() {
  return (
    <div className="bg-[#f5f5f5] h-[1714px] relative shrink-0 w-full" data-name="CampaignDetail">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[80px] px-[75.5px] relative size-full">
        <Container35 />
        <Container43 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[992px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[495.53px] not-italic text-[#1f2937] text-[24px] text-center top-[-0.5px] tracking-[-0.3125px]">Community Champions</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[24px] left-[160px] top-[40px] w-[672px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[335.52px] not-italic text-[#1f2937] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px]">Meet the eco-warriors making India cleaner, one mission at a time.</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Paragraph13 />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-white content-stretch flex h-[29px] items-center justify-center left-[3px] px-[9px] py-[5px] rounded-[14px] top-[3.5px] w-[147.328px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">Cleaners</p>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="absolute content-stretch flex h-[29px] items-center justify-center left-[150.33px] px-[9px] py-[5px] rounded-[14px] top-[3.5px] w-[147.336px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">Contributors</p>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute content-stretch flex h-[29px] items-center justify-center left-[297.66px] px-[9px] py-[5px] rounded-[14px] top-[3.5px] w-[147.328px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">Bounty Posters</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="absolute bg-[#ececf0] h-[36px] left-[272px] rounded-[14px] top-0 w-[448px]" data-name="Tab List">
      <PrimitiveButton />
      <PrimitiveButton1 />
      <PrimitiveButton2 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[88.695px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Arjun Verma</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2_751)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2_751">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[217.992px]" data-name="Container">
      <Heading7 />
      <Icon14 />
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-0 w-[70.445px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px]">Eco Hero</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[30px] w-[155.945px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px]">Neighborhood Guardian</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute h-[52px] left-0 top-[28px] w-[217.992px]" data-name="Container">
      <Badge4 />
      <Badge5 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p185fb780} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p30ca5e80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pac25b80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.72666 9.00667L10.28 11.66" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c1fff00} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-0 rounded-[8px] top-[92px] w-[86.219px]" data-name="Button">
      <Icon15 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[36px] not-italic text-[#0a0a0a] text-[14px] top-[5.5px] tracking-[-0.1504px]">Share</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute h-[124px] left-[96px] top-0 w-[217.992px]" data-name="Container">
      <Container76 />
      <Container77 />
      <Button6 />
    </div>
  );
}

function Text42() {
  return (
    <div className="bg-[#22c55e] flex-[1_0_0] h-[80px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.4492px]">AV</p>
      </div>
    </div>
  );
}

function PrimitiveSpan7() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[80px] top-0" data-name="Primitive.span">
      <Text42 />
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[234px] relative shrink-0 w-[313.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container75 />
        <PrimitiveSpan7 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3c6311f0} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3d728000} id="Vector_3" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container80() {
  return (
    <div className="bg-[rgba(34,197,94,0.13)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Cleanups</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#22c55e] text-[16px] top-[-0.5px] tracking-[-0.3125px]">47</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[44px] relative shrink-0 w-[60.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function StatsCard() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[156.664px]" data-name="StatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container80 />
        <Container81 />
      </div>
    </div>
  );
}

function Card11() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[82px] items-start left-0 pl-[17px] pr-px py-[17px] rounded-[14px] top-0 w-[190.664px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <StatsCard />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p29361940} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p33e06580} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p203c5100} id="Vector_3" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M4 22H20" id="Vector_4" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p30c79280} id="Vector_5" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3f521e00} id="Vector_6" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container82() {
  return (
    <div className="bg-[rgba(0,153,204,0.13)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Funds Raised</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#09c] text-[16px] top-[-0.5px] tracking-[-0.3125px]">₹125K</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[44px] relative shrink-0 w-[86.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function StatsCard1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[156.672px]" data-name="StatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container82 />
        <Container83 />
      </div>
    </div>
  );
}

function Card12() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[82px] items-start left-[206.66px] pl-[17px] pr-px py-[17px] rounded-[14px] top-0 w-[190.672px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <StatsCard1 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_718)" id="Icon">
          <path d={svgPaths.p3eebfc00} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M20 2V6" id="Vector_2" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4H18" id="Vector_3" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p352890c0} id="Vector_4" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_2_718">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container84() {
  return (
    <div className="bg-[rgba(245,158,11,0.13)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Impact Points</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#f59e0b] text-[16px] top-[-0.5px] tracking-[-0.3125px]">4700</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[44px] relative shrink-0 w-[88.102px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function StatsCard2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[156.664px]" data-name="StatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container84 />
        <Container85 />
      </div>
    </div>
  );
}

function Card13() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[82px] items-start left-[413.34px] pl-[17px] pr-px py-[17px] rounded-[14px] top-0 w-[190.664px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <StatsCard2 />
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[82px] relative shrink-0 w-full" data-name="Container">
      <Card11 />
      <Card12 />
      <Card13 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Recent Activity</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text43() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Bandra Park</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon19 />
        <Text43 />
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[16px] relative shrink-0 w-[32.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-px">45 kg</p>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">Oct 20, 2025</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[16px] relative shrink-0 w-[118.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start relative size-full">
        <Text44 />
        <Text45 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="bg-[#f5f5f5] h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container89 />
          <Container90 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text46() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Worli Beach</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[20px] relative shrink-0 w-[100.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon20 />
        <Text46 />
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[16px] relative shrink-0 w-[32.102px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-px">38 kg</p>
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">Oct 15, 2025</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[16px] relative shrink-0 w-[116.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start relative size-full">
        <Text47 />
        <Text48 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="bg-[#f5f5f5] h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container92 />
          <Container93 />
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-start relative shrink-0 w-full" data-name="Container">
      <Container88 />
      <Container91 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[128px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Container87 />
    </div>
  );
}

function Container78() {
  return (
    <div className="flex-[1_0_0] h-[234px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container79 />
        <Container86 />
      </div>
    </div>
  );
}

function UserProfile1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[942px]" data-name="UserProfile">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container74 />
        <Container78 />
      </div>
    </div>
  );
}

function Card10() {
  return (
    <div className="bg-white h-[284px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start pl-[25px] pr-px py-[25px] relative size-full">
        <UserProfile1 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[85.813px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Meera Patel</p>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2_751)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2_751">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[217.992px]" data-name="Container">
      <Heading9 />
      <Icon21 />
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-0 w-[80.539px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px]">Rising Star</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute h-[22px] left-[88.54px] rounded-[8px] top-0 w-[99.828px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px]">Beach Warrior</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute h-[22px] left-0 top-[28px] w-[217.992px]" data-name="Container">
      <Badge6 />
      <Badge7 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p185fb780} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p30ca5e80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pac25b80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.72666 9.00667L10.28 11.66" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c1fff00} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white border border-[rgba(0,0,0,0.1)] border-solid h-[32px] left-0 rounded-[8px] top-[62px] w-[86.219px]" data-name="Button">
      <Icon22 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[36px] not-italic text-[#0a0a0a] text-[14px] top-[5.5px] tracking-[-0.1504px]">Share</p>
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute h-[94px] left-[96px] top-0 w-[217.992px]" data-name="Container">
      <Container96 />
      <Container97 />
      <Button7 />
    </div>
  );
}

function Text49() {
  return (
    <div className="bg-[#22c55e] flex-[1_0_0] h-[80px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.4492px]">MP</p>
      </div>
    </div>
  );
}

function PrimitiveSpan8() {
  return (
    <div className="absolute content-stretch flex items-start left-0 overflow-clip rounded-[16777200px] size-[80px] top-0" data-name="Primitive.span">
      <Text49 />
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[234px] relative shrink-0 w-[313.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container95 />
        <PrimitiveSpan8 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3c6311f0} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3d728000} id="Vector_3" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container100() {
  return (
    <div className="bg-[rgba(34,197,94,0.13)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Cleanups</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#22c55e] text-[16px] top-[-0.5px] tracking-[-0.3125px]">32</p>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[44px] relative shrink-0 w-[60.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function StatsCard3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[156.664px]" data-name="StatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container100 />
        <Container101 />
      </div>
    </div>
  );
}

function Card15() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[82px] items-start left-0 pl-[17px] pr-px py-[17px] rounded-[14px] top-0 w-[190.664px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <StatsCard3 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p29361940} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p33e06580} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p203c5100} id="Vector_3" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M4 22H20" id="Vector_4" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p30c79280} id="Vector_5" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3f521e00} id="Vector_6" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container102() {
  return (
    <div className="bg-[rgba(0,153,204,0.13)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Funds Raised</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#09c] text-[16px] top-[-0.5px] tracking-[-0.3125px]">₹89K</p>
    </div>
  );
}

function Container103() {
  return (
    <div className="h-[44px] relative shrink-0 w-[86.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph22 />
        <Paragraph23 />
      </div>
    </div>
  );
}

function StatsCard4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[156.672px]" data-name="StatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container102 />
        <Container103 />
      </div>
    </div>
  );
}

function Card16() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[82px] items-start left-[206.66px] pl-[17px] pr-px py-[17px] rounded-[14px] top-0 w-[190.672px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <StatsCard4 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_718)" id="Icon">
          <path d={svgPaths.p3eebfc00} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M20 2V6" id="Vector_2" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4H18" id="Vector_3" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p352890c0} id="Vector_4" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_2_718">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container104() {
  return (
    <div className="bg-[rgba(245,158,11,0.13)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Impact Points</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#f59e0b] text-[16px] top-[-0.5px] tracking-[-0.3125px]">3200</p>
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[44px] relative shrink-0 w-[88.102px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph24 />
        <Paragraph25 />
      </div>
    </div>
  );
}

function StatsCard5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[156.664px]" data-name="StatsCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container104 />
        <Container105 />
      </div>
    </div>
  );
}

function Card17() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[82px] items-start left-[413.34px] pl-[17px] pr-px py-[17px] rounded-[14px] top-0 w-[190.664px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <StatsCard5 />
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[82px] relative shrink-0 w-full" data-name="Container">
      <Card15 />
      <Card16 />
      <Card17 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Recent Activity</p>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text50() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Powai Lake</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon26 />
        <Text50 />
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[16px] relative shrink-0 w-[31.57px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-px">52 kg</p>
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">Oct 22, 2025</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[16px] relative shrink-0 w-[118.102px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start relative size-full">
        <Text51 />
        <Text52 />
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="bg-[#f5f5f5] h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container109 />
          <Container110 />
        </div>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #0099CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text53() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-[0.5px] tracking-[-0.1504px]">Sanjay Gandhi Park</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[20px] relative shrink-0 w-[148.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon27 />
        <Text53 />
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[16px] relative shrink-0 w-[30.086px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-px">41 kg</p>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#99a1af] text-[12px] top-px">Oct 18, 2025</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[16px] relative shrink-0 w-[115.133px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start relative size-full">
        <Text54 />
        <Text55 />
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="bg-[#f5f5f5] h-[44px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container112 />
          <Container113 />
        </div>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-start relative shrink-0 w-full" data-name="Container">
      <Container108 />
      <Container111 />
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[128px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading10 />
      <Container107 />
    </div>
  );
}

function Container98() {
  return (
    <div className="flex-[1_0_0] h-[234px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container99 />
        <Container106 />
      </div>
    </div>
  );
}

function UserProfile2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[942px]" data-name="UserProfile">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <Container94 />
        <Container98 />
      </div>
    </div>
  );
}

function Card14() {
  return (
    <div className="bg-white h-[284px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start pl-[25px] pr-px py-[25px] relative size-full">
        <UserProfile2 />
      </div>
    </div>
  );
}

function TabPanel() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[592px] items-start left-0 top-[76px] w-[992px]" data-name="Tab Panel">
      <Card10 />
      <Card14 />
    </div>
  );
}

function PrimitiveDiv9() {
  return (
    <div className="h-[668px] relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

function UserProfile() {
  return (
    <div className="bg-white h-[940px] relative shrink-0 w-full" data-name="UserProfile">
      <div className="content-stretch flex flex-col gap-[48px] items-start pt-[80px] px-[75.5px] relative size-full">
        <Container73 />
        <PrimitiveDiv9 />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col h-[4346px] items-start relative shrink-0 w-full" data-name="Main Content">
      <MissionHero />
      <StatsSection />
      <RunningCampaigns />
      <CampaignDetail />
      <UserProfile />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[384.75px] not-italic text-[#1f2937] text-[24px] text-center top-[-0.5px] tracking-[-0.3125px]">Our Journey</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[384.41px] not-italic text-[#1f2937] text-[16px] text-center top-[-0.5px] tracking-[-0.3125px] w-[694px] whitespace-pre-wrap">Four critical stages that brought CleanIT from concept to impact. Each milestone represents our commitment to creating lasting change.</p>
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[88px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading11 />
      <Paragraph26 />
    </div>
  );
}

function Container116() {
  return <div className="absolute bg-gradient-to-b from-[#09c] h-[318px] left-[23px] rounded-[16777200px] to-[#d1d5dc] top-[24px] via-1/2 via-[#09c] w-[4px]" data-name="Container" />;
}

function Heading12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Prototype</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-[rgba(31,41,55,0.7)] top-[0.5px] tracking-[-0.1504px]">Initial concept and design</p>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col gap-[8px] h-[64px] items-start left-[80px] pt-[4px] px-[24px] rounded-[10px] top-0 w-[688px]" data-name="Container">
      <Heading12 />
      <Paragraph27 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_705)" id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
        <defs>
          <clipPath id="clip0_2_705">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#09c] items-center justify-center left-px rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,153,204,0.3),0px_4px_6px_0px_rgba(0,153,204,0.3)] size-[48px] to-[#22c55e] top-0" data-name="Container">
      <Icon28 />
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute h-[64px] left-0 top-0 w-[768px]" data-name="Container">
      <Container119 />
      <Container120 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Proof of Concept</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-[rgba(31,41,55,0.7)] top-[0.5px] tracking-[-0.1504px]">Testing the model</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] content-stretch flex flex-col gap-[8px] h-[64px] items-start left-[80px] pt-[4px] px-[24px] rounded-[10px] top-0 w-[688px]" data-name="Container">
      <Heading13 />
      <Paragraph28 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_2_705)" id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
        <defs>
          <clipPath id="clip0_2_705">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#09c] items-center justify-center left-px rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,153,204,0.3),0px_4px_6px_0px_rgba(0,153,204,0.3)] size-[48px] to-[#22c55e] top-0" data-name="Container">
      <Icon29 />
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute h-[64px] left-0 top-[88px] w-[768px]" data-name="Container">
      <Container122 />
      <Container123 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="absolute h-[25px] left-[25px] top-[4px] w-[654px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#09c] text-[16px] top-[-0.38px] tracking-[-0.3125px]">Traction</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[21px] left-[25px] top-[38px] w-[654px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-[rgba(31,41,55,0.7)] top-[0.57px] tracking-[-0.1504px]">Growing the community</p>
    </div>
  );
}

function Container127() {
  return <div className="absolute bg-[#22c55e] left-[12.65px] opacity-79 rounded-[16777200px] size-[8.4px] top-[8.45px]" data-name="Container" />;
}

function Text56() {
  return (
    <div className="absolute h-[16.8px] left-[29.45px] top-[4.25px] w-[66.888px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#09c] text-[12px] top-[1.05px]">In Progress</p>
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute bg-gradient-to-r border border-[rgba(0,153,204,0.2)] border-solid from-[rgba(0,153,204,0.1)] h-[27.3px] left-[25.2px] rounded-[16777200px] to-[rgba(34,197,94,0.1)] top-[71.4px] w-[110.988px]" data-name="Container">
      <Container127 />
      <Text56 />
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute bg-white h-[107px] left-[84.5px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] top-0 w-[685px]" data-name="Container">
      <Heading14 />
      <Paragraph29 />
      <Container126 />
    </div>
  );
}

function Container129() {
  return <div className="bg-gradient-to-b from-[#09c] rounded-[16777200px] shrink-0 size-[16.8px] to-[#22c55e]" data-name="Container" />;
}

function Container128() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-0 p-[4px] rounded-[16777200px] size-[50.4px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-4 border-[#09c] border-solid inset-0 pointer-events-none rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,153,204,0.5),0px_4px_6px_0px_rgba(0,153,204,0.5)]" />
      <Container129 />
    </div>
  );
}

function Container124() {
  return (
    <div className="absolute h-[108px] left-0 top-[173px] w-[787px]" data-name="Container">
      <Container125 />
      <Container128 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Full Launch</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-[rgba(31,41,55,0.7)] top-[0.5px] tracking-[-0.1504px]">Nationwide expansion</p>
    </div>
  );
}

function Container131() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.3)] content-stretch flex flex-col gap-[8px] h-[64px] items-start left-[80px] pt-[4px] px-[24px] rounded-[10px] top-0 w-[688px]" data-name="Container">
      <Heading15 />
      <Paragraph30 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2_781)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2_781">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-px p-[2px] rounded-[16777200px] size-[48px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[16777200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Icon30 />
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute h-[64px] left-0 top-[302px] w-[768px]" data-name="Container">
      <Container131 />
      <Container132 />
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute h-[366px] left-0 top-0 w-[768px]" data-name="Container">
      <Container118 />
      <Container121 />
      <Container124 />
      <Container130 />
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[366px] relative shrink-0 w-[768px]" data-name="Container">
      <Container116 />
      <Container117 />
    </div>
  );
}

function JourneySection() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[64px] h-[733px] items-start pt-[80px] px-[187.5px] relative shrink-0 w-[1143px]" data-name="JourneySection">
      <Container114 />
      <Container115 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[768px]" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[384.96px] not-italic text-[16px] text-center text-white top-[-0.5px] tracking-[-0.3125px]">Ready to Make a Difference?</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[48px] left-0 top-[40px] w-[768px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[384.09px] not-italic text-[16px] text-[rgba(255,255,255,0.9)] text-center top-[-0.5px] tracking-[-0.3125px] w-[764px] whitespace-pre-wrap">Join thousands of eco-warriors across India making real environmental impact. Start your cleanup journey today.</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white h-[40px] left-[297.3px] rounded-[8px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[120px] w-[173.383px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[32px] not-italic text-[#09c] text-[14px] top-[10.5px] tracking-[-0.1504px]">Get Started Now</p>
    </div>
  );
}

function Container133() {
  return (
    <div className="h-[160px] relative shrink-0 w-full" data-name="Container">
      <Heading16 />
      <Paragraph31 />
      <Button8 />
    </div>
  );
}

function CtaSection() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#09c] h-[320px] items-start pt-[80px] px-[187.5px] relative shrink-0 to-[#22c55e] w-[1143px]" data-name="CTASection">
      <Container133 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3dc17b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pca10000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container137() {
  return (
    <div className="bg-[#22c55e] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon31 />
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[24px] relative shrink-0 w-[55.039px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">CleanIT</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container137 />
      <Text57 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[220px] whitespace-pre-wrap">{`Gamifying India's cleanup movement through incentives and community impact.`}</p>
    </div>
  );
}

function Container135() {
  return (
    <div className="col-[1] content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-[1] self-stretch shrink-0" data-name="Container">
      <Container136 />
      <Paragraph32 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Quick Links</p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[38.242px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">Home</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link />
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[72.336px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">Campaigns</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link1 />
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[81.93px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">Leaderboard</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link2 />
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[59.945px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">About Us</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link3 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Container138() {
  return (
    <div className="col-[2] content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-[1] self-stretch shrink-0" data-name="Container">
      <Heading17 />
      <List />
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Resources</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[85.258px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">How It Works</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link4 />
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[67.672px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">Guidelines</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link5 />
    </div>
  );
}

function Link6() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[34.016px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">FAQs</p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link6 />
    </div>
  );
}

function Link7() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[51.281px]" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] tracking-[-0.1504px]">Contact</p>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <Link7 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function Container139() {
  return (
    <div className="col-[3] content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-[1] self-stretch shrink-0" data-name="Container">
      <Heading18 />
      <List1 />
    </div>
  );
}

function Heading19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-white top-[-0.5px] tracking-[-0.3125px]">Connect With Us</p>
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p188b5880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Link8() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2_789)" id="Icon">
          <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3af2c300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2_789">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link9() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p24d83580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd919a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Link10() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon34 />
      </div>
    </div>
  );
}

function Container141() {
  return (
    <div className="content-stretch flex gap-[16px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Link8 />
      <Link9 />
      <Link10 />
    </div>
  );
}

function Container140() {
  return (
    <div className="col-[4] content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-[1] self-stretch shrink-0" data-name="Container">
      <Heading19 />
      <Container141 />
    </div>
  );
}

function Container134() {
  return (
    <div className="gap-[32px] grid grid-cols-[repeat(4,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[144px] relative shrink-0 w-full" data-name="Container">
      <Container135 />
      <Container138 />
      <Container139 />
      <Container140 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[495.78px] not-italic text-[#99a1af] text-[14px] text-center top-[0.5px] tracking-[-0.1504px]">© 2025 CleanIT. All rights reserved. Making India cleaner, together.</p>
    </div>
  );
}

function Container142() {
  return (
    <div className="content-stretch flex flex-col h-[53px] items-start pt-[33px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#364153] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph33 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#1f2937] h-[325px] relative shrink-0 w-full" data-name="Footer">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[48px] px-[75.5px] relative size-full">
        <Container134 />
        <Container142 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[4411px] items-start left-0 pt-[65px] top-0 w-[1143px]" data-name="App">
      <MainContent />
      <JourneySection />
      <CtaSection />
      <Footer />
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3dc17b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pca10000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container145() {
  return (
    <div className="bg-[#22c55e] relative rounded-[16777200px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon35 />
      </div>
    </div>
  );
}

function Text58() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#09c] text-[16px] top-[-0.5px] tracking-[-0.3125px]">CleanIT</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[40px] relative shrink-0 w-[103.039px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center relative size-full">
        <Container145 />
        <Text58 />
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[43.141px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Home</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[85px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Campaigns</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="h-[24px] relative shrink-0 w-[94px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">Leaderboard</p>
      </div>
    </div>
  );
}

function Link14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[67.383px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1f2937] text-[16px] top-[-0.5px] tracking-[-0.3125px]">About Us</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[24px] relative shrink-0 w-[416px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[34px] items-center justify-center relative size-full">
        <Link11 />
        <Link12 />
        <Link13 />
        <Link14 />
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#09c] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[17px] py-[9px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#09c] text-[14px] tracking-[-0.1504px]">Join the Mission</p>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#22c55e] h-[36px] relative rounded-[8px] shrink-0 w-[134.055px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.1504px]">Contact Us</p>
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="h-[36px] relative shrink-0 w-[286.773px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center justify-center relative size-full">
        <Button9 />
        <Button10 />
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[16px] pr-[16.008px] relative size-full">
          <Container144 />
          <Navigation />
          <Container146 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[65px] items-start left-0 pb-px px-[59.5px] top-0 w-[1143px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Container143 />
    </div>
  );
}

export default function CleanIt() {
  return (
    <div className="bg-white relative size-full" data-name="CleanIT">
      <App />
      <Header />
    </div>
  );
}