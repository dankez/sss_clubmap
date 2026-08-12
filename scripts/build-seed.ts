import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const groupsDir = path.join(rootDir, "packages", "map-data", "groups");

interface RawGroupSeed {
  name: string;
  contact_person?: string;
  phones?: string[];
  emails?: string[];
  website?: string;
  socials?: { platform: string; url: string }[];
}

const rawSeedList: RawGroupSeed[] = [
  { name: "Jaskyniarska skupina Adama Vallu", contact_person: "Tomáš Hampl", phones: ["+421948392752"], emails: ["tomashampl@azet.sk"] },
  { name: "Moldavský jaskyniarsky klub Adonis Ten", contact_person: "Attila Dobos", phones: ["+421903656664"], emails: ["dobosati007@gmail.com"] },
  { name: "Jaskyniarska skupina Aragonit", contact_person: "Eduard Piovarči", phones: ["+421904800011"], emails: ["piovarci.aragonit@gmail.com"] },
  { name: "Jaskyniarska skupina Arachnos – Slovenský kras", contact_person: "Ladislav Juhász", phones: ["+421911226472"], emails: ["vizy18@gmail.com"] },
  { name: "Speleoklub Badizer Ardovo", contact_person: "Alexander Skokan", phones: ["+421910502457"], emails: ["skokan.alexander@gmail.com"] },
  { name: "Speleoklub Banská Bystrica", contact_person: "Ing. Štefan Mlynárik", phones: ["+421903514704"], emails: ["stevo.mlynarik@gmail.com"], website: "https://www.speleo.sk" },
  { name: "Speleo Bratislava", contact_person: "Mgr. art. Peter Ševčík", phones: ["+421908983646"], emails: ["petersevo@gmail.com"], website: "https://www.speleobratislava.webnode.sk" },
  { name: "Speleo Brezno", contact_person: "Ľubomír Múka", phones: ["+421905269845"], emails: ["speleobrezno@gmail.com"], website: "http://osbr.sss.sk" },
  { name: "Speleoklub Cassovia", contact_person: "Ing. Jozef Thuróczy", phones: ["+421905515979"], emails: ["thuroczyjozef@gmail.com"], website: "https://www.cassovia.sss.sk" },
  { name: "Oblastná skupina Čachtice", contact_person: "Lukáš Kubičina", phones: ["+421914230387"], emails: ["oscachtice@gmail.com"] },
  { name: "Speleologický klub Červené vrchy Slovakia", contact_person: "Ján Šmoll", phones: ["+421903512283"], emails: ["jan.smoll007@gmail.com"], website: "https://www.cervenevrchy-speleo.sk" },
  { name: "CUC Bratislava", contact_person: "Miroslav Zverka", phones: ["+421902852502"], emails: ["zverka@ovsiste.sk"] },
  { name: "Jaskyniarsky klub Demänovská Dolina", contact_person: "Mgr. Pavel Herich", phones: ["+421944108618"], emails: ["herich@speleodd.sk"], website: "https://www.speleodd.sk" },
  { name: "Speleo-Detva", contact_person: "Elena Hipmanová", phones: ["+421910993703"], emails: ["ehipmanova@gmail.com"], website: "https://www.speleodetva.sss.sk" },
  { name: "Speleoklub Drienka Košice", contact_person: "Ing. Jozef Psotka", phones: ["+421904338683"], emails: ["jozef.psotka@gmail.com"], website: "https://www.drienka.netkosice.sk" },
  { name: "Jaskyniarsky klub Dubnica nad Váhom", contact_person: "Peter Medzihradský", phones: ["+421905380671"], emails: ["pmedzihradsky@gmail.com"], website: "https://www.dubnica.sss.sk" },
  { name: "Speleoklub Ďumbier", contact_person: "Stacho Mudrák", phones: ["+421919225273", "+421905135535"], emails: ["s.m@speleo.sk"], website: "https://www.jmn.sk" },
  { name: "MEANDER – Hájsky klub športovej speleológie", contact_person: "Tomáš Fussgänger", phones: ["+421944592831"], emails: ["hufihu@seznam.cz"], website: "https://www.hkss.sss.sk" },
  { name: "Jaskyniarsky klub Handlová", contact_person: "Peter Strečanský", phones: ["+421465473681", "+421908642970"], emails: ["peter.strecansky@gmail.com"], website: "https://www.jkhandlova.webnode.sk" },
  { name: "Speleoclub Chočské vrchy", contact_person: "Ing. Juraj Szunyog", phones: ["+421910555654"], emails: ["juraj.szunyog@mondigroup.com"], website: "https://www.schv.sk" },
  { name: "Oblastná skupina Inovec", contact_person: "Ing. Ivan Demovič", phones: ["+421908420545"], emails: ["ivan.demovic1@gmail.com"] },
  { name: "Oblastná skupina Jána Majku", contact_person: "MVDr. Zbyněk Valenta", phones: ["+421948383178"], emails: ["zvcave@email.cz"], website: "https://www.osjm.sk" },
  { name: "Oblastná skupina Liptovská Teplička", contact_person: "Vlastimil Knapp", phones: ["+421908903798"], emails: ["knapp.vl@gmail.com"] },
  { name: "Oblastná skupina Liptovský Mikuláš", contact_person: "Mgr. Ľubica Mareková PhD.", emails: ["lub.luhova@gmail.com"], website: "https://speleolm.sss.sk" },
  { name: "Jaskyniarsky klub Liptovský Trnovec", contact_person: "Martin Vrabec", phones: ["+421902827348"], emails: ["vrabecma@gmail.com"] },
  { name: "Speleoklub Malá Fatra", contact_person: "Ing. Pavol Pokrievka", phones: ["+421434223701", "+421908964754"], emails: ["pavolpokrievka@zoznam.sk"], website: "http://speleomalafatra.webnode.sk" },
  { name: "Speleoklub Minotaurus", contact_person: "RNDr. Jaroslav Stankovič", phones: ["+421587343426", "+421905412048"], emails: ["stankov@ke.psg.sk"], website: "https://www.krasnohorska-jaskyna.sk" },
  { name: "Speleoklub Muránska planina", contact_person: "Ing. Milan Poprocký", phones: ["+421905743148"], emails: ["speleomp@gmail.com"] },
  { name: "Speleoklub Nicolaus", contact_person: "Ing. Peter Holúbek", phones: ["+421445522061", "+421904333613"], emails: ["peter.holubek@smopaj.sk"], website: "https://www.nicolaus.sss.sk" },
  { name: "Speleoklub Nitra", contact_person: "doc. Mgr. Tomáš Lánczos, PhD.", phones: ["+421911260644"], emails: ["tlanczos@gmail.com"] },
  { name: "Oblastná skupina Orava", contact_person: "Štefan Poláčik", phones: ["+421903950231"], emails: ["speleo.orava@gmail.com"] },
  { name: "Jaskyniari Plavecké Podhradie", contact_person: "JUDr. Marián Grúz", phones: ["+421918432640"], emails: ["marian.gruz@gmail.com"], website: "https://www.speleopp.sk" },
  { name: "Oblastná skupina Prešov", contact_person: "Rudolf Košč", phones: ["+421905237565"], emails: ["kosc@zladiera.sk"], website: "https://www.zladiera.sk" },
  { name: "Oblastná speleologická skupina Rimavská Sobota", contact_person: "Stanislav Scholtz", phones: ["+421908714306", "+421904862248"], emails: ["ossrs@jaskyne.info"] },
  { name: "Speleoklub Rokoš", contact_person: "Ľubomír Kubíček", phones: ["+421948879898"], emails: ["lubomir.kubicek@gmail.com"] },
  { name: "Speleo Rožňava", contact_person: "Mikuláš Repaszký", phones: ["+421925756833"], emails: ["mikulas.repaszky@gmail.com"], website: "https://www.speleoroznava.webnode.sk" },
  {
    name: "Oblastná skupina Ružomberok",
    contact_person: "Bc. Miroslav Jurečka",
    phones: ["+421905793351", "+421907041625"],
    emails: ["jurecka@rknet.sk"],
    website: "https://www.speleork.sk",
    socials: [
      { platform: "facebook", url: "https://www.facebook.com/speleork" },
      { platform: "instagram", url: "https://www.instagram.com/speleork" }
    ]
  },
  { name: "Speleologický klub Slovenský raj", contact_person: "Ing. Branislav Tulis", phones: ["+421905923625"], emails: ["tulis@tulis.sk"], website: "https://www.speleoraj.sk" },
  { name: "Sekcia speleopotápania", contact_person: "Peter Kubička", phones: ["+421905108699"], emails: ["kubi@kubi.sk"], website: "https://www.kubi.sk" },
  { name: "Speleodiver", contact_person: "Mgr. Karol Kýška", phones: ["+421948693191"], emails: ["mgr.kyska@airtrend.sk"] },
  {
    name: "Jaskyniarska skupina Spišská Belá",
    contact_person: "Ľubomír Plučinský",
    phones: ["+421944214107"],
    emails: ["lplucinsky@gmail.com"],
    website: "https://www.speleo-spisskabela.sk",
    socials: [
      { platform: "facebook", url: "https://www.facebook.com/Speleo-SpisskaBela" },
      { platform: "instagram", url: "https://www.instagram.com/speleota3" }
    ]
  },
  { name: "Jaskyniarsky klub Strážovské vrchy", contact_person: "Mgr. Bohuslav Kortman", phones: ["+421905488028"], emails: ["bohuslav.kortman@speleostrazov.sk"], website: "https://www.speleostrazov.sk" },
  { name: "Speleoklub Šariš", contact_person: "Ing. Peter Hurný", phones: ["+421907955243"], emails: ["speleosaris@gmail.com"], website: "https://www.speleosaris.estranky.cz" },
  { name: "Speleoklub Tisovec", contact_person: "Ing. Dušan Hutka", phones: ["+421908914017"], emails: ["hutkatisovec@gmail.com"] },
  { name: "Trenčiansky speleoklub", contact_person: "Miroslav Sova", phones: ["+421918602869"], emails: ["sovamiro@gmail.com"] },
  { name: "Speleoklub Tribeč", contact_person: "Mgr. Vladimír Prutkay", phones: ["+421902949921"], emails: ["pqq@post.sk"] },
  { name: "Speleoklub Trnava", contact_person: "doc. RNDr. Alexander Lačný, PhD.", phones: ["+421908895769"], emails: ["sasol@speleott.sk"], website: "https://www.speleott.sk" },
  { name: "Jaskyniarsky klub Speleo Turiec", contact_person: "Mgr. Pavol Pokrievka ml.", phones: ["+421902263520"], emails: ["palopokrievka@gmail.com"], website: "https://www.speleoturiec.sk" },
  { name: "Oblastná skupina Uhrovec", contact_person: "Jozef Kováčik", phones: ["+421387607038", "+421903273475"], emails: ["jzfkvck@gmail.com"] },
  { name: "Speleoklub Univerzity P. J. Šafárika, Košice", contact_person: "doc. RNDr. Zdenko Hochmuth, CSc.", phones: ["+421908977594"], emails: ["hochmuth@upjs.sk"], website: "http://speleoupjs.sk" },
  { name: "Jaskyniarsky klub Varín", contact_person: "Pavol Cvacho", phones: ["+421905365688"], emails: ["jkvarin@centrum.sk"], website: "http://speleovarin.sss.sk" },
  { name: "Oblastná skupina Veľká Fatra", contact_person: "Zuzana Hric", phones: ["+421910198325"], emails: ["zuzuvacekova@gmail.com"] },
  { name: "Žilinský jaskyniarsky klub", contact_person: "Tibor Pajtina", phones: ["+421903772579"], emails: ["jaskyniari@gmail.com"] }
];

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function buildSeed(): void {
  if (!fs.existsSync(groupsDir)) {
    fs.mkdirSync(groupsDir, { recursive: true });
  }

  rawSeedList.forEach((raw, idx) => {
    const id = `sss-${String(idx + 1).padStart(3, "0")}`;
    const slug = slugify(raw.name);
    const targetDir = path.join(groupsDir, id);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const publicContact: { email?: string; phone?: string } = {};
    if (raw.emails && raw.emails.length > 0) {
      publicContact.email = raw.emails[0];
    }
    if (raw.phones && raw.phones.length > 0) {
      publicContact.phone = raw.phones[0];
    }

    const groupRecord: Record<string, unknown> = {
      id,
      name: raw.name,
      slug,
      short_description: `${raw.name} pôsobí v oblasti speleológia a výskumu jaskýň na Slovensku.`,
      verified_at: null,
      polygon_status: "missing",
      sources: [{ type: "other", reference: "sss-adresar" }],
      created_at: "2026-08-12",
      updated_at: "2026-08-12"
    };

    if (raw.website) {
      groupRecord.website = raw.website;
    }
    if (Object.keys(publicContact).length > 0) {
      groupRecord.public_contact = publicContact;
    }
    if (raw.socials && raw.socials.length > 0) {
      groupRecord.social_links = raw.socials;
    }

    const yamlPath = path.join(targetDir, "group.yaml");
    fs.writeFileSync(yamlPath, yaml.dump(groupRecord, { lineWidth: -1 }), "utf-8");
    console.log(`Generated ${id} (${slug}) -> ${path.relative(rootDir, yamlPath)}`);
  });

  console.log(`\nSuccessfully created ${rawSeedList.length} group YAML files in packages/map-data/groups/`);
}

buildSeed();
