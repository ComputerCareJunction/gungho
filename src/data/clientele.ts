import logoAdobe from '../assets/logo/adobe.svg';
import logoAbbottVascular from '../assets/logo/abbott-vascular.png';
import logoAutodesk from '../assets/logo/autodesk.webp';
import logoBacardi from '../assets/logo/bacardi.png';
import logoBritishCouncil from '../assets/logo/british-council.jpg';
import logoCisco from '../assets/logo/cisco.svg';
import logoDupont from '../assets/logo/dupont.png';
import logoElsevier from '../assets/logo/elsevier.png';
import logoFaber from '../assets/logo/faber.jpg';
import logoFicci from '../assets/logo/ficci.png';
import logoHitachi from '../assets/logo/hitachi.png';
import logoHonda from '../assets/logo/honda.png';
import logoMicrosoft from '../assets/logo/microsoft.jpg';
import logoMillwardBrown from '../assets/logo/millward-brown.webp';
import logoOmron from '../assets/logo/omron.png';
import logoOppo from '../assets/logo/oppo.png';
import logoRockwell from '../assets/logo/rockwell.svg';
import logoToyota from '../assets/logo/toyota.png';
import logoTrimble from '../assets/logo/trimble.svg';
import logoUiPath from '../assets/logo/uipath.svg';
import logoVishalMegaMart from '../assets/logo/vishal-mega-mart.jpg';
import logoWhirlpool from '../assets/logo/whirlpool.png';

/** Official site links + domain for favicon when no bundled logo. */

export type ClienteleEntry = {
  name: string;
  href: string;
  /** Host only, e.g. `www.microsoft.com` */
  domain: string;
  /** Vite-resolved asset URL; favicon used when omitted */
  logo?: string;
  /**
   * When a bundled `logo` is present, the name is hidden by default (the asset is treated as a wordmark).
   * Set `true` to show the legal name in text next to the logo (e.g. symbol-only marks).
   */
  showNameWithLogo?: boolean;
};

export const clienteleByColumnId: Record<string, ClienteleEntry[]> = {
  tech: [
    { name: 'Cisco', href: 'https://www.cisco.com/', domain: 'www.cisco.com', logo: logoCisco },
    {
      name: 'Microsoft',
      href: 'https://www.microsoft.com/',
      domain: 'www.microsoft.com',
      logo: logoMicrosoft
    },
    { name: 'Autodesk', href: 'https://www.autodesk.com/', domain: 'www.autodesk.com', logo: logoAutodesk },
    { name: 'UiPath', href: 'https://www.uipath.com/', domain: 'www.uipath.com', logo: logoUiPath },
    {
      name: 'Rockwell Automation',
      href: 'https://www.rockwellautomation.com/',
      domain: 'www.rockwellautomation.com',
      logo: logoRockwell
    },
    { name: 'Trimble', href: 'https://www.trimble.com/', domain: 'www.trimble.com', logo: logoTrimble },
    { name: 'Adobe', href: 'https://www.adobe.com/', domain: 'www.adobe.com', logo: logoAdobe }
  ],
  institutions: [
    {
      name: 'UK Department for International Trade',
      href: 'https://www.gov.uk/government/organisations/department-for-international-trade',
      domain: 'www.gov.uk'
    },
    {
      name: 'British Council',
      href: 'https://www.britishcouncil.org/',
      domain: 'www.britishcouncil.org',
      logo: logoBritishCouncil
    },
    {
      name: 'Scottish Development International',
      href: 'https://www.sdi.co.uk/',
      domain: 'www.sdi.co.uk'
    },
    { name: 'FICCI', href: 'https://www.ficci.in/', domain: 'www.ficci.in', logo: logoFicci }
  ],
  automotive: [
    { name: 'Toyota', href: 'https://www.toyota.com/', domain: 'www.toyota.com', logo: logoToyota },
    { name: 'Honda', href: 'https://global.honda/', domain: 'www.honda.com', logo: logoHonda },
    { name: 'DuPont', href: 'https://www.dupont.com/', domain: 'www.dupont.com', logo: logoDupont },
    { name: 'Omron', href: 'https://www.omron.com/', domain: 'www.omron.com', logo: logoOmron },
    { name: 'OPPO', href: 'https://www.oppo.com/', domain: 'www.oppo.com', logo: logoOppo }
  ],
  healthcare: [
    { name: 'Elsevier', href: 'https://www.elsevier.com/', domain: 'www.elsevier.com', logo: logoElsevier },
    {
      name: 'Abbott Vascular',
      href: 'https://www.abbott.com/',
      domain: 'www.abbott.com',
      logo: logoAbbottVascular
    },
    { name: 'Bacardi', href: 'https://www.bacardilimited.com/', domain: 'www.bacardilimited.com', logo: logoBacardi },
    { name: 'SABMiller', href: 'https://www.sabmiller.com/', domain: 'www.sabmiller.com' },
    { name: 'UB Group', href: 'https://www.theubgroup.com/', domain: 'www.theubgroup.com' }
  ],
  consumer: [
    { name: 'ADS Spirits', href: 'https://www.adsspirits.com/', domain: 'www.adsspirits.com' },
    { name: 'Hitachi', href: 'https://www.hitachi.com/', domain: 'www.hitachi.com', logo: logoHitachi },
    {
      name: 'Whirlpool',
      href: 'https://www.whirlpoolcorp.com/',
      domain: 'www.whirlpoolcorp.com',
      logo: logoWhirlpool
    },
    { name: 'Faber', href: 'https://www.faberindia.com/', domain: 'www.faberindia.com', logo: logoFaber },
    {
      name: 'Vishal Mega Mart',
      href: 'https://www.v2retail.com/',
      domain: 'www.v2retail.com',
      logo: logoVishalMegaMart
    },
    {
      name: 'Millward Brown',
      href: 'https://www.kantar.com/',
      domain: 'www.kantar.com',
      logo: logoMillwardBrown
    }
  ]
};
