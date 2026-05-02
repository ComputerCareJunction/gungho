/** Official site links + domain for favicon (Google s2). */

export type ClienteleEntry = {
  name: string;
  href: string;
  /** Host only, e.g. `www.microsoft.com` */
  domain: string;
};

export const clienteleByColumnId: Record<string, ClienteleEntry[]> = {
  tech: [
    { name: 'Cisco', href: 'https://www.cisco.com/', domain: 'www.cisco.com' },
    { name: 'Microsoft', href: 'https://www.microsoft.com/', domain: 'www.microsoft.com' },
    { name: 'Autodesk', href: 'https://www.autodesk.com/', domain: 'www.autodesk.com' },
    { name: 'UiPath', href: 'https://www.uipath.com/', domain: 'www.uipath.com' },
    {
      name: 'Rockwell Automation',
      href: 'https://www.rockwellautomation.com/',
      domain: 'www.rockwellautomation.com'
    },
    { name: 'Trimble', href: 'https://www.trimble.com/', domain: 'www.trimble.com' },
    { name: 'Adobe', href: 'https://www.adobe.com/', domain: 'www.adobe.com' }
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
      domain: 'www.britishcouncil.org'
    },
    {
      name: 'Scottish Development International',
      href: 'https://www.sdi.co.uk/',
      domain: 'www.sdi.co.uk'
    },
    { name: 'FICCI', href: 'https://www.ficci.in/', domain: 'www.ficci.in' }
  ],
  automotive: [
    { name: 'Toyota', href: 'https://www.toyota.com/', domain: 'www.toyota.com' },
    { name: 'Honda', href: 'https://global.honda/', domain: 'www.honda.com' },
    { name: 'DuPont', href: 'https://www.dupont.com/', domain: 'www.dupont.com' },
    { name: 'Omron', href: 'https://www.omron.com/', domain: 'www.omron.com' },
    { name: 'OPPO', href: 'https://www.oppo.com/', domain: 'www.oppo.com' }
  ],
  healthcare: [
    { name: 'Elsevier', href: 'https://www.elsevier.com/', domain: 'www.elsevier.com' },
    {
      name: 'Abbott Vascular',
      href: 'https://www.abbott.com/',
      domain: 'www.abbott.com'
    },
    { name: 'Bacardi', href: 'https://www.bacardilimited.com/', domain: 'www.bacardilimited.com' },
    { name: 'SABMiller', href: 'https://www.sabmiller.com/', domain: 'www.sabmiller.com' },
    { name: 'UB Group', href: 'https://www.theubgroup.com/', domain: 'www.theubgroup.com' }
  ],
  consumer: [
    { name: 'ADS Spirits', href: 'https://www.adsspirits.com/', domain: 'www.adsspirits.com' },
    { name: 'Hitachi', href: 'https://www.hitachi.com/', domain: 'www.hitachi.com' },
    {
      name: 'Whirlpool',
      href: 'https://www.whirlpoolcorp.com/',
      domain: 'www.whirlpoolcorp.com'
    },
    { name: 'Faber', href: 'https://www.faberindia.com/', domain: 'www.faberindia.com' },
    {
      name: 'Vishal Mega Mart',
      href: 'https://www.v2retail.com/',
      domain: 'www.v2retail.com'
    },
    {
      name: 'Millward Brown',
      href: 'https://www.kantar.com/',
      domain: 'www.kantar.com'
    }
  ]
};
