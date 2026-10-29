import type { ProjectArtId } from '@/lib/content';

export function ProjectArt({ id }: { id: ProjectArtId | string }) {
  switch (id) {
    case 'portal':
      return (
        <svg
          className="pc-art"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="400" height="300" fill="#202124" />
          <rect x="28" y="28" width="344" height="244" rx="14" fill="#0A0A0A" />
          <path
            d="M42 28h70v244H42a14 14 0 0 1-14-14V42a14 14 0 0 1 14-14z"
            fill="#141517"
          />
          <rect x="44" y="50" width="44" height="8" rx="4" fill="#3A3B3F" />
          <g fill="#2A2B2E">
            <rect x="44" y="76" width="52" height="6" rx="3" />
            <rect x="44" y="94" width="40" height="6" rx="3" />
            <rect x="44" y="112" width="48" height="6" rx="3" />
          </g>
          <rect x="132" y="50" width="120" height="10" rx="5" fill="#3A3B3F" />
          <rect x="300" y="45" width="56" height="20" rx="10" fill="#D1162C" />
          <g fill="#1C1D1F">
            <rect x="132" y="84" width="224" height="28" rx="7" />
            <rect x="132" y="120" width="224" height="28" rx="7" />
            <rect x="132" y="156" width="224" height="28" rx="7" />
            <rect x="132" y="192" width="224" height="28" rx="7" />
            <rect x="132" y="228" width="224" height="28" rx="7" />
          </g>
          <g fill="#3A3B3F">
            <rect x="146" y="95" width="80" height="6" rx="3" />
            <rect x="146" y="131" width="64" height="6" rx="3" />
            <rect x="146" y="167" width="90" height="6" rx="3" />
            <rect x="146" y="203" width="70" height="6" rx="3" />
            <rect x="146" y="239" width="84" height="6" rx="3" />
            <rect x="314" y="93" width="28" height="10" rx="5" />
            <rect x="314" y="165" width="28" height="10" rx="5" />
            <rect x="314" y="201" width="28" height="10" rx="5" />
            <rect x="314" y="237" width="28" height="10" rx="5" />
          </g>
          <rect x="314" y="129" width="28" height="10" rx="5" fill="#D1162C" />
        </svg>
      );
    case 'clinic':
      return (
        <svg
          className="pc-art"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="400" height="300" fill="#16171A" />
          <rect x="28" y="36" width="224" height="228" rx="14" fill="#202124" />
          <rect x="46" y="54" width="92" height="10" rx="5" fill="#3A3B3F" />
          <rect x="206" y="52" width="28" height="14" rx="7" fill="#2A2B2E" />
          <g fill="#2A2B2E">
            <rect x="46" y="84" width="30" height="32" rx="6" />
            <rect x="84" y="84" width="30" height="32" rx="6" />
            <rect x="122" y="84" width="30" height="32" rx="6" />
            <rect x="160" y="84" width="30" height="32" rx="6" />
            <rect x="198" y="84" width="30" height="32" rx="6" />
            <rect x="46" y="128" width="30" height="32" rx="6" />
            <rect x="84" y="128" width="30" height="32" rx="6" />
            <rect x="160" y="128" width="30" height="32" rx="6" />
            <rect x="198" y="128" width="30" height="32" rx="6" />
            <rect x="46" y="172" width="30" height="32" rx="6" />
            <rect x="84" y="172" width="30" height="32" rx="6" />
            <rect x="122" y="172" width="30" height="32" rx="6" />
            <rect x="198" y="172" width="30" height="32" rx="6" />
            <rect x="46" y="216" width="30" height="32" rx="6" />
            <rect x="84" y="216" width="30" height="32" rx="6" />
            <rect x="122" y="216" width="30" height="32" rx="6" />
            <rect x="160" y="216" width="30" height="32" rx="6" />
            <rect x="198" y="216" width="30" height="32" rx="6" />
          </g>
          <rect x="122" y="128" width="30" height="32" rx="6" fill="#D1162C" />
          <rect
            x="161"
            y="173"
            width="28"
            height="30"
            rx="5"
            fill="none"
            stroke="#868A90"
            strokeWidth="2"
          />
          <rect
            x="272"
            y="50"
            width="104"
            height="204"
            rx="18"
            fill="#0A0A0A"
            stroke="#2A2B2E"
            strokeWidth="2"
          />
          <rect x="306" y="62" width="36" height="6" rx="3" fill="#2A2B2E" />
          <rect x="284" y="90" width="80" height="46" rx="10" fill="#202124" />
          <circle cx="298" cy="113" r="7" fill="#D1162C" />
          <rect x="312" y="104" width="42" height="6" rx="3" fill="#3A3B3F" />
          <rect x="312" y="116" width="30" height="6" rx="3" fill="#2A2B2E" />
          <rect x="284" y="146" width="66" height="30" rx="10" fill="#26272A" />
          <rect x="296" y="158" width="40" height="6" rx="3" fill="#3A3B3F" />
        </svg>
      );
    case 'invoice':
      return (
        <svg
          className="pc-art"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="400" height="300" fill="#202124" />
          <rect x="36" y="58" width="112" height="152" rx="10" fill="#0A0A0A" />
          <rect x="252" y="58" width="112" height="152" rx="10" fill="#0A0A0A" />
          <g fill="#2A2B2E">
            <rect x="52" y="76" width="54" height="8" rx="4" />
            <rect x="52" y="100" width="80" height="5" rx="2.5" />
            <rect x="52" y="114" width="68" height="5" rx="2.5" />
            <rect x="52" y="128" width="76" height="5" rx="2.5" />
            <rect x="52" y="178" width="40" height="14" rx="4" />
            <rect x="268" y="76" width="54" height="8" rx="4" />
            <rect x="268" y="100" width="80" height="5" rx="2.5" />
            <rect x="268" y="114" width="68" height="5" rx="2.5" />
            <rect x="268" y="128" width="76" height="5" rx="2.5" />
            <rect x="268" y="178" width="40" height="14" rx="4" />
          </g>
          <path
            d="M148 112c26 0 26 22 52 22M252 112c-26 0-26 22-52 22M148 168c26 0 26-22 52-22M252 168c-26 0-26-22-52-22"
            fill="none"
            stroke="#3A3B3F"
            strokeWidth="2"
          />
          <circle cx="200" cy="140" r="24" fill="#D1162C" />
          <path
            d="m189 140 8 8 15-16"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="146" y="234" width="108" height="26" rx="13" fill="#2A2B2E" />
          <circle cx="162" cy="247" r="5" fill="#D1162C" />
          <rect x="174" y="244" width="64" height="6" rx="3" fill="#868A90" />
        </svg>
      );
    case 'catalogue':
      return (
        <svg
          className="pc-art"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="400" height="300" fill="#16171A" />
          <rect x="28" y="28" width="344" height="244" rx="14" fill="#ECECE9" />
          <path
            d="M42 28h316a14 14 0 0 1 14 14v12H28V42a14 14 0 0 1 14-14z"
            fill="#DCDCD8"
          />
          <g fill="#B9B9B5">
            <circle cx="46" cy="41" r="4" />
            <circle cx="60" cy="41" r="4" />
            <circle cx="74" cy="41" r="4" />
          </g>
          <rect x="48" y="76" width="168" height="16" rx="4" fill="#0A0A0A" />
          <rect x="48" y="98" width="124" height="16" rx="4" fill="#0A0A0A" />
          <rect x="48" y="124" width="140" height="6" rx="3" fill="#868A90" />
          <rect x="48" y="142" width="66" height="22" rx="6" fill="#D1162C" />
          <rect x="236" y="72" width="116" height="92" rx="10" fill="#1C1D1F" />
          <path d="m252 148 26-30 18 18 14-12 26 24z" fill="#3A3B3F" />
          <g fill="#D6D6D2">
            <rect x="48" y="184" width="94" height="70" rx="8" />
            <rect x="153" y="184" width="94" height="70" rx="8" />
            <rect x="258" y="184" width="94" height="70" rx="8" />
          </g>
        </svg>
      );
    case 'fleet':
      return (
        <svg
          className="pc-art"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="400" height="300" fill="#111214" />
          <path
            d="M0 84h400M0 196h400M118 0v300M286 0v300M0 260 400 20"
            fill="none"
            stroke="#1E1F22"
            strokeWidth="12"
          />
          <path
            d="M64 248 118 196h88l80-80 52-52"
            fill="none"
            stroke="#D1162C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="64" cy="248" r="8" fill="#fff" />
          <circle cx="206" cy="196" r="6" fill="#868A90" />
          <circle cx="338" cy="64" r="10" fill="#D1162C" />
          <circle
            cx="338"
            cy="64"
            r="20"
            fill="none"
            stroke="#D1162C"
            strokeOpacity=".4"
            strokeWidth="2"
          />
          <rect x="24" y="24" width="132" height="58" rx="10" fill="#1C1D1F" />
          <rect x="38" y="38" width="60" height="7" rx="3.5" fill="#3A3B3F" />
          <rect x="38" y="54" width="96" height="14" rx="4" fill="#2A2B2E" />
          <rect x="38" y="54" width="58" height="14" rx="4" fill="#D1162C" />
        </svg>
      );
    case 'course':
      return (
        <svg
          className="pc-art"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="400" height="300" fill="#202124" />
          <rect x="28" y="36" width="236" height="150" rx="12" fill="#0A0A0A" />
          <circle cx="146" cy="104" r="24" fill="#1C1D1F" />
          <path d="m139 92 20 12-20 12z" fill="#fff" />
          <rect x="44" y="164" width="204" height="4" rx="2" fill="#2A2B2E" />
          <rect x="44" y="164" width="118" height="4" rx="2" fill="#D1162C" />
          <g fill="#141517">
            <rect x="280" y="36" width="92" height="32" rx="8" />
            <rect x="280" y="76" width="92" height="32" rx="8" />
            <rect x="280" y="116" width="92" height="32" rx="8" />
            <rect x="280" y="156" width="92" height="30" rx="8" />
          </g>
          <rect x="280" y="76" width="4" height="32" rx="2" fill="#D1162C" />
          <g fill="#3A3B3F">
            <rect x="292" y="48" width="56" height="7" rx="3.5" />
            <rect x="292" y="88" width="64" height="7" rx="3.5" />
            <rect x="292" y="128" width="50" height="7" rx="3.5" />
            <rect x="292" y="167" width="60" height="7" rx="3.5" />
          </g>
          <rect x="28" y="208" width="196" height="14" rx="4" fill="#3A3B3F" />
          <g fill="#2A2B2E">
            <rect x="28" y="232" width="132" height="8" rx="4" />
            <rect x="28" y="250" width="160" height="8" rx="4" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
