const logotext = "ecal.dev";
const meta = {
  title: "ecal.dev",
  description:
    "Ethan Callanan - I solve interesting problems. Director of Research at QMIND, building a brain-computer interface and leading three other AI research projects.",
};

const introdata = {
  title: "Heyo, I'm Ethan",
  animated: {
    static: "I love ",
    first: "coding",
    second: "learning",
    third: "AI",
    final: "solving problems.",
  },
  description: {
    current:
      "Director of Research at QMIND, building a brain-computer interface and leading three other AI research projects.",
    prev1:
      "Software/Data engineer at Praxis Pioneering, where I built data analysis software, and automated big data ETL pipelines for ML forecasting models informing decisions for a multi-billion dollar media company.",
    prev2:
      "Research intern at the MuLab, where I built MACQ, co-authored a research paper, and held a conference (ICAPS) workshop session on the project.",
    other: "and a lot more... ",
  },
  img: "https://avatars.githubusercontent.com/u/47398876",
};

const about = {
  title: "Who am I?",
  intro:
    "I love solving problems and I'm always looking for my next challenge. My passion inspires me to constantly improve my skills and knowledge.",
  story:
    "I am currently finishing up my undergraduate degree at Queen's University, studying computer science with a major in artificial intelligence. When I'm not doing school work, I'm tinkering away customizing my computer [a from-scratch Arch linux setup], playing around with the latest AI models or implementing them from scratch [currently loving stable diffusion and building an nlp transformer model], working on my QMIND project [brain-computer interface], or cooking!",
  cta: "Due to my intrinsic drive for learning and building anything and everything related to AI, I've gained an above-average skillset for an undergraduate. I have 2 published papers [MAcq and QMIND] with one more on the way this year, have presented my work at a conference workshop [ICAPS], experienced building and shipping software, worked with big data, and completed multiple fullstack ML projects.",
};
const work = [
  {
    jobtitle: "Director of Research",
    where: "QMIND",
    date: "Apr 2022 - Current",
  },
  {
    jobtitle: "Software/Data Engineer",
    where: "Praxis Pioneering",
    date: "Jun 2022 - Aug 2022",
  },
  {
    jobtitle: "Head of AI",
    where: "Arke News",
    date: "Dec 2021 - Aug 2022",
  },
  {
    jobtitle: "Director of Design [NLP]",
    where: "QMIND",
    date: "Apr 2021 - Apr 2022",
  },
  {
    jobtitle: "Research Intern",
    where: "MuLab",
    date: "May 2021 - Sep 2021",
  },
  {
    jobtitle: "Team Lead [CV; Attention Detection]",
    where: "QMIND",
    date: "Sep 2020 - Apr 2021",
  },
  {
    jobtitle: "Full-Stack Developer",
    where: "RYPM",
    date: "May 2020 - Oct 2020",
  },
];

const dataportfolio = [
  /*
vaad | macq
nnfs | praxis
dots | evim
rypm | bauhaus
tm   | 
*/
  {
    img: "vaad.png",
    title: "Attention Detection",
    description:
      "A more human way of interfacing with virtual assistants. Uses CNNs to detect when you are speaking to a virtual assistant, allowing you to simply speak to your virtual assistant rather than shout its keyword. Awarded top paper at CUCAI 2021",
    code: "https://github.com/e-cal/VAAD",
    paper:
      "https://qmind.ca/static/media/VAAD%20Cucai%20Paper.5d296c6ade6451e73ec0.pdf",
  },
  {
    img: "nnfs.png",
    title: "Neural Networks from Scratch",
    description:
      "As a learning exercise to really deepen my understanding of how my favorite algorithms work. I've found this has helped develop my intuition and comfortability working with neural networks greatly.",
    code: "https://github.com/e-cal/nn-from-scratch",
  },
  {
    img: "dotfiles.png",
    title: "Dotfiles: Arch Linux",
    description:
      "A fully custom Arch linux setup. This has been my never ending passion project since 2020 christmas break. If I'm gonna use a computer everyday I may as well enjoy it right?!",
    code: "https://github.com/e-cal/dotfiles",
  },

  {
    img: "rypm.png",
    title: "Full Stack Development",
    description:
      "A web-app built to modernize the client interactions and internal operations for Royal York Property Management.",
    site: "https://royalyorkpropertymanagement.ca/properties",
  },
  {
    img: "tm.png",
    title: "tmux Session Manager [tm]",
    description:
      "Manage multiple tmux sessions with ease and fly through the shell. By far the most useful script I have ever written, I seriously don't know how I lived before this.",
    code: "https://github.com/e-cal/dotfiles/blob/main/global/scripts/tm",
  },

  {
    img: "macq-trace.png",
    title: "MAcq",
    description:
      "The Model Acquisition Toolkit. The new standard library for all things model acquisition related in the field of automated planning. I co-authored and maintain this library. Initially built as part of my research internship at the MuLab, this project is largely comprised of translating the algorithms from related papers into code - an excellent way to learn!",
    code: "https://github.com/ai-planning/macq",
    paper:
      "https://icaps22.icaps-conference.org/workshops/KEPS/KEPS-22_paper_4962.pdf",
  },
  {
    img: "praxis.png",
    title: "Praxis Interface",
    description:
      "A data analysis tool built to help data scientists reason about data that evolves over time. Used internally by Praxis for financial forecasts of over $30B in transactional volume. More information available upon request.",
  },
  {
    img: "evim.png",
    title: "Evim",
    description:
      "My personal neovim configuration. With >60 stars on github, my config offers a VSCode-like editing experience with all the advantages of vim's powerful keybinds and extensibility.",
    code: "https://github.com/e-cal/evim",
  },
  {
    img: "bauhaus.png",
    title: "Bauhaus",
    description:
      "An open-source Python package for creating propositional logic encodings from object-oriented Python code.",
    code: "https://github.com/QuMuLab/bauhaus",
  },
];

const contact = {
  email: "ethan@ecal.dev",
  phone: "+1 (289)-828-0702",
  // emailjs.com
  service_id: "service_zfyaj6h",
  template_id: "template_zhmxnfl",
  public_key: "VgC_4JXYWeNnwNnha",
};

const socials = {
  email: "mailto:ethan@ecal.dev",
  linkedin: "https://linkedin.com/in/ethan-callanan",
  github: "https://github.com/e-cal",
  twitter: "https://twitter.com/ecall04",
};
export {
  meta,
  about,
  dataportfolio,
  work,
  introdata,
  contact,
  socials,
  logotext,
};
