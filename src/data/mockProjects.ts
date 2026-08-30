export interface CarbonProject {
  id: string;
  name: string;
  type: "Forestry" | "Biogas" | "Wind" | "Solar" | "Waste-to-Energy";
  developer: string;
  location: string;
  lat: number;
  lng: number;
  price: number; // in ₹ per ton
  volume: number; // in tons
  acvaVerified: boolean;
  trustScore: number; // out of 100
  riskScore: "Low" | "Medium" | "High";
  riskRationale: string;
  description: string;
  certRegistry: string;
  details: string;
}

export const mockProjects: CarbonProject[] = [
  {
    id: "ev-001",
    name: "Mahanadi Mangrove Restoration",
    type: "Forestry",
    developer: "Ananya Eco-Holdings",
    location: "Odisha",
    lat: 20.35,
    lng: 86.75,
    price: 320,
    volume: 24500,
    acvaVerified: true,
    trustScore: 98,
    riskScore: "Low",
    riskRationale: "ACVA audited, government registered. High survival rate of species monitored by satellite MRV.",
    description: "Restoring saline-damaged delta systems in Odisha by planting native mangrove species. This project protects local fishing communities from cyclone storm surges while capturing significant carbon in root systems.",
    certRegistry: "GCI-REG-2026-OD812",
    details: "This project covers over 1,200 hectares of estuary. The carbon accumulation is verified through biannual biomass sampling and multi-spectral satellite monitoring. Credits are backed by the Ministry of Environment and Forests, Odisha branch."
  },
  {
    id: "ev-002",
    name: "Malwa Agricultural Biogas Hub",
    type: "Biogas",
    developer: "Rakesh Agro Energy Pvt Ltd",
    location: "Punjab",
    lat: 30.9,
    lng: 75.85,
    price: 295,
    volume: 18200,
    acvaVerified: true,
    trustScore: 95,
    riskScore: "Low",
    riskRationale: "Low operating risk, constant fuel source. Methane capture verified by smart sensors on site.",
    description: "Collecting crop stubble and cattle waste from 450 smallholder farmers in Punjab to generate clean cooking gas, preventing stubble burning and open-air manure emissions.",
    certRegistry: "GCI-REG-2026-PB291",
    details: "Utilizes continuous stirred-tank digesters. Byproducts are converted into high-grade organic fertilizer distributed back to local farmers, building a circular agriculture economy. Methane capture rate stands at 99.2%."
  },
  {
    id: "ev-003",
    name: "Thar Desert Solar Harvest",
    type: "Solar",
    developer: "Desert Green Power",
    location: "Rajasthan",
    lat: 26.9,
    lng: 70.9,
    price: 260,
    volume: 68000,
    acvaVerified: false,
    trustScore: 92,
    riskScore: "Medium",
    riskRationale: "Highly standardized asset, but voluntary offset yields depend slightly on grid congestion metrics.",
    description: "Grid-connected 150MW photovoltaic solar park in Jaisalmer, replacing coal-fired thermal generation in northern India's regional electricity pool.",
    certRegistry: "GCI-REG-2026-RJ044",
    details: "Features bifacial solar panels and single-axis trackers to maximize output. Displaces approximately 280,000 tons of CO2 equivalents per annum from the regional grid."
  },
  {
    id: "ev-004",
    name: "Western Ghats Community Forestry",
    type: "Forestry",
    developer: "Sahyadri Conservation Trust",
    location: "Maharashtra",
    lat: 17.5,
    lng: 73.8,
    price: 360,
    volume: 12000,
    acvaVerified: true,
    trustScore: 99,
    riskScore: "Low",
    riskRationale: "Highly protected forest reserve with long-term conservation easements and strong community governance.",
    description: "Afforestation and ecological corridor creation in degraded forest edges of the Western Ghats. Focused on biodiversity preservation and local livelihood generation through non-timber forest produce.",
    certRegistry: "GCI-REG-2026-MH482",
    details: "Employs over 300 tribal families in sapling cultivation, planting, and guarding. Uses dynamic lidar scanning to measure carbon stock changes with a 3% margin of error."
  },
  {
    id: "ev-005",
    name: "Kutch Wind Farm Cluster",
    type: "Wind",
    developer: "Aditya Wind Systems",
    location: "Gujarat",
    lat: 23.2,
    lng: 69.6,
    price: 275,
    volume: 52000,
    acvaVerified: true,
    trustScore: 94,
    riskScore: "Low",
    riskRationale: "Long operational history, certified under global carbon standards and cross-referenced with regional grid logs.",
    description: "Large-scale wind energy project in coastal Gujarat generating clean electricity and contributing to national grid decarbonization.",
    certRegistry: "GCI-REG-2026-GJ112",
    details: "Comprises 82 wind turbine generators. Validated under clean development mechanism (CDM) rules with real-time SCADA feed directly audited by EcoVault."
  },
  {
    id: "ev-006",
    name: "Bengaluru Municipal Organic Waste-to-Energy",
    type: "Waste-to-Energy",
    developer: "Hassan Waste Solutions",
    location: "Karnataka",
    lat: 13.0,
    lng: 77.6,
    price: 310,
    volume: 15400,
    acvaVerified: false,
    trustScore: 91,
    riskScore: "Medium",
    riskRationale: "Requires continuous waste segregation audits. Organic fractions fluctuate based on municipal collection efficiency.",
    description: "Methane extraction from municipal solid waste using dry anaerobic digestion, preventing landfill emissions and producing high-grade compost.",
    certRegistry: "GCI-REG-2026-KA551",
    details: "Processes 200 metric tons of segregated wet waste daily. The system extracts bio-CNG which is bottled and sold to transport companies, offsetting diesel consumption."
  },
  {
    id: "ev-007",
    name: "Brahmaputra Bamboo Reforestation",
    type: "Forestry",
    developer: "Assam Agro Forestry Society",
    location: "Assam",
    lat: 26.2,
    lng: 91.7,
    price: 345,
    volume: 19500,
    acvaVerified: true,
    trustScore: 97,
    riskScore: "Low",
    riskRationale: "Fast-growing bamboo captures carbon rapidly. Excellent community ownership and local authority backing.",
    description: "Reforestation of riverbanks and floodplains along the Brahmaputra with native bamboo species, stabilizing soil erosion and capturing carbon at record speeds.",
    certRegistry: "GCI-REG-2026-AS773",
    details: "Bamboo reaches maturity in 3-5 years, providing rapid carbon drawdown. Harvested biomass is processed into long-lived building materials, locking carbon away semi-permanently."
  },
  {
    id: "ev-008",
    name: "Godavari Rice Husk Biomass Cogeneration",
    type: "Waste-to-Energy",
    developer: "Andhra Green Heat",
    location: "Andhra Pradesh",
    lat: 16.9,
    lng: 81.8,
    price: 285,
    volume: 22000,
    acvaVerified: true,
    trustScore: 96,
    riskScore: "Low",
    riskRationale: "Predictable agricultural residue supply. Displaces fossil fuel heating at nearby pharmaceutical processing plant.",
    description: "Replacing coal with waste rice husk for steam and power generation in industrial boilers, directly reducing industrial emission footprints.",
    certRegistry: "GCI-REG-2026-AP089",
    details: "Sourced from 35 rice mills within a 50km radius. Eliminates agricultural waste disposal issues and replaces coal combustion at a 1:1 energy equivalent."
  },
  {
    id: "ev-009",
    name: "Tamil Nadu Wind Harvesters",
    type: "Wind",
    developer: "Coromandel Wind Energy",
    location: "Tamil Nadu",
    lat: 11.1,
    lng: 78.6,
    price: 270,
    volume: 45000,
    acvaVerified: false,
    trustScore: 93,
    riskScore: "Medium",
    riskRationale: "High output, but subject to grid-curtailment risks during peak monsoon wind cycles.",
    description: "Wind energy generation in Muppandal wind farm, one of India's largest wind regions, displacing fossil-fuel dominance in the southern grid.",
    certRegistry: "GCI-REG-2026-TN332",
    details: "High-capacity modern gearless wind turbines with low maintenance profiles. Real-time generation data is fed directly to the national carbon credit registry."
  },
  {
    id: "ev-010",
    name: "Haryana Dairy Biomethane Plant",
    type: "Biogas",
    developer: "Karnal Bio-Power",
    location: "Haryana",
    lat: 29.7,
    lng: 76.9,
    price: 305,
    volume: 16000,
    acvaVerified: true,
    trustScore: 96,
    riskScore: "Low",
    riskRationale: "Strong feedstock security from dairy cooperatives. Documented offsets verified through continuous monitoring.",
    description: "Harnessing manure from large dairy cooperatives in Haryana to generate electricity and supply compressed natural gas (CNG) to transport.",
    certRegistry: "GCI-REG-2026-HR902",
    details: "Anaerobic digestion of organic sludge. Methane is scrubbed to 97% purity and utilized in stationary gas engines. Carbon credits represent direct avoided methane emissions."
  }
];
